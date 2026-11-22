/**
 * Inquiry form backend for the tutoring and essay editing pages.
 *
 * One web app receives submissions from all three service pages. For each one it:
 *   1. saves any PDFs to a private Drive folder,
 *   2. adds a row to the matching tab of one spreadsheet,
 *   3. emails a notification to NOTIFY_EMAIL.
 *
 * Setup steps are in google/README.md.
 */

const CONFIG = {
  NOTIFY_EMAIL: "ji7445@princeton.edu",
  SPREADSHEET_NAME: "Website inquiries",
  FOLDER_NAME: "Website inquiry uploads",
  // Page slug -> spreadsheet tab. The website sends the slug, so visitors never pick a service.
  TABS: {
    "ethics-bowl-tutoring": "Ethics Bowl Tutoring",
    "math-tutoring": "Math Tutoring",
    "college-essay-editing": "College Essay Editing",
  },
  HEADERS: ["Submitted", "Name", "Email", "Message", "PDFs"],
  MAX_FILES: 5,
  MAX_TOTAL_BYTES: 10 * 1024 * 1024,
  MAX_TEXT: { name: 200, email: 320, message: 5000 },
};

/** Run once from the editor to create the sheet + folder and grant permissions. */
function setup() {
  const ss = getSpreadsheet_();
  const folder = getFolder_();
  Logger.log("Spreadsheet: " + ss.getUrl());
  Logger.log("Upload folder: " + folder.getUrl());
}

function doGet() {
  return json_({ ok: true, service: "inquiry-form" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Honeypot: real visitors never fill this hidden field.
    if (data.website) return json_({ ok: true });

    const tabName = CONFIG.TABS[data.service];
    const name = clean_(data.name, CONFIG.MAX_TEXT.name);
    const email = clean_(data.email, CONFIG.MAX_TEXT.email);
    const message = clean_(data.message, CONFIG.MAX_TEXT.message);

    if (!tabName) return json_({ ok: false, error: "Unknown service." });
    if (!name || !message) return json_({ ok: false, error: "Please fill in your name and message." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: "Please enter a valid email." });

    const files = Array.isArray(data.files) ? data.files : [];
    if (files.length > CONFIG.MAX_FILES) return json_({ ok: false, error: "Please attach at most " + CONFIG.MAX_FILES + " PDFs." });

    const blobs = [];
    let total = 0;
    for (const f of files) {
      const bytes = Utilities.base64Decode(String(f.data || ""));
      total += bytes.length;
      if (total > CONFIG.MAX_TOTAL_BYTES) return json_({ ok: false, error: "Attachments must total 10 MB or less." });
      // Accept real PDFs only (files start with "%PDF").
      if (bytes.length < 4 || bytes[0] !== 0x25 || bytes[1] !== 0x50 || bytes[2] !== 0x44 || bytes[3] !== 0x46) {
        return json_({ ok: false, error: "Only PDF files can be uploaded." });
      }
      const safeName = String(f.name || "upload.pdf").replace(/[\\/:*?"<>|]+/g, "_").slice(0, 120);
      blobs.push(Utilities.newBlob(bytes, "application/pdf", safeName));
    }

    lock.waitLock(20000);

    const submitted = new Date();
    const stamp = Utilities.formatDate(submitted, Session.getScriptTimeZone(), "yyyy-MM-dd HHmm");
    const folder = getFolder_();
    // Files inherit the folder's sharing, which stays private to the owner.
    const links = blobs.map(function (b) {
      return folder.createFile(b.setName(stamp + " " + name + " - " + b.getName())).getUrl();
    });

    const sheet = getSpreadsheet_().getSheetByName(tabName);
    sheet.appendRow([submitted, cell_(name), cell_(email), cell_(message), links.join("\n")]);

    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      replyTo: email,
      subject: "New " + tabName + " inquiry from " + name,
      body: [
        "Service: " + tabName,
        "Name: " + name,
        "Email: " + email,
        "",
        message,
        "",
        links.length ? "PDFs:\n" + links.join("\n") : "No PDFs attached.",
        "",
        "All responses: " + getSpreadsheet_().getUrl(),
      ].join("\n"),
    });

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "Something went wrong. Please email " + CONFIG.NOTIFY_EMAIL + " instead." });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignored) {}
  }
}

function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("SPREADSHEET_ID");
  let ss = id ? SpreadsheetApp.openById(id) : null;
  if (!ss) {
    ss = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
    props.setProperty("SPREADSHEET_ID", ss.getId());
  }
  Object.keys(CONFIG.TABS).forEach(function (slug) {
    const title = CONFIG.TABS[slug];
    let sheet = ss.getSheetByName(title);
    if (!sheet) sheet = ss.insertSheet(title);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(CONFIG.HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, CONFIG.HEADERS.length).setFontWeight("bold");
      sheet.getRange("A:A").setNumberFormat("mmm d, yyyy h:mm am/pm");
      sheet.setColumnWidth(4, 420);
      sheet.getRange("D:E").setWrap(true);
    }
  });
  const blank = ss.getSheetByName("Sheet1");
  if (blank && ss.getSheets().length > 1 && blank.getLastRow() === 0) ss.deleteSheet(blank);
  return ss;
}

function getFolder_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("FOLDER_ID");
  if (id) return DriveApp.getFolderById(id);
  const folder = DriveApp.createFolder(CONFIG.FOLDER_NAME);
  props.setProperty("FOLDER_ID", folder.getId());
  return folder;
}

function clean_(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

/** Stop spreadsheet formula injection (values starting with = + - @). */
function cell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
