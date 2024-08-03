
const grantAccess = document.querySelector(".grant-location-container");
const grantBtn = document.querySelector("[data-grantAccess]");
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
let oldTab = userTab;
oldTab.classList.add("grey-tab");
getfromSessionStorage();



function swapTab(clickedTab){
    if(clickedTab != oldTab){
        oldTab.classList.remove("grey-tab");
        oldTab=clickedTab
        oldTab.classList.add("grey-tab");
    }
    if(!searchForm.classList.contains("active")){
        userInfoContainer.classList.remove("active")
        grantAccess.classList.remove("active")
        searchForm.classList.add("active");
    }
    else{searchForm.classList.remove("active")
        userInfoContainer.classList.remove("active")
        getfromSessionStorage()
    }
}

userTab.addEventListener("click" , ()=>{
    swapTab(userTab)
});

searchTab.addEventListener("click" ,()=>{
    swapTab(searchTab)
} );

function getfromSessionStorage(){
    let localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccess.classList.add("active")
    }
    else{
        const coordinates = JSON.parse(localCoordinates)
        fetchUserWeatherInfo(coordinates)
    }  
}

async function fetchUserWeatherInfo(coordinates){
    let {lat,lon} = coordinates;
    grantAccess.classList.remove("active")
    loadingScreen.classList.add("active")
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active")
        renderWeatherInfo(data)
    }
    
    catch(err){
        loadingScreen.classList.remove("active")
    }
}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo)

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}


 
grantBtn.addEventListener("click" , getLocation)

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{

    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,

    }

    sessionStorage.setItem("user-coordinates" , JSON.stringify(userCoordinates))
    fetchUserWeatherInfo(userCoordinates)
}



const searchInput= document.querySelector("[data-searchInput]")

searchForm.addEventListener("click" , (e)=>{
    e.preventDefault();
     let cityName = searchInput.value;

     if(cityName==""){
        return
     }
     else
        fetchSearchWeatherInfo(cityName)
})


async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccess.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        
    }
}