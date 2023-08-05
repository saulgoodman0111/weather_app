
const container = document.getElementById("cities-container"); 
const input = document.getElementById("search-inpt");
const add_btn = document.getElementById("add-city-btn");
const apiKey = `9af689bf8a0c10193a12be219f1d8a92`;
let arr = [];


async function fetchWeather(){
    const city = input.value.trim();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    addInArr(data);
}


function addInArr(data){
    if(data.message === 'city not found'){
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(data.name === element.name){
            insert = !insert;
            return;
        }
    }
    arr.push(data);
    arr.sort((a,b)=>{
        return a.main.temp - b.main.temp;
    })
    container.innerHTML = '';
    arr.forEach((ele) =>{
        makeWeatherCards(ele);
    })
}

function makeWeatherCards(data){
    const weather = document.createElement("div");
    weather.className = "weather";
    const info = selectLogo(data);
    let logo = info[0];
    let desc = info[1];
    let myStr = `
    <div class="top">
        <div class="temperature">${Math.round(data.main.temp)}°</div>
        <div class="logo"><img src="${logo}" alt="error"></div>
    </div>
    <div class="feels-like"> Feels like: ${Math.round(data.main.feels_like)}° </div>
    <div class="humidity"> Humidity: ${data.main.humidity}%</div> 
    <div class="bottom">
        <div class="city">${data.name},${data.sys.country}</div>
        <div class="weather-cond">${desc}</div>
    </div>`;
    weather.innerHTML = myStr;
    container.appendChild(weather);

}


function selectLogo(data){
    let imageUrl = "";
    let desc = "";
    if(data.weather[0].main === "Clear" || data.weather[0].main === "Sunny"){
        imageUrl = "assets/sunny-icon.png";
        desc = "Sunny";
    }
    
    else if(data.weather[0].main === "Storm" || Math.round(data.wind.speed) >= 15){
        imageUrl = "assets/wind-icon.png";
        desc = "Windy";
        
    }
    
    else if(data.weather[0].main === "Rain" || Math.round(data.rain) >= 10){
        imageUrl = "assets/rainIcon.png";
        desc = "Rainy";
        
    }
    else if(data.weather[0].main === "Haze" || data.weather[0].main === "Cloud" || Math.round(data.clouds) >= 65){
        imageUrl = "assets/cloudyIcon.png";
        desc = "Cloudy";
        
    }else{
        imageUrl = "assets/rain-cloud-icon.png";
        desc = "Partially Cloudy";

    }
    let info = [imageUrl,desc];
    return info;
}



add_btn.addEventListener("click",fetchWeather);
