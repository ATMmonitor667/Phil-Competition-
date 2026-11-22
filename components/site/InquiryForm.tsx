"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/ArrowLink";

const ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT ?? "";
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;

type Props = {
  service: string;
  serviceTitle: string;
  uploadHint: string;
  email: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function InquiryForm({ service, serviceTitle, uploadHint, email }: Props) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function onFiles(list: FileList | null) {
    const picked = Array.from(list ?? []);
    const notPdf = picked.find((f) => f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf"));
    const total = picked.reduce((n, f) => n + f.size, 0);
    if (notPdf) setStatus({ kind: "error", message: `“${notPdf.name}” isn’t a PDF.` });
    else if (picked.length > MAX_FILES) setStatus({ kind: "error", message: `Please attach at most ${MAX_FILES} PDFs.` });
    else if (total > MAX_TOTAL_BYTES) setStatus({ kind: "error", message: "Attachments must total 10 MB or less." });
    else setStatus({ kind: "idle" });
    setFiles(picked);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const from = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (status.kind === "error" && files.length) return; // fix the attachment problem first

    // Not connected yet: fall back to the visitor's email app.
    if (!ENDPOINT) {
      const q = new URLSearchParams({
        subject: `${serviceTitle} inquiry from ${name}`,
        body: `${message}\n\n${name}\n${from}`,
      })
        .toString()
        .replace(/\+/g, "%20");
      window.location.href = `mailto:${email}?${q}`;
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const payload = {
        service,
        name,
        email: from,
        message,
        website: String(form.get("website") ?? ""),
        files: await Promise.all(files.map(async (f) => ({ name: f.name, data: await toBase64(f) }))),
      };
      // text/plain keeps this a "simple" request, which Apps Script accepts cross-origin.
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as { ok: boolean; error?: string };
      if (!result.ok) throw new Error(result.error || "Something went wrong.");
      formRef.current?.reset();
      setFiles([]);
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error && err.message && err.message !== "Failed to fetch"
            ? err.message
            : `Your inquiry couldn’t be sent. Please try again or email ${email}.`,
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="inquiry inquiry--sent" role="status">
        <p className="inquiry__thanks">Thank you, your inquiry has been sent.</p>
        <p className="meta">Joel will reply by email, usually within a few days.</p>
        <button type="button" className="inquiry__again" onClick={() => setStatus({ kind: "idle" })}>
          Send another inquiry
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form ref={formRef} className="inquiry" onSubmit={onSubmit} aria-busy={sending}>
      <div className="inquiry__field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required maxLength={200} />
      </div>

      <div className="inquiry__field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={320} />
      </div>

      <div className="inquiry__field">
        <label htmlFor={`${id}-message`}>What would you like help with?</label>
        <textarea id={`${id}-message`} name="message" rows={5} required maxLength={5000} />
      </div>

      <div className="inquiry__field">
        <label htmlFor={`${id}-files`}>
          Upload PDFs <span className="inquiry__optional">(optional)</span>
        </label>
        <p className="inquiry__hint" id={`${id}-files-hint`}>
          {uploadHint} Up to {MAX_FILES} files, 10 MB total.
        </p>
        <input
          id={`${id}-files`}
          name="files"
          type="file"
          accept="application/pdf,.pdf"
          multiple
          aria-describedby={`${id}-files-hint`}
          onChange={(e) => onFiles(e.currentTarget.files)}
        />
        {files.length > 0 && (
          <ul className="inquiry__files">
            {files.map((f) => (
              <li key={f.name + f.size}>
                {f.name} <span>· {formatSize(f.size)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Honeypot for bots; hidden from people and screen readers. */}
      <div className="inquiry__trap" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <p className="inquiry__error" role="alert">
          {status.message}
        </p>
      )}

      <button type="submit" className="button" disabled={sending}>
        {sending ? "Sending…" : "Send inquiry"}
        {!sending && <Arrow />}
      </button>
    </form>
  );
}
