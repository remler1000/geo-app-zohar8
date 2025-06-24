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

const data = {
  אירופה: [
    {
      name: "צרפת",
      capital: "פריז",
      population: "67 מיליון",
      area: "643,801 קמ״ר",
      highlights: ["מגדל אייפל", "נהר הסן", "האלפים הצרפתיים"],
      resources: ["יין", "חיטה", "מכונות"],
    },
    {
      name: "גרמניה",
      capital: "ברלין",
      population: "83 מיליון",
      area: "357,022 קמ״ר",
      highlights: ["שער ברנדנבורג", "היער השחור", "נהר הריין"],
      resources: ["פלדה", "מכוניות", "כימיקלים"],
    },
    {
      name: "איטליה",
      capital: "רומא",
      population: "60 מיליון",
      area: "301,340 קמ״ר",
      highlights: ["הקולוסיאום", "הרי האפנינים", "ונציה"],
      resources: ["יין", "תיירות", "מכונות תעשייתיות"],
    },
  ],
};

export default function App() {
  const [selectedContinent, setSelectedContinent] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>🌍 Geo Quiz App</h1>
      <p>בחר יבשת כדי להציג אותה במפה ולקבל מידע:</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {continents.map((c) => (
          <button key={c.name} onClick={() => setSelectedContinent(c.name)}>
            {c.name}
          </button>
        ))}
      </div>

      {selectedContinent && (
        <>
          <h2 style={{ marginTop: 20 }}>🗺️ מפת {selectedContinent}</h2>
          <div style={{ height: 400, marginBottom: 20 }}>
            <MapContainer
              center={continents.find((c) => c.name === selectedContinent).center}
              zoom={3}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </MapContainer>
          </div>

          <h2>📌 מדינות ב{selectedContinent}:</h2>
          {data[selectedContinent] ? (
            data[selectedContinent].map((country, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <h3>🌍 {country.name}</h3>
                <p>בירה: {country.capital}</p>
                <p>אוכלוסייה: {country.population}</p>
                <p>שטח: {country.area}</p>
                <p>
                  אתרים בולטים:{" "}
                  {country.highlights.map((h, j) => (
                    <span key={j}>{h}{j < country.highlights.length - 1 ? ", " : ""}</span>
                  ))}
                </p>
                <p>
                  משאבים בולטים:{" "}
                  {country.resources.map((r, j) => (
                    <span key={j}>{r}{j < country.resources.length - 1 ? ", " : ""}</span>
                  ))}
                </p>
              </div>
            ))
          ) : (
            <p>אין עדיין מידע זמין ליבשת זו.</p>
          )}
        </>
      )}
    </div>
  );
}
