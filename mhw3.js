const text = document.querySelector('#testo_canzone');
const bottone = text.querySelector('#submit');
bottone.addEventListener('click', assegna_brano);

function assegna_brano(event){
  event.preventDefault();
  const cantante = text.querySelector('#cantante');
  const canzone = text.querySelector('#canzone');
  const url = "https://api.lyrics.ovh/v1/"
  if(cantante.value === "" || canzone.value === ""){
    alert("ATTENZIONE: Compilare i campi richiesti!")
  }else{
    fetch(url + cantante.value + "/" + canzone.value).then(onResponseCatch).then(onJson);
  }
}

function onResponseCatch(response){
  return response.json();
}

function onJson(json){
  const cantante = text.querySelector('#cantante');
  const brano = text.querySelector('#brano');
  if(json.error === "No lyrics found"){
    alert("Non è stato trovato il brano di " + cantante.value);
  }else{
    brano.innerHTML = "";
    brano.innerHTML = json.lyrics;
  }
}


const form = document.querySelector('form');
form.addEventListener('submit', ricerca)

function ricerca(event)
{
  
  event.preventDefault();
  
  const album = document.querySelector('#album');
  const album_value = encodeURIComponent(album.value);
  console.log('Eseguo ricerca: ' + album_value);
  
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson2);
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function onJson2(json) {
  console.log('JSON ricevuto');
  console.log(json);
  
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  
  const risultati = json.albums.items;
  let num_risultati = risultati.length;
 
  if(num_risultati > 6)
    num_risultati = 6;
  
  for(let i=0; i<num_risultati; i++){
    const elemento_album = risultati[i];
    const title = elemento_album.name;
    const image_album = elemento_album.images[0].url;
    const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = image_album;
    const caption = document.createElement('span');
    caption.textContent = title;
    album.appendChild(img);
    album.appendChild(caption);
    library.appendChild(album);
  }
}


const client_id = '3befb1ed96bf44acbc08b50567d67734';
const client_secret = 'acd7a62cf21b4eab92dbc075f2700c52';

let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}
