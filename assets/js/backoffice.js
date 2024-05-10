document.getElementById("year").innerText = new Date().getFullYear();

class Gadget {
  constructor(_name, _description, _brand, _imageUrl,_price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

const addressBarContent = new URLSearchParams(location.search)
const gadgetId = addressBarContent.get('gadgetId') 



let gadgetToModify

const getGadgetData = function () {
  const spinner = document.querySelector('.spinner-border');
  const logo = document.getElementById("logo");
  spinner.classList.remove('d-none');
  spinner.classList.add('d-block');
  logo.style.display = 'none';
  fetch(`https://striveschool-api.herokuapp.com/api/product/${gadgetId}`,{
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDNhNzgxODQ0MjAwMTUzNzU4ODAiLCJpYXQiOjE3MTUzMjc5MTEsImV4cCI6MTcxNjUzNzUxMX0.WUZwlrTwgdt8ro-TFJjsPS5CvWRqmhd3-bMc-OOBweM"
      }
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
    .then((gadget) => {
      console.log('DETTAGLI RECUPERATI', gadget)
      spinner.classList.add('d-none');
      logo.style.display = 'block';
      
      document.getElementById('name').value = gadget.name
      document.getElementById('description').value = gadget.description
      document.getElementById('brand').value = gadget.brand
      document.getElementById('imageUrl').value = gadget.imageUrl
      document.getElementById('price').value = gadget.price
      gadgetToModify = gadget
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

if (gadgetId) {
  getGadgetData()
  document.getElementsByClassName('btn-success')[0].innerText = 'MODIFICA'
}


const submitGadget = function (e) {
  e.preventDefault()
  
  const nameInput = document.getElementById('name') 
  const descriptionInput = document.getElementById('description') 
  const brandInput = document.getElementById('brand') 
  const imageUrlInput = document.getElementById('imageUrl')
  const priceInput = document.getElementById('price') 

  const gadgetFromForm = new Gadget(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  )


  let URL = 'https://striveschool-api.herokuapp.com/api/product/'
  let methodToUse = 'POST'

  if (gadgetId) {
    URL = `https://striveschool-api.herokuapp.com/api/product/${gadgetToModify._id}`
    methodToUse = 'PUT'
  }

  fetch(URL, {
    method: methodToUse,
    body: JSON.stringify(gadgetFromForm), 
    headers: {
      'Content-type': 'application/json', 
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDNhNzgxODQ0MjAwMTUzNzU4ODAiLCJpYXQiOjE3MTUzMjc5MTEsImV4cCI6MTcxNjUzNzUxMX0.WUZwlrTwgdt8ro-TFJjsPS5CvWRqmhd3-bMc-OOBweM"
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(`Gadget ${gadgetId ? 'modificato' : 'creato'} con successo!`)
        window.location.href="index.html" //ritorno alla home dopo la conferma
      } else {
        throw new Error('Errore nel salvataggio della risorsa')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
      alert(err)
    })
}

document.getElementById('event-form').addEventListener('submit', submitGadget)


const confirmReset = function (e) {
  const confirmed = window.confirm("Sei sicuro di voler cancellare tutto il contenuto del form?");
  

  if (!confirmed) {
    e.preventDefault();
  }
};


const resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener('click', confirmReset);

