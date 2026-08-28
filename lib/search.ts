import { threats } from '@/data/threats';
import { staySafe } from '@/data/staySafe';
import { newsArticles } from '@/data/news';
import { events } from '@/data/events';
import { resources } from '@/data/resources';

export interface SearchResult {
  title: string;
  href: string;
  type: string;
}

const buildIndex = (): SearchResult[] => {
  const index: SearchResult[] = [];
  // Threats
  threats.forEach(t => {
    index.push({ title: t.title, href: t.slug, type: 'Threat' });
  });
  // Stay Safe
  staySafe.forEach(s => {
    index.push({ title: s.title, href: s.slug, type: 'Safety Guide' });
  });
  // News
  newsArticles.forEach(n => {
    index.push({ title: n.title, href: `/news/${n.category}#${n.slug}`, type: 'News' });
  });
  // Events
  events.forEach(e => {
    index.push({ title: e.title, href: `/community/events#${e.slug}`, type: 'Event' });
  });
  // Resources
  resources.forEach(r => {
    index.push({ title: r.title, href: `/resources#${r.slug}`, type: 'Resource' });
  });
  return index;
};

const searchIndex = buildIndex();

export function searchContent(query: string): SearchResult[] {
  const q = query.toLowerCase();
  return searchIndex.filter(item => 
    item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
  ).slice(0, 10);
}