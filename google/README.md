# Inquiry form setup

The inquiry form on the three service pages (College Essay Editing, Ethics Bowl
Tutoring and Math Tutoring) sends submissions to one Google Apps Script web app,
`inquiry-form.gs`. For each submission it:

- adds a row to the matching tab of one spreadsheet, **Website inquiries**
  (tabs: Ethics Bowl Tutoring, Math Tutoring, College Essay Editing; columns:
  Submitted, Name, Email, Message, PDFs),
- saves uploaded PDFs to a private Drive folder, **Website inquiry uploads**, and
  puts their links in the PDFs column (only the owner can open them),
- emails ji7445@princeton.edu. Replying to that email replies to the visitor.

The page sends its own service, so visitors never choose one.

> Why not a Google Form? Google Forms only accepts file uploads on its own
> google.com page, after the visitor signs in with Google. A custom form on this
> site can't send files to it. The script gives the same result: one sheet,
> three tabs, private PDF links and email alerts.

## One-time setup (about 5 minutes; do it signed in as Joel)

Joel should own the script, sheet and uploads folder.

1. Go to <https://script.google.com> and click **New project**. Name it
   "Website inquiry form".
2. Delete the sample code, paste in all of `google/inquiry-form.gs`, and save.
3. In the function menu at the top choose **setup**, then click **Run**.
   Approve the permissions (Drive, Sheets, sending email). The log prints
   links to the new spreadsheet and uploads folder.
4. Click **Deploy → New deployment**. Type: **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
5. In Vercel, open the project's **Settings → Environment Variables** and add
   `NEXT_PUBLIC_INQUIRY_ENDPOINT` = the URL from step 4. Then redeploy.
   For local testing, put the same line in `.env.local`.

Until the variable is set, **Send inquiry** opens the visitor's email app with
their message filled in. PDFs can't be attached that way.

## Changing the script later

After editing the code, use **Deploy → Manage deployments → Edit → Version: New
version**. That keeps the same URL, so nothing on the website has to change.
