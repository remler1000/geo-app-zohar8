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

const europeCountries = {
  "צרפת": {
    capital: "פריז",
    area: "551,695 קמ\"ר",
    population: "67 מיליון",
    famousSites: [
      { name: "מגדל אייפל", image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
      { name: "הלובר", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Louvre_Museum_Wikimedia.jpg" }
    ],
    naturalResources: ["פחם", "ברזל", "מים"],
    rivers: ["הסיין"],
    mountains: ["האלפים"]
  },
  "גרמניה": {
    capital: "ברלין",
    area: "357,022 קמ\"ר",
    population: "83 מיליון",
    famousSites: [
      { name: "שער ברנדנבורג", image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Brandenburger_Tor_abends.jpg" },
      { name: "היער השחור", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/BlackForestGermany.jpg" }
    ],
    naturalResources: ["פחם", "אורניום", "אשלג"],
    rivers: ["הריין", "האלבה"],
    mountains: ["ההארץ", "האלפים הבוואריים"]
  },
  "איטליה": {
    capital: "רומא",
    area: "301,340 קמ\"ר",
    population: "60 מיליון",
    famousSites: [
      { name: "הקולוסיאום", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg" },
      { name: "ונציה", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Venice_Grand_Canal.jpg" }
    ],
    naturalResources: ["גז טבעי", "שיש"],
    rivers: ["הפו"],
    mountains: ["הרי האפנינים", "האלפים"]
  },
  "אנגליה": {
    capital: "לונדון",
    area: "130,279 קמ\"ר (הממלכה המאוחדת)",
    population: "67 מיליון (UK)",
    famousSites: [
      { name: "ביג בן", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Big_Ben_2012.jpg" },
      { name: "טאוור אוף לונדון", image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Tower_of_London_viewed_from_the_River_Thames.jpg" }
    ],
    naturalResources: ["גז טבעי", "פחם", "דגה"],
    rivers: ["התמזה"],
    mountains: ["הפנינים", "היילנדס הסקוטיים"]
  },
  "ספרד": {
    capital: "מדריד",
    area: "505,990 קמ\"ר",
    population: "47 מיליון",
    famousSites: [
      { name: "הסגרדה פמיליה", image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Sagrada_Familia_2021.jpg" },
      { name: "אלחמברה", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/AlhambraGranada.jpg" }
    ],
    naturalResources: ["פחם", "ברזל", "נחושת"],
    rivers: ["האברו", "הטחו"],
    mountains: ["הפירנאים", "סיירה נבדה"]
  },
  "שוודיה": {
    capital: "סטוקהולם",
    area: "450,295 קמ\"ר",
    population: "10 מיליון",
    famousSites: [
      { name: "העיר העתיקה של סטוקהולם", image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Stockholm_Gamla_Stan.jpg" },
      { name: "Ice Hotel", image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Icehotel_Sweden.jpg" }
    ],
    naturalResources: ["עץ", "ברזל", "הידרו-אנרגיה"],
    rivers: ["גוֹטה אלב"],
    mountains: ["הרי סקנדרנה"]
  }
};

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
        <div style={{ marginTop: 30 }}>
          <MapContainer center={continent.center} zoom={3} style={{ height: "400px", marginBottom: 20 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>

          {continent.name === "אירופה" && (
            <div>
              {Object.entries(europeCountries).map(([country, data]) => (
                <div key={country} style={{ marginBottom: 40 }}>
                  <h2>{country}</h2>
                  <p>עיר בירה: {data.capital}</p>
                  <p>שטח: {data.area}</p>
                  <p>אוכלוסייה: {data.population}</p>
                  <p>משאבים טבעיים: {data.naturalResources.join(", ")}</p>
                  <p>נהרות עיקריים: {data.rivers.join(", ")}</p>
                  <p>רכסי הרים: {data.mountains.join(", ")}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {data.famousSites.map((site, i) => (
                      <div key={i} style={{ width: 200 }}>
                        <img src={site.image} alt={site.name} style={{ width: "100%", borderRadius: 8 }} />
                        <p style={{ textAlign: "center" }}>{site.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
