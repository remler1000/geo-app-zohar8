
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const continents = [
  { name: "אסיה", center: [34.0479, 100.6197] },
  { name: "אירופה", center: [54.5260, 15.2551] },
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
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const continents = [
  { name: "אסיה", center: [34.0479, 100.6197] },
  { name: "אירופה", center: [54.5260, 15.2551] },
  { name: "אפריקה", center: [-8.7832, 34.5085] },
  { name: "אמריקה הצפונית", center: [54.5260, -105.2551] },
  { name: "אמריקה הדרומית", center: [-14.2350, -51.9253] },
  { name: "אוסטרליה", center: [-25.2744, 133.7751] },
];

const continentData = {
  "אירופה": [
    {
      country: "צרפת",
      capital: "פריז",
      population: "67 מיליון",
      area: "643,801 קמ\"ר",
      landmarks: ["מגדל אייפל", "הלובר"],
      resources: ["יין", "תעשייה אווירית", "חקלאות"],
      geography: ["נהר הסיין", "הרי האלפים"]
    },
    {
      country: "גרמניה",
      capital: "ברלין",
      population: "83 מיליון",
      area: "357,022 קמ\"ר",
      landmarks: ["שער ברנדנבורג", "היער השחור"],
      resources: ["רכב", "פלדה", "כימיקלים"],
      geography: ["נהר הריין", "הרי ההארץ"]
    }
  ]
};

export default function App() {
  const [continent, setContinent] = useState(null);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", direction: "rtl" }}>
      <h1>🌍 אפליקציית מסע גאוגרפי</h1>
      <p>בחר יבשת להצגת מידע גאוגרפי ולימודי</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {continents.map((c) => (
          <button
            key={c.name}
            onClick={() => setContinent(c.name)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: continent === c.name ? "#d0f0ff" : "#f0f0f0"
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {continent && (
        <div style={{ height: 400, marginTop: 20 }}>
          <MapContainer
            center={continents.find((c) => c.name === continent)?.center || [20, 0]}
            zoom={3}
            style={{ height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>
        </div>
      )}

      {/* תצוגת מידע על מדינות ביבשת */}
      {continent && continentData[continent] && (
        <div style={{ marginTop: 30 }}>
          <h2>🌍 מדינות ביבשת {continent}</h2>
          {continentData[continent].map((country, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                backgroundColor: "#f9f9f9"
              }}
            >
              <h3>🌎 {country.country}</h3>
              <p>🏙 עיר בירה: {country.capital}</p>
              <p>👥 אוכלוסייה: {country.population}</p>
              <p>📐 גודל: {country.area}</p>
              <p>🏞 אתרים: {country.landmarks.join(", ")}</p>
              <p>⛰ משאבים: {country.resources.join(", ")}</p>
              <p>🌊 גאוגרפיה: {country.geography.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
