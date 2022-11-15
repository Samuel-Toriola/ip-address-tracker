"use strict";
const input = document.querySelector(".search");
const submit = document.querySelector(".arrow");
const mapDiv = document.querySelector("#map");
// const ipAddress = document.querySelector("#ip");
const details = document.querySelector(".details");

submit.addEventListener("click", function () {
  input.value ? whereAmI(input.value) : whereAmI();
});

const whereAmI = async function (ip = "") {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_iV6a6Z9rMCmQ4SRPVzsUHv5hJeZdJ&ipAddress=${ip}`
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error("Problem getting data from Ip ");

    const html = `

        <ul>
          <li class="details__list border">
            <h4>IP ADDRESS</h4>
            <p id="ip">${data.ip}</p>
          </li>
          <li class="details__list border">
            <h4>LOCATION</h4>
            <p id="location">${data.location.region}, ${data.location.country}</p>
          </li>
          <li class="details__list border">
            <h4>TIMEZONE</h4>
            <p id="timezone">${data.location.timezone}</p>
          </li>
          <li class="details__list">
            <h4>ISP</h4>
            <p id="isp">${data.isp}</p>
          </li>
        </ul>
  `;
    details.textContent = "";
    details.insertAdjacentHTML("beforeend", html);
    let map;

    const { lat } = data.location;
    const { lng } = data.location;

    const coords = [lat, lng];
    map = L.map("map").setView(coords, 11);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker(coords).addTo(map).openPopup();

    submit.addEventListener("click", function () {
      map._initContainer ? map.remove() : map;
    });
  } catch (err) {
    console.log(err);
    alert(`Something went wrong ${err.message}`);
  }
};
whereAmI();
