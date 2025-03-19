import "./index.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchForm } from "./components/SearchForm";
import { LocationList } from "./components/LocationList";

interface Location {
  name: string;
  country: string;
  state?: string;
}

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const handleSearch = async (
    token: string,
    city: string,
    navigate: (path: string) => void
  ) => {
    console.log("handleSearch called with token:", token, "and city:", city);
    setApiToken(token);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${token}`
      );
      console.log("API response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("API error data:", errorData);
        throw new Error(errorData.message || "Failed to fetch data");
      }
      const data = await response.json();
      console.log("API response data:", data);
      if (!data.length) {
        throw new Error("Invalid response format");
      }
      const locationsData = data.map(
        (item: { name: string; country: string; state?: string }) => ({
          name: item.name,
          country: item.country,
          state: item.state,
        })
      );
      console.log("Locations data:", locationsData);
      setLocations(locationsData);
      setError(null);
      navigate("/locations");
    } catch (err) {
      console.error("Error in handleSearch:", err);
      setError((err as Error).message);
      setLocations([]);
    }
  };

  const handleSelect = async (location: Location, token: string) => {
    if (selectedLocation?.name === location.name) {
      setSelectedLocation(null);
      setTemperature(null);
      return;
    }
    setSelectedLocation(location);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location.name}&appid=${token}&units=metric`
      );
      console.log("API response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("API error data:", errorData);
        throw new Error(errorData.message || "Failed to fetch data");
      }
      const data = await response.json();
      console.log("API response data:", data);
      setTemperature(data.main.temp);
      setError(null);
    } catch (err) {
      console.error("Error in handleSelect:", err);
      setError((err as Error).message);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SearchForm onSearch={handleSearch} />} />
          <Route
            path="/locations"
            element={
              <LocationList
                locations={locations}
                onSelect={(location) => handleSelect(location, apiToken)}
                selectedLocation={selectedLocation}
                temperature={temperature}
              />
            }
          />
        </Routes>
        {error && <p className="error">Error: {error}</p>}
      </div>
    </Router>
  );
}

export default App;
