// components/ToolkitDownloadCard.tsx
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { PolicyToolkit } from "../data/toolkits";

type Props = {
  toolkit: PolicyToolkit;
  className?: string;
};

export default function ToolkitDownloadCard({ toolkit, className = "" }: Props) {
  const [expanded, setExpanded] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const handleTogglePreview = () => {
    setExpanded((s) => !s);
    // scroll into view when expanding
    if (!expanded) {
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  };

  const handlePrint = () => {
    // Use the rendered preview HTML if available; otherwise use raw markdown as preformatted text.
    const contentHtml = previewRef.current?.innerHTML ?? `<pre>${escapeHtml(toolkit.markdownContent)}</pre>`;
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) {
      // fallback: call native print (will print current page)
      window.print();
      return;
    }

    const style = `
      <style>
        body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #0f172a; padding: 24px; }
        h1,h2,h3 { color: #0f766e; margin-top: 1.2em; }
        table { border-collapse: collapse; width: 100%; margin: 12px 0; }
        table th, table td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
        pre { white-space: pre-wrap; word-break: break-word; background: #f8fafc; padding: 12px; border-radius: 6px; }
        .meta { margin-bottom: 12px; color: #475569; }
        @media print {
          body { padding: 12mm; }
          .no-print { display: none !important; }
        }
      </style>
    `;

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${escapeHtml(toolkit.title)}</title>
          ${style}
        </head>
        <body>
          <div class="meta">
            <strong>${escapeHtml(toolkit.title)}</strong><br/>
            Audience: ${escapeHtml(toolkit.audience)} • ODPC aligned: ${toolkit.odpcAligned ? "Yes" : "No"} • Last updated: ${escapeHtml(toolkit.lastUpdated)}
          </div>
          <div id="content">${contentHtml}</div>
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for content to render then call print
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      // Optionally close after printing (commented out to let user decide)
      // printWindow.close();
    }, 300);
  };

  return (
    <article
      className={`border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm ${className}`}
      aria-labelledby={`toolkit-${toolkit.id}-title`}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 id={`toolkit-${toolkit.id}-title`} className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {toolkit.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{toolkit.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                toolkit.odpcAligned ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-800"
              }`}
            >
              {toolkit.odpcAligned ? "ODPC Aligned" : "Not ODPC Aligned"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Audience: <strong className="capitalize">{toolkit.audience}</strong></span>
            <span className="text-xs text-slate-400">•</span>
            <time className="text-xs text-slate-500 dark:text-slate-400" dateTime={toolkit.lastUpdated}>
              Updated {new Date(toolkit.lastUpdated).toLocaleDateString()}
            </time>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <button
              onClick={handleTogglePreview}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm rounded-md"
              aria-expanded={expanded}
            >
              {expanded ? "Hide Preview" : "Preview Policy"}
            </button>
          </div>

          <div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-md"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </header>

      <section className="mt-4">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Key clauses</h4>
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {toolkit.keyClauses.map((clause, idx) => (
            <li key={idx} className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2 rounded">
              • {clause}
            </li>
          ))}
        </ul>
      </section>

      {/* Preview area */}
      <div
        ref={previewRef}
        className={`mt-4 transition-all ${expanded ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        aria-hidden={!expanded}
      >
        {expanded && (
          <div className="prose prose-slate dark:prose-invert max-w-none border border-slate-100 dark:border-slate-800 rounded-md p-4 bg-white dark:bg-slate-900">
            <ReactMarkdown>{toolkit.markdownContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </article>
  );
}

/* Utility: escape HTML for printing raw markdown fallback */
function escapeHtml(unsafe: string) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
