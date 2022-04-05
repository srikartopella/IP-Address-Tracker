// Selectors
const ip = document.querySelector("#ip");
const locationElement = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
// Input Selectors
const button = document.querySelector("#button");
const input = document.querySelector("#input");

// Functions
// This brings data from the provided url
async function getData(url) {
  return await fetch(url).then((res) => res.json());
}

// this will make the map
function makeMap(lat, lon) {
  let container = L.DomUtil.get("map");

  if (container != null) {
    container._leaflet_id = null;
  }

  let map = L.map("map").setView([lat, lon], 14);

  map.dragging.disable();

  let myIcon = L.icon({
    iconUrl: "../../images/icon-location.svg",
    iconSize: [35, 40],
  });

  L.marker([lat, lon], { icon: myIcon }).addTo(map);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoic3Jpa2FydG9wZWxsYSIsImEiOiJjbDFreGZmY2YwNGhmM2RvMnZoazNxMDl4In0.do6UQmSuhjCx9-CJOjGVNg",
    {
      maxZoom: 20,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);
}

// this will load according to the availability of ip address
async function load(ipAddress) {
  if (!ipAddress) {
    const defaultUrl = "http://ip-api.com/json";
    await getData(defaultUrl).then((res) => {
      changeUI(res);
    });
  } else {
    const url = `http://ip-api.com/json/${ipAddress}`;
    await getData(url).then((data) => {
      changeUI(data);
    });
  }
}

// this will change the UI according to the data
function changeUI(data) {
  ip.textContent = data.query;
  locationElement.textContent = data.city;
  timezone.textContent = data.timezone;
  isp.textContent = data.isp;
  makeMap(data.lat, data.lon);
}

// this will load the data
window.addEventListener("DOMContentLoaded", () => {
  load();
});

// this will load the data according to the ip address
button.addEventListener("click", () => {
  let value = input.value;

  load(value);
});
