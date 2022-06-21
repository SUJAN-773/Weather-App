const API_URL = "https://api.openweathermap.org/data/2.5/forecast?";
const API_KEY = "b5caa54b500c4e5028c7929dde3c5cc7";
const ICON_URL = "http://openweathermap.org/img/wn/";
let city="";
let count=0;
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

window.addEventListener("load", eve => {
    if(count===0) getLocation();
    else {
        const URL=`${API_URL}q=${city}&appid=${API_KEY}&units=metric&cnt=10`;    
        getWeather(URL);
    }
})

document.querySelector(".formbutton").addEventListener("click", e => {
    e.preventDefault();
    city=document.getElementsByTagName("input")[0].value;
    document.getElementsByTagName("input")[0].value='';
    const URL=`${API_URL}q=${city}&appid=${API_KEY}&units=metric&cnt=10`;    
    getWeather(URL);
})

function getLocation() {
    count=1;
    if (!navigator.geolocation) {
      console.log('OoPs!! Something is fishyyy...');
    } else {
      console.log('Checking location...');
      navigator.geolocation.getCurrentPosition(success, error);      
    }
}

function success(position) {
    locpermitted=true;
    console.log(position);
    const lat=position.coords.latitude;
    const long=position.coords.longitude;
    const URL=`${API_URL}lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&cnt=10`;   
    getWeather(URL);
}
function error() {
    console.log('Geolocation error!');
}

async function getWeather(URL){
    try{
        const res=await fetch(URL);
        if(!res.ok){
            throw new Error("No weather Found");            
        }
        const data=await res.json();
        if(data.cod!=200){
            alert(data.message);
            throw new Error("No weather Found");
        }
        console.log(data);
        displayData(data);
    }catch{alert('No Location Found')}
}

function displayData(data){
    changeTodayForecast(data);
    const cityname = data.city.name;
    document.getElementsByClassName("moreonloc")[0].innerText="More on "+cityname;
    changeMoreForecast(data);
}

function changeMoreForecast(data){
    var tdtemp0 = data.list[1].main.temp;
    document.getElementsByTagName("td")[0].getElementsByTagName("p")[0].innerText=tdtemp0+" °C";
    var tdcondition0=data.list[1].weather[0].description;
    document.getElementsByTagName("td")[0].getElementsByTagName("p")[1].innerText=tdcondition0;
    var tdchance0=data.list[1].wind.speed;
    document.getElementsByTagName("td")[0].getElementsByTagName("p")[2].innerText="Wind Speed: "+tdchance0+" m/s";
    var tddate0=data.list[1].dt_txt;
    document.getElementsByTagName("td")[0].getElementsByTagName("p")[3].innerText=days[new Date(tddate0).getDay()]+", "+tddate0.substring(11, 16);
    document.querySelector(".tdweathericon1").setAttribute('src', `${ICON_URL}${data.list[1].weather[0].icon}@2x.png`);


    var tdtemp1 = data.list[2].main.temp;
    document.getElementsByTagName("td")[1].getElementsByTagName("p")[0].innerText=tdtemp1+" °C";
    var tdcondition1=data.list[2].weather[0].description;
    document.getElementsByTagName("td")[1].getElementsByTagName("p")[1].innerText=tdcondition1;
    var tdchance1=data.list[2].wind.speed;
    document.getElementsByTagName("td")[1].getElementsByTagName("p")[2].innerText="Wind Speed: "+tdchance1+" m/s";
    var tddate1=data.list[2].dt_txt;
    document.getElementsByTagName("td")[1].getElementsByTagName("p")[3].innerText=days[new Date(tddate1).getDay()]+", "+tddate1.substring(11, 16);
    document.querySelector(".tdweathericon2").setAttribute('src', `${ICON_URL}${data.list[2].weather[0].icon}@2x.png`);


    var tdtemp2 = data.list[3].main.temp;
    document.getElementsByTagName("td")[2].getElementsByTagName("p")[0].innerText=tdtemp2+" °C";
    var tdcondition2=data.list[3].weather[0].description;
    document.getElementsByTagName("td")[2].getElementsByTagName("p")[1].innerText=tdcondition2;
    var tdchance2=data.list[3].wind.speed;
    document.getElementsByTagName("td")[2].getElementsByTagName("p")[2].innerText="Wind Speed: "+tdchance2+" m/s";
    var tddate2=data.list[3].dt_txt;
    document.getElementsByTagName("td")[2].getElementsByTagName("p")[3].innerText=days[new Date(tddate2).getDay()]+", "+tddate2.substring(11, 16);
    document.querySelector(".tdweathericon3").setAttribute('src', `${ICON_URL}${data.list[3].weather[0].icon}@2x.png`);


    var tdtemp3 = data.list[4].main.temp;
    document.getElementsByTagName("td")[3].getElementsByTagName("p")[0].innerText=tdtemp3+" °C";
    var tdcondition3=data.list[4].weather[0].description;
    document.getElementsByTagName("td")[3].getElementsByTagName("p")[1].innerText=tdcondition3;
    var tdchance3=data.list[4].wind.speed;
    document.getElementsByTagName("td")[3].getElementsByTagName("p")[2].innerText="Wind Speed: "+tdchance3+" m/s";   
    var tddate3=data.list[4].dt_txt;
    document.getElementsByTagName("td")[3].getElementsByTagName("p")[3].innerText=days[new Date(tddate3).getDay()]+", "+tddate3.substring(11, 16); 
    document.querySelector(".tdweathericon4").setAttribute('src', `${ICON_URL}${data.list[4].weather[0].icon}@2x.png`);
}

function changeTodayForecast(data){
    const todaytemp = data.list[0].main.temp;
    const weathercondition = data.list[0].weather[0].main;
    const Description = data.list[0].weather[0].description;
    const feelslike=data.list[0].main.feels_like;
    const humidity=data.list[0].main.humidity;
    const pressure=data.list[0].main.pressure;
    const mintemp=data.list[0].main.temp_min;
    const maxtemp=data.list[0].main.temp_min;

    document.getElementsByClassName("todaytemp")[0].innerText=Math.round(todaytemp)+" °C";
    document.getElementsByClassName("weathercondition")[0].innerText=weathercondition;
    document.getElementsByClassName("Description")[0].innerText=Description;
    //document.getElementsByClassName("yesdataclassh1")[0].innerText="Today at "+cityname;
    document.getElementsByClassName("date")[0].innerText=days[new Date().getDay()]+" "+months[new Date().getMonth()]+", "+new Date().getDate();
    document.querySelector(".weathericon").setAttribute('src', ICON_URL+data.list[0].weather[0].icon+"@2x.png");
    document.getElementsByClassName("realfeel")[0].innerText = "Real Feel: "+Math.round(feelslike)+" °C";
    document.getElementsByClassName("Humidity")[0].innerText="Humidity: "+Math.round(humidity)+"%"
    document.getElementsByClassName("pressure")[0].innerText="Pressure: "+Math.round(pressure)+" hPa";
    document.getElementsByClassName("mintemp")[0].innerText="Min temp: "+Math.round(mintemp)+" °C";
    document.getElementsByClassName("maxtemp")[0].innerText="Max temp: "+Math.round(maxtemp)+" °C";
}