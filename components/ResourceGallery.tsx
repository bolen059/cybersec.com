// components/ResourceGallery.tsx

'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { ChevronDown, Clock, FileText, Play, Search, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ResourceCategory = 'Video Guides' | 'Guides & Tools' | 'Tutorials';

interface BaseResourceItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  category: ResourceCategory;
}

export interface VideoResourceItem extends BaseResourceItem {
  type: 'video';
  youtubeId: string;
  /** e.g. "6:42" */
  durationLabel: string;
  thumbnailUrl?: string;
}

export interface GuideResourceItem extends BaseResourceItem {
  type: 'guide';
  markdownContent: string;
}

export type ResourceItem = VideoResourceItem | GuideResourceItem;

export interface ResourceGalleryProps {
  items: ResourceItem[];
  /** Optional heading override for the section landmark. */
  heading?: string;
}

// ---------------------------------------------------------------------------
// Static config
// ---------------------------------------------------------------------------

const FILTERS: Array<{ label: string; value: ResourceCategory | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'Video Guides', value: 'Video Guides' },
  { label: 'Guides & Tools', value: 'Guides & Tools' },
  { label: 'Tutorials', value: 'Tutorials' },
];

const CATEGORY_STYLES: Record<ResourceCategory, string> = {
  'Video Guides': 'bg-teal-50 text-teal-800 border-teal-200',
  'Guides & Tools': 'bg-amber-50 text-amber-900 border-amber-200',
  Tutorials: 'bg-indigo-50 text-indigo-800 border-indigo-200',
};

// ---------------------------------------------------------------------------
// Minimal markdown renderer (headings, bold, links, lists, paragraphs)
// Kept dependency-free on purpose — no external markdown package.
// ---------------------------------------------------------------------------

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={`${keyPrefix}-${i}`}
          href={linkMatch[2]}
          className="text-teal-700 underline underline-offset-2 hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

function renderMarkdown(markdown: string) {
  const lines = markdown.trim().split('\n');
  const blocks: JSX.Element[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    blocks.push(
      <ul key={key} className="list-disc space-y-1 pl-5">
        {listBuffer.map((item, i) => (
          <li key={`${key}-li-${i}`} className="text-slate-700">
            {renderInline(item, `${key}-li-${i}`)}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    const key = `md-${idx}`;

    if (line.startsWith('- ') || line.startsWith('* ')) {
      listBuffer.push(line.slice(2));
      return;
    }
    flushList(`${key}-list`);

    if (!line) return;

    if (line.startsWith('### ')) {
      blocks.push(
        <h4 key={key} className="text-base font-semibold text-slate-900">
          {renderInline(line.slice(4), key)}
        </h4>
      );
    } else if (line.startsWith('## ')) {
      blocks.push(
        <h3 key={key} className="text-lg font-semibold text-slate-900">
          {renderInline(line.slice(3), key)}
        </h3>
      );
    } else if (line.startsWith('# ')) {
      blocks.push(
        <h2 key={key} className="text-xl font-semibold text-slate-900">
          {renderInline(line.slice(2), key)}
        </h2>
      );
    } else {
      blocks.push(
        <p key={key} className="leading-relaxed text-slate-700">
          {renderInline(line, key)}
        </p>
      );
    }
  });

  flushList('md-list-final');
  return blocks;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryTag({ category }: { category: ResourceCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_STYLES[category]}`}
    >
      {category}
    </span>
  );
}

function VideoCard({ item }: { item: VideoResourceItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumb =
    item.thumbnailUrl ?? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="relative aspect-video w-full bg-slate-900">
        {isPlaying ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group relative h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            aria-label={`Play video: ${item.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm transition group-hover:scale-105 group-hover:bg-white">
                <Play className="h-6 w-6 fill-current" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-slate-900/80 px-1.5 py-0.5 text-xs font-medium text-white">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {item.durationLabel}
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <CategoryTag category={item.category} />
        <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
        <p className="text-sm text-slate-600">{item.summary}</p>
        {item.tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tags">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function GuideCard({ item }: { item: GuideResourceItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `guide-content-${item.id}`;

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-amber-50 text-amber-700">
          <FileText className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="flex flex-1 flex-col gap-2">
          <CategoryTag category={item.category} />
          <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
          <p className="text-sm text-slate-600">{item.summary}</p>
        </div>
      </div>

      {item.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="mt-4 flex items-center justify-between gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-teal-600 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
      >
        {isExpanded ? 'Hide full policy guide' : 'View full policy guide'}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <div
          id={contentId}
          className="prose prose-sm mt-4 max-w-none space-y-3 border-t border-slate-100 pt-4"
        >
          {renderMarkdown(item.markdownContent)}
        </div>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ResourceGallery({
  items,
  heading = 'Resource Library',
}: ResourceGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<ResourceCategory | 'All'>('All');
  const [query, setQuery] = useState('');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [item.title, item.summary, ...item.tags].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [items, activeFilter, query]);

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % FILTERS.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + FILTERS.length) % FILTERS.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = FILTERS.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        setActiveFilter(FILTERS[nextIndex].value);
        tabRefs.current[nextIndex]?.focus();
      }
    },
    []
  );

  return (
    <section aria-labelledby="resource-gallery-heading" className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="resource-gallery-heading" className="text-2xl font-semibold text-slate-900">
            {heading}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Filter by type or search guides and videos on staying safe online.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search resources"
            aria-label="Search resources by title, summary, or tag"
            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Filter resources by category"
        className="mb-6 flex flex-wrap gap-2"
      >
        {FILTERS.map((filter, index) => {
          const isActive = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveFilter(filter.value)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              aria-label={`Show ${filter.label} resources`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                isActive
                  ? 'border-teal-700 bg-teal-700 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-teal-600 hover:text-teal-700'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <div
          role="status"
          className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center"
        >
          <p className="text-sm font-medium text-slate-700">No resources match your search.</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different keyword or select a different category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) =>
            item.type === 'video' ? (
              <VideoCard key={item.id} item={item} />
            ) : (
              <GuideCard key={item.id} item={item} />
            )
          )}
        </div>
      )}
    </section>
  );
}