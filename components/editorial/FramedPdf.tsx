"use client";

import dynamic from "next/dynamic";

export const FramedPdf = dynamic(() => import("./PdfPages"), {
  ssr: false,
  loading: () => <p role="status">Loading PDF…</p>,
});
