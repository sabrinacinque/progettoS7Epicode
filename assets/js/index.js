// riempie lo span "year"
document.getElementById("year").innerText = new Date().getFullYear();

// riempiamo la riga con gli eventi
// https://striveschool-api.herokuapp.com/api/agenda

const generateGadgetCards = function (gadgetsArray) {
  const row = document.getElementById("events-row");
  gadgetsArray.forEach((gadget) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column border-3 border-danger bg-black text-white">
        <img src="${gadget.imageUrl}" class="card-img-top" alt="immagini di gadget" style="width: 100%; height: 300px;">
        <div class="card-body d-flex flex-column justify-content-around">
          <h5 class="card-title">${gadget.name}</h5>
          <p class="card-text">${gadget.description}</p>
          <div class="col d-flex flex-column justify-content-end ">
            <p class="card-text">Brand:${gadget.brand}</p>
            <div class="d-flex justify-content-evenly">
              <button class="btn btn-warning text-danger fw-bolder fs-4 border-danger border-3">${gadget.price}€</button>
              <a href="details.html?gadgetId=${gadget._id}" class="btn btn-success text-danger fw-bolder fs-4 border-danger border-3">INFO</a>
            </div>
          </div>
        </div>
      </div>
      `;
    row.appendChild(newCol);
    console.log("id del mio gadget", gadget._id);
  });
};

const getGadgets = function () {
  //  recuperiamo la lista di eventi attualmente nel database
  const spinner = document.querySelector(".spinner-border");
  const logo = document.getElementById("logo");
  spinner.style.display = "block";
  logo.style.display = "none";
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDNhNzgxODQ0MjAwMTUzNzU4ODAiLCJpYXQiOjE3MTUzMjc5MTEsImV4cCI6MTcxNjUzNzUxMX0.WUZwlrTwgdt8ro-TFJjsPS5CvWRqmhd3-bMc-OOBweM",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.style.display = "block"; // Mostra il messaggio di errore

        if (response.status === 404) {
          errorMessageElement.innerText =
            "Errore: La risorsa richiesta non è stata trovata.";
        } else if (response.status === 500) {
          errorMessageElement.innerText =
            "Errore: La risposta del server è stata negativa.";
        } else {
          errorMessageElement.innerText = "Errore sconosciuto.";
        }

        throw new Error("Errore durante la richiesta.");
      }
    })
    .then((array) => {
      console.log("ARRAY!", array);
      spinner.style.display = "none";
      logo.style.display = "block";
      // creiamo le card per la landing page
      generateGadgetCards(array);
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getGadgets();
