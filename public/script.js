/**
 * ⚠️ DISCLAIMER:
 * This carbon footprint calculator is a hackathon-level MVP. The emissions values
 * are dummy approximations generated using the following formula:
 * 
 * Estimated Footprint = Population × Adoption Rate × Product Footprint
 * 
 * ➕ Population: Hardcoded for each locality.
 * ➕ Adoption Rate: localityMultiplier / 10 (i.e., 0.82 = 82% product usage in that area)
 * ➕ Product Footprint: Rough estimate per unit
 * 
 * Example:
 * A Laptop in Indiranagar = 150,000 × (7.8 / 10) × 500 = 58,500,000 kg CO₂
 * 
 * Not based on verified datasets. Intended for educational & demo purposes only.
 */

const productList = ["Laptop", "T-shirt", "Mobile Phone", "Jeans", "Television"];
const localityList = [
  "Whitefield", "Kaggadasapura", "Nayandahalli", "HSR Layout", "Malleshwaram",
  "Electronic City", "Indiranagar", "Marathahalli", "Koramangala", "Jayanagar"
];

const baseFootprints = {
  "Laptop": 500,
  "T-shirt": 10,
  "Mobile Phone": 120,
  "Jeans": 40,
  "Television": 300
};

const localityMultipliers = {
  "Whitefield": 8.2,
  "Kaggadasapura": 5.6,
  "Nayandahalli": 6.3,
  "HSR Layout": 7.4,
  "Malleshwaram": 5.9,
  "Electronic City": 9.1,
  "Indiranagar": 7.8,
  "Marathahalli": 6.7,
  "Koramangala": 8.0,
  "Jayanagar": 6.1
};

const localityPopulation = {
  "Whitefield": 250000,
  "Kaggadasapura": 80000,
  "Nayandahalli": 60000,
  "HSR Layout": 150000,
  "Malleshwaram": 130000,
  "Electronic City": 100000,
  "Indiranagar": 150000,
  "Marathahalli": 120000,
  "Koramangala": 140000,
  "Jayanagar": 110000
};

const ecoTips = {
  "Laptop": [
    "Consider using lightweight Linux distributions to extend older hardware lifespan.",
    "Lower screen brightness and disable keyboard backlighting to reduce energy use.",
    "Use a solar-powered or manually rechargeable external battery when traveling.",
    "Set your laptop to hibernate rather than sleep for deeper power savings.",
    "Donate outdated laptops to e-waste programs that refurbish them for education."
  ],
  "T-shirt": [
    "Wash with a full load to maximize water efficiency.",
    "Use eco-friendly detergents with biodegradable ingredients.",
    "Consider purchasing T-shirts dyed with natural, low-impact pigments.",
    "Look for certifications like GOTS (Global Organic Textile Standard) when shopping.",
    "Store your T-shirts folded rather than hanging to reduce fiber stress and extend life."
  ],
  "Mobile Phone": [
    "Turn off location tracking and background app refresh for rarely used apps.",
    "Use browser-based apps instead of installing heavy native apps.",
    "Join local repair cafés to fix minor phone issues instead of discarding.",
    "Purchase durable phone cases made from recycled materials to protect devices.",
    "Use open-source apps that consume less data and battery over time."
  ],
  "Jeans": [
    "Spot-clean stains using eco-friendly soap instead of frequent full washes.",
    "Buy undyed or naturally dyed jeans to reduce chemical use in production.",
    "Use cold water soaking with minimal agitation to preserve fabric integrity.",
    "Avoid using fabric softeners; they break down denim fibers and pollute water.",
    "Patch small tears creatively instead of replacing jeans prematurely."
  ],
  "Television": [
    "Set your TV’s auto-off timer to shut down during inactivity periods.",
    "Use external speakers with low standby consumption rather than built-in ones.",
    "Reduce backlight intensity in dark rooms rather than relying on high brightness.",
    "Explore community electronic recycling drives that offer component-level salvage.",
    "Buy models with advanced local dimming to reduce power when displaying dark scenes."
  ]
};

let activeProductIndex = -1;
let activeLocalityIndex = -1;

let map, marker;

// function autoSuggest() {
//   const inputVal = document.getElementById('productInput').value.toLowerCase();
//   const ul = document.getElementById('suggestions');
//   ul.innerHTML = '';
//   const filtered = productList.filter(p => p.toLowerCase().startsWith(inputVal));
//   filtered.forEach(product => {
//     const li = document.createElement('li');
//     li.textContent = product;
//     li.onclick = () => {
//       document.getElementById('productInput').value = product;
//       ul.innerHTML = '';
//     };
//     ul.appendChild(li);
//   });
// }

// function autoSuggestLocality() {
//   const inputVal = document.getElementById('locationInput').value.toLowerCase();
//   const ul = document.getElementById('localitySuggestions');
//   ul.innerHTML = '';
//   const filtered = localityList.filter(l => l.toLowerCase().startsWith(inputVal));
//   filtered.forEach(loc => {
//     const li = document.createElement('li');
//     li.textContent = loc;
//     li.onclick = () => {
//       document.getElementById('locationInput').value = loc;
//       ul.innerHTML = '';
//     };
//     ul.appendChild(li);
//   });
// }

function autoSuggest() {
  const input = document.getElementById('productInput');
  const ul = document.getElementById('suggestions');
  const inputVal = input.value.toLowerCase();
  ul.innerHTML = '';
  activeProductIndex = -1;

  const filtered = productList.filter(p => p.toLowerCase().startsWith(inputVal));
  filtered.forEach((product, i) => {
    const li = document.createElement('li');
    li.textContent = product;
    li.classList.add('suggestion-item');
    li.onclick = () => {
      input.value = product;
      ul.innerHTML = '';
    };
    ul.appendChild(li);
  });

  input.onkeydown = (e) => {
    const items = ul.querySelectorAll('.suggestion-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      activeProductIndex = (activeProductIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp') {
      activeProductIndex = (activeProductIndex - 1 + items.length) % items.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeProductIndex >= 0) {
        input.value = items[activeProductIndex].textContent;
        ul.innerHTML = '';
      }
    }

    items.forEach((item, i) => {
      item.style.background = i === activeProductIndex ? '#37474f' : '';
    });
  };
}

function autoSuggestLocality() {
  const input = document.getElementById('locationInput');
  const ul = document.getElementById('localitySuggestions');
  const inputVal = input.value.toLowerCase();
  ul.innerHTML = '';
  activeLocalityIndex = -1;

  const filtered = localityList.filter(l => l.toLowerCase().startsWith(inputVal));
  filtered.forEach((loc, i) => {
    const li = document.createElement('li');
    li.textContent = loc;
    li.classList.add('suggestion-item');
    li.onclick = () => {
      input.value = loc;
      ul.innerHTML = '';
    };
    ul.appendChild(li);
  });

  input.onkeydown = (e) => {
    const items = ul.querySelectorAll('.suggestion-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      activeLocalityIndex = (activeLocalityIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp') {
      activeLocalityIndex = (activeLocalityIndex - 1 + items.length) % items.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeLocalityIndex >= 0) {
        input.value = items[activeLocalityIndex].textContent;
        ul.innerHTML = '';
      }
    }

    items.forEach((item, i) => {
      item.style.background = i === activeLocalityIndex ? '#37474f' : '';
    });
  };
}

function getRandomTip(productName) {
  const tips = ecoTips[productName];
  if (!tips) return null;
  return tips[Math.floor(Math.random() * tips.length)];
}

async function getCombinedFootprint() {
  const product = document.getElementById('productInput').value.trim();
  const locality = document.getElementById('locationInput').value.trim();
  const resultBox = document.getElementById('resultBox');

  if (!product || !locality) {
    resultBox.innerHTML = "Please enter both product and locality.";
    return;
  }

  const base = baseFootprints[product];
  const multiplier = localityMultipliers[locality] / 10;
  const population = localityPopulation[locality];

  if (!base || !multiplier || !population) {
    resultBox.innerHTML = "Data not available for this combination.";
    return;
  }

  const footprint = Math.round(population * multiplier * base);
  const tip = getRandomTip(product);

  resultBox.innerHTML = `
    <div>${product} in ${locality} emits approx <strong>${footprint.toLocaleString()}</strong> kg CO₂</div>
    ${tip ? `<div class="tip">🌿 Tip: ${tip}</div>` : ''}
    <div class="legend">
      <strong>Color Legend:</strong><br>
      <span class="dot red"></span> High Emissions<br>
      <span class="dot orange"></span> Moderate Emissions<br>
      <span class="dot green"></span> Lower emissions (relative to city average)
    </div>
  `;

  showMap(locality, footprint);
}

async function showMap(location, footprint) {
  if (!map) {
    map = L.map('map').setView([12.9716, 77.5946], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);
  }

  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}, Bengaluru`);
  const data = await res.json();
  if (data.length === 0) return;

  const { lat, lon } = data[0];
  const color = footprint > 100000000 ? 'red' : footprint > 50000000 ? 'orange' : 'green';

  if (marker) map.removeLayer(marker);
  marker = L.circleMarker([lat, lon], {
    radius: 10,
    fillColor: color,
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map).bindPopup(`${location}: ${footprint.toLocaleString()} kg CO₂`).openPopup();

  map.setView([lat, lon], 14);
}
