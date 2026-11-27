import {apiKey} from './key.js'
async function getWeatherData(cityName) {const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
  
    try {
        const response = await fetch(url);

        if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`)
        };
      const data = await response.json();
      document.getElementById('city').textContent = `City: ${data.location.name},${data.location.country}`;
      document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
      document.getElementById('condition').textContent = `Condition: ${data.current.condition.text}`;
     document.getElementById('time').textContent =`Time:${data.location.localtime}`;
      const iconUrl = 'https:' + data.current.condition.icon;
      document.getElementById('visualData').src = iconUrl;

    } catch (error) {
        document.getElementById('visualData').src = 'error.jpg';
    }
}

const requested = document.getElementById('request');
requested.addEventListener('click',function(){const input = document.getElementById('typed_city').value;
  getWeatherData(input);
})

