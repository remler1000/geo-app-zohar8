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

const europeCountries = [
  {
    name: "צרפת",
    capital: "פריז",
    population: "כ-67 מיליון",
    area: "643,801 קמ״ר",
    landmarks: ["מגדל אייפל", "הלובר", "קתדרלת נוטר דאם"],
    geography: ["נהר הסן", "הרי האלפים", "הים התיכון"],
  },
  {
    name: "גרמניה",
    capital: "ברלין",
    population: "כ-83 מיליון",
    area: "357,022 קמ״ר",
    landmarks: ["שער ברנדנבורג", "היער השחור", "החומה"],
    geography: ["נהר הריין", "הרי האלפים הבוואריים"],
  },
  {
    name: "איטליה",
    capital: "רומא",
    population: "כ-59 מיליון",
    area: "301,340 קמ״ר",
    landmarks: ["הקולוסיאום", "מגדל פיזה", "הוותיקן"],
    geography: ["הרי האלפים בצפון", "הרי האפנינים"],
  },
  {
    name: "ספרד",
    capital: "מדריד",
    population: "כ-47 מיליון",
    area: "505,990 קמ״ר",
    landmarks: ["הסגרדה פמיליה", "האלמברה"],
    geography: ["רכס הפירנאים", "מישור קסטיליה"],
  },
  {
    name: "אנגליה",
    capital: "לונדון",
    population: "כ-56 מיליון (בתוך בריטניה)",
    area: "130,395 קמ״ר",
    landmarks: ["ביג בן", "טאוור אוף לונדון", "ארמון בקינגהאם"],
    geography: ["נהר התמזה", "גבעות היורקשייר", "הים הצפוני"],
  },
  {
    name: "הולנד",
    capital: "אמסטרדם",
    population: "כ-17 מיליון",
    area: "41,543 קמ״ר",
    landmarks: ["מוזיאון ואן גוך", "תחנות רוח", "האג"],
    geography: ["דלתת הריין", "אזורי ייבוש (פולדרים)"],
  },
  {
    name: "יוון",
    capital: "אתונה",
    population: "כ-10 מיליון",
    area: "131,957 קמ״ר",
    landmarks: ["האקרופוליס", "סנטוריני", "דלפוי"],
    geography: ["הרי הפינדוס", "הים האגאי", "אלפי איים"],
  },
  {
    name: "פולין",
    capital: "ורשה",
    population: "כ-38 מיליון",
    area: "312,696 קמ״ר",
    landmarks: ["העיר העתיקה בוורשה", "קרקוב"],
    geography: ["הרי הקרפטים", "הנהר ויסלה", "יערות צפופים"],
  },
];

export default function App() {
  const [continent, setContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div style={{ padding: 20, direction: "rtl", fontFamily: "Arial" }}>
      <h1>🌍 אפליקציית גיאו קוויז</h1>
      <p>בחר יבשת לצפייה במפה ובמידע</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
        <div style={{ marginTop: 20 }}>
          <h2>🗺️ {continent.name}</h2>
          <div style={{ height: 400 }}>
            <MapContainer center={continent.center} zoom={3} style={{ height: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </MapContainer>
          </div>

          {continent.name === "אירופה" && (
            <div style={{ marginTop: 30 }}>
              <h3>🌍 מדינות באירופה</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                {europeCountries.map((country) => (
                  <button key={country.name} onClick={() => setSelectedCountry(country)}>
                    {country.name}
                  </button>
                ))}
              </div>

              {selectedCountry && (
                <div style={{ backgroundColor: "#f3f4f6", padding: 20, borderRadius: 10 }}>
                  <h4>🗺️ {selectedCountry.name}</h4>
                  <p><strong>בירה:</strong> {selectedCountry.capital}</p>
                  <p><strong>אוכלוסייה:</strong> {selectedCountry.population}</p>
                  <p><strong>שטח:</strong> {selectedCountry.area}</p>
                  <p><strong>אתרים מפורסמים:</strong> {selectedCountry.landmarks.join(", ")}</p>
                  <p><strong>מאפיינים גאוגרפיים:</strong> {selectedCountry.geography.join(", ")}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
