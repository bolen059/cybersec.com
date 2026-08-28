interface ResourceCardProps {
  title?: string;
  description?: string;
  link?: string;
  category?: string;
  [key: string]: any;
}

export default function ResourceCard({ title, description, link, category }: ResourceCardProps) {
  return (
    <div className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
      {category && <span className="text-xs text-blue-600 font-semibold uppercase">{category}</span>}
      <h3 className="text-lg font-bold mt-1 mb-2">{title || "Resource Title"}</h3>
      <p className="text-gray-600 text-sm mb-4">{description || "Resource description goes here."}</p>
      {link && (
        <a href={link} className="text-blue-600 font-medium text-sm hover:underline">
          Learn More &rarr;
        </a>
      )}
    </div>
  );
}