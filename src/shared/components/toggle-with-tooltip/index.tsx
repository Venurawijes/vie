import { useState } from 'react';

interface ToggleWithTooltipProps {
  tooltip?: string;
  onToggle?: (enabled: boolean) => void;
}

export default function ToggleWithTooltip({
  tooltip = 'Toggle',
  onToggle,
}: ToggleWithTooltipProps) {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    onToggle?.(!enabled);
  };

  return (
    <div className="relative inline-block">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer duration-300 ${
          enabled ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>

      {/* Tooltip */}
      {hovered && (
        <div
          className="
            absolute top-full mt-2 left-1/2 -translate-x-1/2
            w-max px-3 py-1 text-sm text-white bg-black rounded-md 
            shadow-lg z-40
          "
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
