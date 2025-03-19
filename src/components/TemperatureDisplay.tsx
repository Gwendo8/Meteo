import { FaSun, FaCloud, FaSnowflake } from "react-icons/fa";

interface TemperatureDisplayProps {
  temperature: number | null;
}

export const TemperatureDisplay = ({
  temperature,
}: TemperatureDisplayProps) => {
  if (temperature === null) return null;

  let color = "text-blue-500";
  let icon = <FaSnowflake className="text-blue-500" />;

  if (temperature > 30) {
    color = "text-red-500";
    icon = <FaSun className="text-red-500" />;
  } else if (temperature > 13) {
    color = "text-orange-500";
    icon = <FaCloud className="text-orange-500" />;
  }

  return (
    <div
      className={`bg-white p-2 rounded-md shadow-md ml-2 flex items-center ${color}`}
    >
      {icon}
      <p className="text-lg font-bold ml-2">{temperature}°C</p>
    </div>
  );
};
