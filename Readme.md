# 🌱 Carbon Footprint Estimator

A lightweight MVP web app built for the **Walmart Sparkathon 2025**, allowing users to estimate the carbon footprint of a product based on their locality. It also visualizes footprint data on a map and suggests eco-friendly tips per product.

## 🔍 Features

- 🌍 Estimate carbon footprint based on product + locality combo.
- 📍 Visualize footprint on an interactive Leaflet.js map (with dark mode).
- 💡 Get random actionable eco-tips based on selected product.
- 🔎 Real-time autosuggestions with keyboard navigation (arrow keys + Enter).
- 🌒 Sleek dark UI with responsive layout.

## 🛠 Tech Stack

- HTML, CSS, JavaScript
- Leaflet.js for mapping
- OpenStreetMap (with CARTO dark tiles)
- DOM manipulation + vanilla JS (no frameworks)
- Geocoding via Nominatim API

## ⚠️ Disclaimer

This is a **hackathon-level MVP** built to demonstrate idea feasibility. All carbon emission data is **simulated using dummy logic**:

Footprint = Base Product Value × (Locality Multiplier / 10)


**Not intended for real-world environmental assessments.**

## 🚀 How to Run Locally

1. Clone or download this repository.
2. Open `index.html` in your browser — no server setup required.
3. Type a product and locality, select from suggestions using arrow keys, and click “Get Carbon Footprint.”
4. View results and the map instantly.

## ✨ Future Improvements

- Real data integration from verified carbon lifecycle databases.
- User history + analytics dashboard.
- Support for more granular regions + products.
- Progressive Web App (PWA) version.

## 📸 Preview 
Example:
![Footprint app preview](app_preview.png)  

## 👩‍💻 Author

Developed by **Aleena**, 3rd Year ISE Student, for Walmart Sparkathon 2025. ❤️

---

🔒 No data is stored. All calculations happen client-side.