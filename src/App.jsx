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
    landmarks: [
      {
        name: "מגדל אייפל",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      },
      {
        name: "הלובר",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Louvre_Museum_Wikimedia_Commons.jpg/640px-Louvre_Museum_Wikimedia_Commons.jpg",
      },
      {
        name: "קתדרלת נוטר דאם",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/50/Notre_Dame_de_Paris_Wikimedia_Commons.jpg",
      },
    ],
    geography: ["נהר הסן", "הרי האלפים", "הים התיכון"],
  },
  {
    name: "גרמניה",
    capital: "ברלין",
    population: "כ-83 מיליון",
    area: "357,022 קמ״ר",
    landmarks: [
      {
        name: "שער ברנדנבורג",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/d6/Brandenburger_Tor_abends.jpg",
      },
      {
        name: "היער השחור",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Schwarzwald_-_Titisee.jpg",
      },
      {
        name: "חומת ברלין (שאריות)",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/43/Berlin_Mauerrest.jpg",
      },
    ],
    geography: ["נהר הריין", "הרי האלפים הבוואריים"],
  },
  {
    name: "איטליה",
    capital: "רומא",
    population: "כ-59 מיליון",
    area: "301,340 קמ״ר",
    landmarks: [
      {
        name: "הקולוסיאום",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
      },
      {
        name: "מגדל פיזה",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/44/Leaning_Tower_of_Pisa-2013.jpg",
      },
      {
        name: "הוותיקן",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Vatican_City_StPeter.jpg",
      },
    ],
    geography: ["הרי האלפים בצפון", "הרי האפנינים"],
  },
  {
    name: "ספרד",
    capital: "מדריד",
    population: "כ-47 מיליון",
    area: "505,990 קמ״ר",
    landmarks: [
      {
        name: "הסגרדה פמיליה",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/61/Sagrada_Familia_01.jpg",
      },
      {
        name: "האלמברה",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alhambra_de_Granada.jpg",
      },
    ],
    geography: ["רכס הפירנאים", "מישור קסטיליה"],
  },
  {
    name: "אנגליה",
    capital: "לונדון",
    population: "כ-56 מיליון",
    area: "130,395 קמ״ר",
    landmarks: [
      {
        name: "ביג בן",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/8c/Palace_Big_Ben.jpg",
      },
      {
        name: "טאואר אוף לונדון",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tower_of_London%2C_Thames%2C_London%2C_UK_-_Diliff.jpg",
      },
      {
        name: "ארמון בקינגהאם",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4d/Buckingham_Palace_from_gardens.jpg",
      },
    ],
    geography: ["נהר התמזה", "גבעות היורקשייר", "הים הצפוני"],
  },
  {
    name: "הולנד",
    capital: "אמסטרדם",
    population: "כ-17 מיליון",
    area: "41,543 קמ״ר",
    landmarks: [
      {
        name: "מוזיאון ואן גוך",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/70/Museum_Van_Gogh_2016_%282%29.jpg",
      },
      {
        name: "תחנות רוח",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/9b/Kinderdijk_Windmills.jpg",
      },
    ],
    geography: ["דלתת הריין", "אזורי פולדרים"],
  },
  {
    name: "יוון",
    capital: "אתונה",
    population: "כ-10 מיליון",
    area: "131,957 קמ״ר",
    landmarks: [
      {
        name: "האקרופוליס",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/Acropolis_Athens.jpg",
      },
      {
        name: "האי סנטוריני",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/9c/Santorini_-_Oia.jpg",
      },
    ],
    geography: ["הרי הפינדוס", "הים האגאי"],
  },
  {
    name: "פולין",
    capital: "ורשה",
    population: "כ-38 מיליון",
    area: "312,696 קמ״ר",
    landmarks: [
      {
        name: "העיר העתיקה בוורשה",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/b/b7/Warsaw_Old_Town_market_square.jpg",
      },
      {
        name: "קרקוב העתיקה",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/0a/Krakow_Market_Square.jpg",
      },
    ],
    geography: ["הרי הקרפטים", "נהר הויסלה"],
  },
];

export default function App() {
  const [continent, setContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div style={{ padding: 20, direction: "rtl", fontFamily: "Arial, sans-serif" }}>
      <h1>🌍 אפליקציית גיאו קוויז</h1>
      <p>בחר יבשת לצפייה במפה ובמידע</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {continents.map((c) => (
          <button
            key={c.name}
            onClick={() => {
              setContinent(c);
              setSelectedCountry(null);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {continent && (
        <div>
          <h2>🗺️ {continent.name}</h2>
          <div style={{ height: 400, marginBottom: 20 }}>
            <MapContainer center={continent.center} zoom={3} style={{ height: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </MapContainer>
          </div>

          {continent.name === "אירופה" && (
            <div>
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
                  <div>
                    <strong>אתרים מפורסמים:</strong>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {selectedCountry.landmarks.map((site, i) => (
                        <li key={i} style={{ marginBottom: 20 }}>
                          <p>{site.name}</p>
                          <img
                            src={site.image}
                            alt={site.name}
                            style={{ maxWidth: "100%", height: "auto", borderRadius: 10 }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
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
