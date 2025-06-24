import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const continents = [
  { name: "אירופה", center: [54.5260, 15.2551] },
  { name: "אסיה", center: [34.0479, 100.6197] },
  { name: "אפריקה", center: [-8.7832, 34.5085] },
  { name: "אמריקה הצפונית", center: [54.5260, -105.2551] },
  { name: "אמריקה הדרומית", center: [-14.2350, -51.9253] },
  { name: "אוסטרליה", center: [-25.2744, 133.7751] },
];

const europeCountries = {
  צרפת: {
    capital: "פריז",
    area: '551,695 קמ"ר',
    population: "67 מיליון",
    rivers: ["הסיין"],
    mountains: ["האלפים"],
    resources: ["פחם", "מים", "ברזל"],
    sites: [
      { name: "מגדל אייפל", image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
      { name: "מוזיאון הלובר", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Louvre_Museum_Wikimedia.jpg" }
    ]
  },
  גרמניה: {
    capital: "ברלין",
    area: '357,022 קמ"ר',
    population: "83 מיליון",
    rivers: ["הריין", "האלבה"],
    mountains: ["ההארץ"],
    resources: ["פחם", "אורניום"],
    sites: [
      { name: "שער ברנדנבורג", image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Brandenburger_Tor_abends.jpg" },
      { name: "היער השחור", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/BlackForestGermany.jpg" }
    ]
  },
  איטליה: {
    capital: "רומא",
    area: '301,340 קמ"ר',
    population: "60 מיליון",
    rivers: ["הפו"],
    mountains: ["הרי האפנינים"],
    resources: ["שיש", "גז טבעי"],
    sites: [
      { name: "הקולוסיאום", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg" },
      { name: "ונציה", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Venice_Grand_Canal.jpg" }
    ]
  },
  אנגליה: {
    capital: "לונדון",
    area: '130,279 קמ"ר',
    population: "67 מיליון",
    rivers: ["התמזה"],
    mountains: ["היילנדס"],
    resources: ["דגה", "פחם"],
    sites: [
      { name: "ביג בן", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Big_Ben_2012.jpg" },
      { name: "טאוור אוף לונדון", image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Tower_of_London_viewed_from_the_River_Thames.jpg" }
    ]
  },
  ספרד: {
    capital: "מדריד",
    area: '505,990 קמ"ר',
    population: "47 מיליון",
    rivers: ["האברו", "הטחו"],
    mountains: ["הפירנאים", "סיירה נבדה"],
    resources: ["נחושת", "ברזל"],
    sites: [
      { name: "סגרדה פמיליה", image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Sagrada_Familia_2021.jpg" },
      { name: "אלחמברה", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/AlhambraGranada.jpg" }
    ]
  },
  שוודיה: {
    capital: "סטוקהולם",
    area: '450,295 קמ"ר',
    population: "10 מיליון",
    rivers: ["גוֹטה אלב"],
    mountains: ["הרי סקנדרנה"],
    resources: ["עץ", "ברזל"],
    sites: [
      { name: "העיר העתיקה של סטוקהולם", image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Stockholm_Gamla_Stan.jpg" },
      { name: "Ice Hotel", image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Icehotel_Sweden.jpg" }
    ]
  }
};

export default function App() {
  const [continent, setContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>🌍 Geo Quiz App</h1>
      <p>בחר יבשת:</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {continents.map((c) => (
          <button key={c.name} onClick={() => {
            setContinent(c);
            setSelectedCountry(null);
          }}>
            {c.name}
          </button>
        ))}
      </div>

      {continent && (
        <>
          <MapContainer center={continent.center} zoom={3} style={{ height: "400px", marginBottom: 20 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>

          {continent.name === "אירופה" && (
            <>
              <h2>בחר מדינה באירופה:</h2>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {Object.keys(europeCountries).map((country) => (
                  <button key={country} onClick={() => setSelectedCountry(country)}>
                    {country}
                  </button>
                ))}
              </div>

              {selectedCountry && (
                <div style={{ marginTop: 30 }}>
                  <h3>{selectedCountry}</h3>
                  <p><strong>בירה:</strong> {europeCountries[selectedCountry].capital}</p>
                  <p><strong>שטח:</strong> {europeCountries[selectedCountry].area}</p>
                  <p><strong>אוכלוסייה:</strong> {europeCountries[selectedCountry].population}</p>
                  <p><strong>משאבים:</strong> {europeCountries[selectedCountry].resources.join(", ")}</p>
                  <p><strong>נהרות:</strong> {europeCountries[selectedCountry].rivers.join(", ")}</p>
                  <p><strong>רכסי הרים:</strong> {europeCountries[selectedCountry].mountains.join(", ")}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                    {europeCountries[selectedCountry].sites.map((site, index) => (
                      <div key={index} style={{ width: 200 }}>
                        <img
                          src={site.image}
                          alt={site.name}
                          style={{ width: "100%", borderRadius: 8 }}
                          onError={(e) => e.target.style.display = "none"}
                        />
                        <p style={{ textAlign: "center" }}>{site.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
