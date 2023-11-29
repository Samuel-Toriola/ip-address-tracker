"use strict";
const input = document.querySelector(".search");
const submit = document.querySelector(".arrow");
const mapDiv = document.querySelector("#map");
const form = document.querySelector(".input__field");
// const ipAddress = document.querySelector("#ip");
const details = document.querySelector(".details");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  input.value ? whereAmI(input.value) : whereAmI();
});

form.addEventListener("click", function (e) {
  e.preventDefault();
});

const whereAmI = async function (ip = "") {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_dyNYUy1rsEkE1IRVN2xo5M2t5I3il&ipAddress=${ip}`
    );
    const data = await res.json();
    console.log(data);

    if (!data.isp) {
      setTimeout(function () {
        // location.reload();
      }, 3000);
      throw new Error(
        "Use a generalized Ip address, Like a state or country. Page will now reload"
      );
    }
    if (!res.ok) throw new Error("Problem getting data from Ip ");

    const html = `

<<<<<<< HEAD
          
          <li class="details__list ">
=======
        <ul details__lists>
          <li class="details__list border">
>>>>>>> 669a5dea8da09faba33d7fef0d802557798dc3d0
            <h4>IP ADDRESS</h4>
            <p id="ip">${data.ip}</p>
          </li>
          <li class="details__list ">
            <h4>LOCATION</h4>
            <p id="location">${data.location.region}, ${data.location.country}</p>
          </li>
          <li class="details__list add">
            <h4>TIMEZONE</h4>
            <p id="timezone">${data.location.timezone}</p>
          </li>
          <li class="details__list">
            <h4>ISP</h4>
            <p id="isp">${data.isp}</p>
          </li>
          
       
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
    alert(`Something went wrong ${err.message}`);
  }
};
whereAmI();
