// let x = [
//     {
//         cod: '02d',
//     },
// ]
// let y = `
// <img src="./images/${x[0].cod}.png">
// `
// weather.innerHTML = y;

let buttonFindOut = document.querySelector(".buttonFindOut");
let weather = document.querySelector(".weather");
let blockWeather = document.createElement("div");
let blockImage = document.createElement("div"); // див для картинки справа
weather.appendChild(blockWeather);
weather.appendChild(blockImage); // див для картинки справа
blockWeather.classList.add("styleWeather");
blockImage.classList.add("imageHouse"); // див для картинки справа

buttonFindOut.addEventListener("click", press);
function press() {
  let inputCity = document.querySelector(".inputCity").value;

  translateInput(inputCity);
}
function translateInput(inputCity) {

  // если inputCity введен то... : иначе...
  // inputCity подразумевает true (тернарный оператор)
  let params = (inputCity)? inputCity:'Chisinau'
  let infoLink = `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=5eaaa32a097c104d156a960470660637`;
  let myRequest = new XMLHttpRequest();
  myRequest.open("GET", infoLink);
  myRequest.responseType = "json";
  myRequest.onload = () => {
    let info = myRequest.response;
    // console.log(info.main.temp);
    console.log(info);
    // вывод температуры
    let infoGrades = (info.main.temp - 273.15).toFixed(1);
    let minGrades = (info.main.temp_min - 273.15).toFixed(1);
    let maxGrades = (info.main.temp_max - 273.15).toFixed(1);
    // вывод картинки иконки
    let iconWeather = info.weather[0].icon;
    let altInfo = info.weather[0].main;
    let descriptionIcon = info.weather[0].description;
    // стандарты видимости - закрашивание в разные цвета
    // через тернарный оператор
    let visibilityInfo = info.visibility;
    let visibilityColor =
      visibilityInfo >= 500
        ? "bgvisibilityBlue"
        : visibilityInfo >= 250 && visibilityInfo < 500
        ? "bgvisibilityOrange"
        : visibilityInfo >= 0 && visibilityInfo < 250
        ? "bgvisibilityRed"
        : "";
    let x = info.sys.sunrise;
    let sunRise1 = new Date(x * 1000);
    let sunRise = sunRise1.getHours() + "." + sunRise1.getMinutes();
    let y = info.sys.sunset;
    let sunSet1 = new Date(y * 1000);
    let sunSet = sunSet1.getHours() + "." + sunRise1.getMinutes();
    let mediumTemp = `
<div class="locationCity">
<img src="./images/iconLocation.png" id="locationImage">
<p class="textCity">${params}</p>
</div>
<div class="defineWeatherImg">
<img src="./images/${iconWeather}.png" alt="${altInfo}">
</div>
<div class="descriptionIcon">
<p>${descriptionIcon}</p>
</div>
<div class="degreesWheather">
<p>${infoGrades}°C</p>
<div class="minmaxTemp">
<p>${minGrades}°C</p>
<p>/</p>
<p>${maxGrades}°C</p>
</div>
</div>
<div class="infoWheather">
<div>
<p>Visibility on the road:</p>
<p class="${visibilityColor}">${visibilityInfo}</p>
</div>
<div>
<p>Humidity: ${info.main.humidity} %</p>
<p>Pressure: ${info.main.pressure} mmHg</p>
</div>
<div>
<p>Wind speed: ${info.wind.speed} m/s</p>
<p></p>
</div>
<div>
<p>Sunrise: at ${sunRise} o'clock</p>
<p>Sunset: at ${sunSet} o'clock</p>
</div>
</div>
`;
    // див для картинки справа
    let resultImage = ` 
<div class="resultImage" id="anim_block">
</div>
`;
    blockWeather.innerHTML = mediumTemp;
    blockImage.innerHTML = resultImage; // див для картинки справа
  };
  myRequest.send();
}


translateInput();
