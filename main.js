// api를 호출한다
// render로 화면을 보여준다
// 도시를 검색하면 화면이 바뀐다

let data ="";
let weatherInfo = [];
let hourlyInfo =[];
let searchButton = document.getElementById("search-button")
let url;
let hourlyUrl;

//getWeather로 searchCity와 seoulWeather를 하나로 합치기

const getWeather = async() => {

    try{
        let response = await fetch(url)
        data = await response.json()

        let hourlyResponse = await fetch(hourlyUrl)
        hourlyData = await hourlyResponse.json()

        if(response.status == 200 || hourlyResponse.status == 200){
            if(data.name == null || hourlyData.cnt == 0){
                throw new Error("No matches for your search.")
            }
            weatherInfo = [];
            hourlyInfo =[];
            weatherInfo.push(data)
            hourlyInfo = hourlyData.list
            render()
        } else {
            throw new Error(data.message)
        }
    }catch(error){
        errorRender(error.message)
    }
        
}


// 도시 검색하기
const searchCity = async() => {
    let searchKeyword = document.getElementById("search-input").value;
    url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${searchKeyword}&appid=6a54d48b8ef9b88321e9c3a665c07f83`);
    hourlyUrl = new URL(`https://api.openweathermap.org/data/2.5/forecast?q=${searchKeyword}&appid=6a54d48b8ef9b88321e9c3a665c07f83`);

    getWeather()
}

//초기화면은 서울 날씨

const seoulWeather = async() => {

    url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=6a54d48b8ef9b88321e9c3a665c07f83`);
    hourlyUrl = new URL(`https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=6a54d48b8ef9b88321e9c3a665c07f83`);
    
    getWeather();    
}




//가져온 데이터로 화면보여주기
const render = () => {

    let weatherHTML = "";
    let hourlyHTML = "";


    weatherHTML = weatherInfo.map((item) => {
        return `<p class="location" id="location">
                <i class="fa-solid fa-location-dot"></i>
                ${item.name}
            </p>
            <p class="temperature" id="temperature">${Math.ceil(item.main.temp-273.15) + "°C"}</p> 
            <p class="status" id="status">${item.weather[0].main}</p>
            <p class="high-low"> ${Math.ceil(item.main.temp_min-273.15) + "°C / "+Math.ceil(item.main.temp_max-273.15) + "°C"}</p>
            <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png">
            <div class="others">
                <div>
                    <p><i class="fa-solid fa-droplet" style="margin-right:5px"></i>Humidity</p>
                    <p><i class="fa-solid fa-wind" style="margin-right:5px"></i>Wind Speed</p>
                    <p><i class="fa-solid fa-cloud-rain" style="margin-right:5px"></i>Rain</p>
                </div>
                <div>
                    <p>${item.main.humidity + "%"}</p>
                    <p>${item.wind.speed + "m/s"}</p>
                    <p>10%</p>
                </div>
            </div>
    </div>`
    })


    for(let i=0;i<7;i++){
        let covertDate = new Date(hourlyInfo[i].dt*1000)
        let date = covertDate.getDate()
        let months = covertDate.getMonth();
        let dayNum = covertDate.getDay()
        let hours = covertDate.getHours()
        let week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

        hourlyHTML += `<div class="days" id="days">
        <p id="day" style="font-weight:bold">${week[dayNum]+" "+months+"/"+date}</p>
        <p id="hours" >${hours + "h"}</p>
        <img src="https://openweathermap.org/img/w/${hourlyInfo[i].weather[0].icon}.png">
        <p id="hourly-min-max">${Math.ceil(hourlyInfo[i].main.temp_min-273.15) + "°C / "+Math.ceil(hourlyInfo[i].main.temp_max-273.15) + "°C"}</p>
    </div>`

    }
    

    document.getElementById("weather-body").innerHTML = weatherHTML;
    document.querySelector(".sub-block").innerHTML = hourlyHTML;
}

//에러 보여주기
const errorRender = (message) => {
    let errorHTML=`<div> ${message} </div>`
    document.getElementById("weather-body").innerHTML = errorHTML;                
}

//도시 검색 버튼
searchButton.addEventListener("click",searchCity)
seoulWeather()