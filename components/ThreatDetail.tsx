export default function ThreatDetail({ title, content }: { title?: string; content?: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{title || "Threat Details"}</h3>
      <p className="text-gray-600">{content || "Detailed information about this threat."}</p>
    </div>
  );
}