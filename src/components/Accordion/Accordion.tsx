import { ReactNode, useState } from "react";

// Custom Accordion component with enhanced styling
export const Accordion = ({
    title,
    children,
    defaultOpen = false,
  }: { title: string; children: ReactNode; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
  
    return (
      <div className="mb-8 rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition-shadow duration-200">
        <button
          type="button"
          className={`w-full flex justify-between items-center px-6 py-5 bg-gradient-to-r from-gray-50 to-white text-left hover:from-gray-100 hover:to-gray-50 transition-all duration-300`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-semibold text-gray-800">{title}</span>
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="p-6 border-t border-gray-100">{children}</div>
        </div>
      </div>
    )
  }