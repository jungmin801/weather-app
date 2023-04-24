// api를 호출한다
// render로 화면을 보여준다
// 도시를 검색하면 화면이 바뀐다

let data ="";
let weatherInfo = [];
let searchButton = document.getElementById("search-button")



const searchCity = async() => {
    
    let searchKeyword = document.getElementById("search-input").value
    console.log(searchKeyword)

    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${searchKeyword}&appid=6a54d48b8ef9b88321e9c3a665c07f83`)
    let response = await fetch(url)
    data = await response.json()


    weatherInfo = [];
    weatherInfo.push(data)
    console.log(data)
    render()

}


const getWeather = async() =>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=6a54d48b8ef9b88321e9c3a665c07f83`)
    let response = await fetch(url)
    data = await response.json()

    weatherInfo.push(data)
    console.log(data)
    render()
    
}

const render = () => {

    let weatherHTML = "";

    weatherHTML = weatherInfo.map((item) => {
        return `<div class="weather-area">
        <div class="location" id="location">${item.name}</div> 
        <div class="status" id="status">${item.weather[0].main}</div>
        <img src="/img/cloudy.png">
        <div class="weather-details">
            <div class="temperature" id="temperature">${Math.ceil(item.main.temp-273.15) + "°C"}</div>
            <div class="wind-chill-temperature" id="wind-chill-temperature"> ${"Real Feel "+Math.ceil(item.main.feels_like-273.15) + "°C"}</div>
        </div>
    </div>
    <div class="winds">
        <p>
            <i class="fa-solid fa-droplet"></i>
            <span id="humidity">${item.main.humidity + "%"}</span>
        </p>
        <p>
            <i class="fa-solid fa-wind" ></i>
            <span id="wind-speed">${item.wind.speed + "km/h"}</span>
        </p>
    </div>`
    })
    document.getElementById("weather-body").innerHTML = weatherHTML;
}



searchButton.addEventListener("click",searchCity)
getWeather()