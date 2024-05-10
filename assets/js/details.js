document.getElementById("year").innerText = new Date().getFullYear();

const addressBarContent = new URLSearchParams(location.search) // isola i parametri nel contenuto della barra degli indirizzi
console.log(addressBarContent)
const gadgetId = addressBarContent.get('gadgetId')

const getGadgetData = function () {
  const spinner = document.querySelector('.spinner-border');
  const logo = document.getElementById("logo");
  spinner.style.display = 'block';
  logo.style.display = 'none';


  fetch(`https://striveschool-api.herokuapp.com/api/product/${gadgetId}`,{
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDNhNzgxODQ0MjAwMTUzNzU4ODAiLCJpYXQiOjE3MTUzMjc5MTEsImV4cCI6MTcxNjUzNzUxMX0.WUZwlrTwgdt8ro-TFJjsPS5CvWRqmhd3-bMc-OOBweM"
      }

  })
    
    // una chiamata GET fatta così NON CI TORNA TUTTI GLI EVENTI, ma UNO nello specifico!
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((gadget) => {
      console.log('DETTAGLI RECUPERATI', gadget)
      spinner.style.display = 'none';
      logo.style.display = 'block';
      // ora manipolo il DOM e riempio la card
      document.getElementById("image").setAttribute("src",gadget.imageUrl)
      document.getElementById('name').innerText = gadget.name
      document.getElementById('description').innerText = gadget.description
      document.getElementById('brand').innerText = "Brand : " + gadget.brand
      document.getElementById('price').innerText = gadget.price + '€'
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

getGadgetData();

// funzione ELIMINA
const deleteGadget = function () {
  // Chiedi conferma prima di procedere con l'eliminazione
  const confirmDelete = window.confirm("Sei sicuro di voler eliminare il gadget?");
  
  // Verifica se l'utente ha confermato l'eliminazione
  if(confirmDelete) {
    // Se confermato, procedi con la richiesta di eliminazione
    fetch(`https://striveschool-api.herokuapp.com/api/product/${gadgetId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDNhNzgxODQ0MjAwMTUzNzU4ODAiLCJpYXQiOjE3MTUzMjc5MTEsImV4cCI6MTcxNjUzNzUxMX0.WUZwlrTwgdt8ro-TFJjsPS5CvWRqmhd3-bMc-OOBweM"
      }
    })
    .then((response) => {
      if (response.ok) {
        // abbiamo eliminato con successo la risorsa!
        alert('RISORSA ELIMINATA');
        // Reindirizzamento alla pagina principale dopo l'eliminazione con successo
        location.assign('index.html');
      } else {
        // l'eliminazione della risorsa NON è andata a buon fine :(
        alert('ERRORE - RISORSA NON ELIMINATA')
      }
    })
    .catch((err) => {
      console.log('ERR', err)
    })
  }
}


// LOGICA DI MODIFICA
// troviamo il bottone modifica nella pagina dettaglio
const editButton = document.getElementById('edit-button')
editButton.addEventListener('click', function () {
  location.assign(`backoffice.html?gadgetId=${gadgetId}`)
})
