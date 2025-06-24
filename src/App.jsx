
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const continents = [
  { name: "אסיה", center: [34.0479, 100.6197] },
  { name: "אירופה", center: [54. 5260, 15.2551] },
  { name: "אפריקה", center: [-8.7832, 34.5085] },
  { name: "אמריקה הצפונית", center: [54.5260, -105.2551] },
  { name: "אמריקה הדרומית", center: [-14.2350, -51.9253] },
  { name: "אוסטרליה", center: [-25.2744, 133.7751] },
];

export default function App() {
  const [continent, setContinent] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>🌍 Geo Quiz App</h1>
      <p>בחר יבשת כדי להציג אותה במפה:</p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {continents.map((c) => (
          <button key={c.name} onClick={() => setContinent(c)}>
            {c.name}
          </button>
        ))}
      </div>
      {continent && (
        <div style={{ height: 400, marginTop: 20 }}>
          <MapContainer center={continent.center} zoom={3} style={{ height: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>
        </div>
      )}
    </div>
  );
}
