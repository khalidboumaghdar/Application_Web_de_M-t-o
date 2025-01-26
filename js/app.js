function myFunction() {
  var element = document.querySelector("#darklift");
  var element1 = document.querySelector("#lightcolor");
  var element2 = document.querySelector("#dart");
  var cards = document.querySelectorAll(".card"); 

  if (element) element.classList.toggle("darkmode");
  if (element1) element1.classList.toggle("lightcolor");
  if (element2) element2.classList.toggle("dart");

  cards.forEach(card => {
    card.classList.toggle("test");
  });
}



const apiKey ='11cb9d3c864ba866be6f5e099de6f0e2'; 
geoFindMe();

function functionsearch(){
  const mapLink = document.querySelector("#map-link");

  const inputsearch = document.getElementById('inputsearch').value;
  mapLink.textContent =inputsearch ;

afficherdata(inputsearch);
}
function date(){
  const date = new Date();
}
function afficherdata(city) {
  var mytmp_day =  document.querySelector("#tmp_day");
  var mydt =  document.querySelector("#dt");


  var row = document.getElementById('row');
  row.innerHTML=" ";
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
        .then(response => response.json())
        .then(data => {
          mytmp_day.textContent=data.list[0].main.temp;
          mydt.textContent = new Date(data.list[0].dt_txt).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
console.log(data)
          for(i=0;i<=4;i++){
            row.innerHTML+=`
            <div class="col-lg-3 col-md-6 col-12 pt-4">
                                         <div class="card" >
                                         <img class="logo_card" src="http://openweathermap.org/img/wn/${data.list[i*8].weather[0].icon}@2x.png" />
      <p class="p_card">${new Date(data.list[i*8].dt_txt).toLocaleDateString("fr-FR", { weekday: "long" })}</p>
                                             <p class="p_card">Température actuelle : ${data.list[i*8].main.temp}°C</p>
                                             <p class="p_card"><span>Humidity : ${data.list[i*8].main.humidity}%</span></p>
                                              <p class="p_card"><span> vitesse du vent : ${data.list[i*8].wind.speed}km</span></p>

                                         
                                         </div>                                    
                                     </div>
           
           
           
           `
           
          }
          
               
           
        })
        .catch(err => console.log('Erreur de connexion ou API indisponible'));
}

function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");
  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      afficherdata(data.name);
            mapLink.textContent =data.name ;

       
    })
    .catch(err => console.log('Erreur de connexion ou API indisponible'));
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

