// weather url
let apiKey = `e83b73191dcab786fc9b90a48fb9f807`
let cityName = 'London';
let city = document.getElementById('city');
let getbtn = document.getElementById('getbtn');
let mainLeft = document.getElementById('mainLeft');
const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "Oct", "November", "December"
]


async function getData() {

    try {
        cityName = city.value || 'London';
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        let res = await fetch(URL);
        let data = await res.json();
        // console.log(data);
        draw(data)
        drawMap();
        
    } catch (error) {
        alert('enter valid country name')
    }


}

getbtn.addEventListener('click', getData);


function draw(obj) {
    let date = new Date(obj.dt * 1000);

    mainLeft.innerHTML = `
    <div>
    <h3 style="color: rgba(255, 0, 0, 0.722);">${monthNames[date.getMonth()]} ${date.getDate()}</h3>
    <h1>${obj.name}, ${obj.sys.country}</h1>
</div>
<div>
<h1><img src="https://openweathermap.org/img/wn/${obj.weather[0].icon}.png" alt="icon" width="60px"><span>23°C</span></h1>
</div>
<div>
    <h3>Feels like ${obj.main.feels_like}°C . ${obj.weather[0].description}. ${obj.weather[0].main}</h3>

</div>
<div>
    <p>Temp: ${obj.main.temp}</p>
    <p>wind speed: ${obj.wind.speed}m/s</p>
    <p>Min Temp: ${obj.main.temp_min}</p>
    <p>Pressure: ${obj.main.pressure}hPa</p>
    <p>Max Temp: ${obj.main.temp_max}</p>
    <p>Humidity: ${obj.main.humidity}%</p>
    
</div>
    `;
}

function drawMap() {
    let mainRight = document.getElementById('mainRight');
    mainRight.innerHTML = `
    <div class="mapouter">
    <div class="gmap_canvas"><iframe width="800" height="400" id="gmap_canvas"
            src="https://maps.google.com/maps?q=${city.value}&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a
            href="https://123movies-i.net">123movies-i.net</a><br>
        <style>
            .mapouter {
                position: relative;
                text-align: right;
                height: 400px;
                width: 800px;
            }
        </style><a href="https://www.embedgooglemap.net">embed google map on website</a>
        <style>
            .gmap_canvas {
                overflow: hidden;
                background: none !important;
                height: 400px;
                width: 800px;
            }
        </style>
    </div>
</div>
    `;
}


// this runs first time 
getData()