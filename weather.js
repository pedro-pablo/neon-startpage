const OPENWEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?id=${OPENWEATHER_CITY_ID}&appid=${OPENWEATHER_API_KEY}&units=metric`;

const WEATHER_WRAPPER_ELEMENT = document.getElementById('weather');
const WEATHER_TEMP_ELEMENT = document.getElementById('weather-temp');
const WEATHER_TEMP_MARKER_ELEMENT = document.getElementById('weather-temp-marker');
const WEATHER_CONDITION_WRAPPER_ELEMENT = document.getElementById('weather-condition-wrapper');

function updateWeatherDisplay(weatherData) {
    try {
        WEATHER_TEMP_ELEMENT.innerHTML = weatherData.main.temp + '°C';
        WEATHER_TEMP_MARKER_ELEMENT.style.left = (weatherData.main.temp / 0.5) + '%';
        const childrenCount = WEATHER_CONDITION_WRAPPER_ELEMENT.childElementCount;
        for (let index = 0; index < childrenCount; index++) {
            const element = WEATHER_CONDITION_WRAPPER_ELEMENT.children.item(index);
            WEATHER_CONDITION_WRAPPER_ELEMENT.removeChild(element);
        }
        weatherData.weather.forEach(weatherItem => {
            const wrapper = document.createElement('div');
            wrapper.className = 'weather-item-wrapper';
            const icon = document.createElement('img');
            icon.className = 'weather-icon';
            icon.src = getWeatherIcon(weatherItem.icon);
            const title = document.createElement('h4');
            title.innerText = weatherItem.description;
            wrapper.appendChild(icon);
            wrapper.appendChild(title);
            WEATHER_CONDITION_WRAPPER_ELEMENT.appendChild(wrapper);
        });
    } catch (e) {
        console.error('Invalid weather API object: ' + e);
    }
}

function getWeatherIcon(icon) {
    switch (icon) {
        case '01d':
            return 'img/clear_sky_d.gif';
        case '01n':
            return 'img/clear_sky_n.gif';
        case '02d':
            return 'img/few_clouds_d.gif';
        case '02n':
            return 'img/few_clouds_n.gif';
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return 'img/clouds.gif';
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return 'img/rain.gif';
        case '11d':
        case '11n':
            return 'img/thunder.gif';
        //TODO: snow
        case '50d':
            return 'img/smoke_d.gif';
        case '50n':
            return 'img/smoke_n.gif';
        default:
            return undefined;
    }
}

function updateWeather() {
    if (WEATHER_UPDATE_DELAY_MS < 60000) {
        console.warn('Weather API update delay is too short (<1 min). Your API key might be blocked.');
    }

    if (OPENWEATHER_API_KEY && OPENWEATHER_CITY_ID) {
        updateApi('WEATHER', OPENWEATHER_URL, 'weather', WEATHER_UPDATE_DELAY_MS, updateWeatherDisplay);
    } else {
        console.warn('OpenWeather API key or city ID not set. Weather information is unavailable.');
        WEATHER_WRAPPER_ELEMENT.style.visibility = 'hidden';
    }
}