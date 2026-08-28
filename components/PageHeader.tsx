interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="py-10 bg-slate-900 text-white text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="mt-2 text-slate-300">{description}</p>}
    </header>
  );
}