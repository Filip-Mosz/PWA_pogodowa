//todo: pobrać wszystkie potrzebne elementy HTML i przypisać do zmiennych
const input = document.querySelector('input');
const date = document.querySelector('p.date');
const temp  = document.querySelector('p.temp') ;
const description = document.querySelector('p.description');
const feelsLike = document.querySelector('p.feels-like');
const windSpeed = document.querySelector('p.wind-speed');
const pressure = document.querySelector('p.pressure');
const humidity = document.querySelector('p.humidity');
const visibility = document.querySelector('p.visibility');
const clouds = document.querySelector('p.clouds');
const rain  = document.querySelector('p.clouds');
const cityName = document.querySelector('p.city-name');
const errorMsg = document.querySelector('p.error-message');

// https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={API key}
const apiKey = 'd20fa37a146ca32fc6109bfe2ac2de61' //todo: zamienić na zaciagane z pliku
const apiInfo = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q=',
    key : "&appId=" + apiKey,
    units : "&units=metric",
    lang : "&lang=pl"
}

function getWeather (){
    const apiCity = input.value.toLowerCase().trim();
    const URL = `${apiInfo.link}${apiCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    console.log(URL);

    axios.get(URL).then((response) => {
        console.log(response.data);

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        // date.textContent = `${)}`;//todo: wprowadzić razem z czasem lokalnym
        temp.textContent  = `${Math.round(response.data.main.temp)} ℃`;
        description.textContent = `${response.data.weather[0].description}`;
        feelsLike.textContent = `${Math.round( response.data.main.feels_like)} ℃`;
        windSpeed.textContent = `${response.data.wind.speed * 3.6} km/h`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        clouds.textContent = `${response.data.clouds.all} %`;
        // rain.textContent = `${response.data.}`;
        errorMsg.textContent = '';
    }).catch((error) => {
        console.log(error.response.data.cod);
        if (error.response.data.cod === '404'){
            errorMsg.textContent = 'Nie znaleziono miasta';
        }
        else if(error.response.data.message === 'Nothing to geocode'){
            errorMsg.textContent = 'Nazwa miasta nie może być pusta';
        }
        else {
            errorMsg.textContent = `${error}`;
        }

        [cityName, date, description, feelsLike, windSpeed, pressure, humidity, visibility, clouds].forEach((el) => {el.textContent = ''});
    }).finally(() => {
        input.value= '';
    })
}

function getWeatherByEnter (e){
    if (e.key === 'Enter'){
        getWeather();
    }
}

input.addEventListener('keypress', getWeatherByEnter);
