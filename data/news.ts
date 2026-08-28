export interface NewsItem {
  title: string;
  slug: string;
  [key: string]: any;
}

// Ensure the export name is exactly newsArticles
export const newsArticles: NewsItem[] = [];