interface Threat {
  title?: string;
  description?: string;
  content?: string;
  [key: string]: any; // Allows any additional fields present on your Threat type
}

interface ThreatDetailProps {
  threat?: Threat;
  title?: string;
  content?: string;
}

export default function ThreatDetail({ threat, title, content }: ThreatDetailProps) {
  const displayTitle = threat?.title || title || "Threat Details";
  const displayContent = threat?.description || threat?.content || content || "Detailed information about this threat.";

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">{displayTitle}</h1>
      <p className="text-gray-700 leading-relaxed">{displayContent}</p>
    </div>
  );
}