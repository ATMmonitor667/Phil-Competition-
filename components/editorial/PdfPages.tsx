"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function FramedPage({ pageNumber }: { pageNumber: number }) {
  const paper = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!paper.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(paper.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="pdf-frame" aria-label={`Page ${pageNumber}`}>
      <div className="pdf-frame__paper" ref={paper}>
        {width > 0 && <Page pageNumber={pageNumber} width={width} />}
      </div>
    </figure>
  );
}

export default function PdfPages({ src }: { src: string }) {
  const [pageCount, setPageCount] = useState(0);

  return (
    <Document
      className="pdf-pages"
      file={src}
      suspense={false}
      onLoadSuccess={({ numPages }) => setPageCount(numPages)}
      loading={<p role="status">Loading PDF…</p>}
      error={<p role="status">The preview could not load. Use “Open full PDF” to read the essay.</p>}
    >
      {Array.from({ length: pageCount }, (_, index) => (
        <FramedPage key={index + 1} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
