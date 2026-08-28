interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  const sub = subtitle || description;
  return (
    <header className="py-10 bg-slate-900 text-white text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      {sub && <p className="mt-2 text-slate-300">{sub}</p>}
    </header>
  );
}