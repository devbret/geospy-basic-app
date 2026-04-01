document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = JSON.parse(e.target.result);
        displayPhotoInfo(data);
      };
      reader.readAsText(file);
    }
  });

function displayPhotoInfo(data) {
  const photoInfoContainer = document.getElementById("photo-info");
  photoInfoContainer.innerHTML = "";

  data.forEach((photoData) => {
    for (const [imagePath, info] of Object.entries(photoData)) {
      const container = document.createElement("div");
      container.className = "photo-container";

      const img = document.createElement("img");
      img.src = imagePath;
      img.onclick = function () {
        openModal(imagePath);
      };

      const city = document.createElement("p");
      city.innerHTML = `<span class="info-prefix">City:</span> ${info.city}`;

      const country = document.createElement("p");
      country.innerHTML = `<span class="info-prefix">Country:</span> ${info.country}`;

      const explanation = document.createElement("p");
      explanation.innerHTML = `<span class="info-prefix">Explanation:</span> ${info.explanation}`;

      const latitude = document.createElement("p");
      latitude.innerHTML = `<span class="info-prefix">Latitude:</span> ${info.latitude !== null ? info.latitude : "N/A"}`;

      const longitude = document.createElement("p");
      longitude.innerHTML = `<span class="info-prefix">Longitude:</span> ${info.longitude !== null ? info.longitude : "N/A"}`;

      const state = document.createElement("p");
      state.innerHTML = `<span class="info-prefix">State:</span> ${info.state}`;

      container.appendChild(img);
      container.appendChild(city);
      container.appendChild(country);
      container.appendChild(explanation);
      container.appendChild(latitude);
      container.appendChild(longitude);
      container.appendChild(state);

      if (info.latitude !== null && info.longitude !== null) {
        const mapContainer = document.createElement("div");
        const mapId = `map-${Math.random().toString(36).substr(2, 9)}`;
        mapContainer.id = mapId;
        mapContainer.style.height = "300px";
        mapContainer.style.marginTop = "20px";
        mapContainer.style.border = "2px solid #ff00ff";
        mapContainer.style.borderRadius = "10px";
        container.appendChild(mapContainer);

        photoInfoContainer.appendChild(container);

        const map = L.map(mapId).setView([info.latitude, info.longitude], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([info.latitude, info.longitude])
          .addTo(map)
          .bindPopup(`${info.city}, ${info.country}`)
          .openPopup();
      } else {
        photoInfoContainer.appendChild(container);
      }
    }
  });
}

function openModal(imagePath) {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");

  modal.style.display = "block";
  modalImg.src = imagePath;

  const span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };
}
