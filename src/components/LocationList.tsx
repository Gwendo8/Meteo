import { TemperatureDisplay } from "./TemperatureDisplay";

interface Location {
  name: string;
  country: string;
  state?: string;
}

interface LocationListProps {
  locations: Location[];
  onSelect: (location: Location) => void;
  selectedLocation: Location | null;
  temperature: number | null;
}

export const LocationList = ({
  locations,
  onSelect,
  selectedLocation,
  temperature,
}: LocationListProps) => {
  console.log("LocationList received locations:", locations);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Select a Location
        </h1>
        <ul className="bg-white shadow-md rounded-lg w-full p-4">
          {locations.map((location, index) => (
            <li
              key={index}
              onClick={() => onSelect(location)}
              className="location-item text-black p-4 mb-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md hover:from-blue-500 hover:to-blue-700 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{location.name}</p>
                  <p className="text-sm">
                    {location.country} {location.state && `(${location.state})`}
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  {selectedLocation?.name === location.name && (
                    <TemperatureDisplay temperature={temperature} />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
