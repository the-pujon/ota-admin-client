import React from "react";
import Image from "next/image";

interface VisaRequirementCategory {
  title: string;
  details: string[];
  icon: string;
}

interface VisaRequirementSectionProps {
  title: string;
  requirements: VisaRequirementCategory[];
}

const VisaRequirementSection: React.FC<VisaRequirementSectionProps> = ({ title, requirements }) => {
    function breakLineOnPunctuation(inputString: string) {
        const placeholder = "[GOVT_PLACEHOLDER]";
        const modifiedString = inputString.replace(/Govt\./g, placeholder);
        const sentences = modifiedString
          .split('.')
          .filter(Boolean)
          .map(sentence => sentence.trim() + '.');
        return sentences.map(sentence => sentence.replace(placeholder, "Govt."));
      }

  return (
    <div className="mb-8">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requirements.map((req, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-start mb-2">
              <Image
                src={req.icon}
                alt={req.title}
                width={40}
                height={40}
                className="mr-3"
              />
              <h5 className="text-lg font-semibold">{req.title}</h5>
            </div>
            <ul className="list-disc list-inside">
              {breakLineOnPunctuation(req.details.join('')).map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisaRequirementSection;
