document.addEventListener("DOMContentLoaded", function () {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  const offices = [
    { name: "Pietermaritzburg office", lat: -29.6006, lng: 30.3794,
      text: "KwaZulu-Natal head office area." },
    { name: "Johannesburg office", lat: -26.2041, lng: 28.0473,
      text: "Gauteng office area." }
  ];

  const map = L.map("map").setView([-28.0, 29.2], 6);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  offices.forEach(function (o) {
    const marker = L.marker([o.lat, o.lng], { title: o.name }).addTo(map);
    const box = document.createElement("div");
    const h = document.createElement("strong");
    h.textContent = o.name;
    const p = document.createElement("p");
    p.textContent = o.text;
    box.append(h, p);
    marker.bindPopup(box);
  });

  const group = L.featureGroup(offices.map(function (o) { return L.marker([o.lat, o.lng]); }));
  map.fitBounds(group.getBounds().pad(0.3));
});