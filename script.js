import { apiKey } from './key.js';

const cityInput = document.getElementById('typed_city');
const requestButton = document.getElementById('request');
const conditionOutput = document.getElementById('condition');

async function getWeatherData(cityName) {
  const city = cityName.trim();

  if (!city) {
    conditionOutput.textContent = 'Condition: Enter a city name.';
    cityInput.focus();
    return;
  }

  const url = new URL('https://api.weatherapi.com/v1/current.json');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', city);

  requestButton.disabled = true;
  requestButton.textContent = 'Loading…';
  conditionOutput.textContent = 'Condition: Loading weather…';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `Weather request failed (HTTP ${response.status}).`);
    }

    document.getElementById('city').textContent =
      `City: ${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent =
      `Temperature: ${data.current.temp_c}°C`;
    conditionOutput.textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById('time').textContent =
      `Local time: ${data.location.localtime}`;
    document.getElementById('visualData').src =
      `https:${data.current.condition.icon}`;
  } catch (error) {
    console.error('Weather request failed:', error);
    conditionOutput.textContent =
      `Condition: Could not load weather. ${error.message}`;
  } finally {
    requestButton.disabled = false;
    requestButton.textContent = 'Get weather';
  }
}

requestButton.addEventListener('click', () => {
  getWeatherData(cityInput.value);
});

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getWeatherData(cityInput.value);
  }
});
