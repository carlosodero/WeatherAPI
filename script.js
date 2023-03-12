const search = document.getElementById('search');
const button = document.getElementById('button');
const cityTarget = document.getElementById('cityTarget');
const currentTemp = document.getElementById('currentTemp');
const videobackground = document.getElementById('videobackground');
const icon = document.getElementById('icon');
const forecastIconToday = document.getElementById('forecastIconToday');
const forecastIconTomorrow = document.getElementById('forecastIconTomorrow');
const forecastIconBeforeTomorrow = document.getElementById('forecastIconBeforeTomorrow');


// BTN SEARCH
button.onclick = () => {
  const target = search.value;
  getWeatherApi(target);
  cityTarget.innerHTML = target;
  console.log(target);
};


// GET weatherAPI DATA
const getWeatherApi = (target) => {
  const lookup = target;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '441519454fmsh8f5600a03007536p15b176jsn4ac26367b0a7',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lookup}&days=3&aqi=yes&lang=es`, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      sendWeatherApi(data);
    });
};



// SENDING DATA TO DOM
const sendWeatherApi = (apiData) => {
  const lastUpdate = apiData.current.last_updated;

  // mainWeather
  cityCountry.innerHTML = '/ ' + apiData.location.country;
  localTime.innerHTML = apiData.location.localtime;
  weatherDesc.innerHTML = apiData.current.condition.text;
  currentTemp.innerHTML = Math.round(apiData.current.temp_c) + 'º';
  feelsLike.innerHTML = 'Sensación térmica ' + Math.round(apiData.current.feelslike_c) + 'º';
  conditionDay.innerHTML = 'Previsión de ' + apiData.forecast.forecastday[0].day.condition.text + '.';
  maxTemp.innerHTML = '&nbsp;La temperatura máxima será de ' + Math.round(apiData.forecast.forecastday[0].day.maxtemp_c) + 'º';
  airQuality.innerHTML = Math.round(apiData.current.air_quality.o3);
  wind.innerHTML = apiData.current.wind_kph + ' km/h';
  humidity.innerHTML = Math.round(apiData.current.humidity) + '%';
  visibility.innerHTML = apiData.current.vis_km + ' Km';
  pressure.innerHTML = apiData.current.pressure_mb + ' mbar';
  uvIndex.innerHTML = apiData.current.uv;

  // FORECAST DOM
  // forecast Condition
  const forecastTodayCondition = apiData.forecast.forecastday[0].day.condition.text;
  forecastItemTodayCondition.innerHTML = forecastTodayCondition;
  forecastItemTodayRain.innerHTML = apiData.forecast.forecastday[0].day.daily_chance_of_rain + ' %';
  const forecastTomorrowCondition = apiData.forecast.forecastday[1].day.condition.text;
  const forecastAfterTomorrowCondition = apiData.forecast.forecastday[1].day.condition.text;
  // forecast min/max
  forecastTodayMaxTemp.innerHTML = Math.round(apiData.forecast.forecastday[0].day.maxtemp_c) + 'º';
  forecastTodayMinTemp.innerHTML = Math.round(apiData.forecast.forecastday[0].day.mintemp_c) + 'º';
  forecastTomorrowMaxTemp.innerHTML = Math.round(apiData.forecast.forecastday[1].day.maxtemp_c) + 'º';
  forecastTomorrowMinTemp.innerHTML = Math.round(apiData.forecast.forecastday[1].day.mintemp_c) + 'º';
  forecastAfterTomorrowMaxTemp.innerHTML = Math.round(apiData.forecast.forecastday[2].day.maxtemp_c) + 'º';
  forecastAfterTomorrowMinTemp.innerHTML = Math.round(apiData.forecast.forecastday[2].day.mintemp_c) + 'º';

  // slice to get only hour from localTime
  const searchTime = lastUpdate.slice(11,13);
  console.log('hora ' + searchTime);


  // WEATHERICONS & VIDEO BACKGROUND
  const currentWeatherType = apiData.current.condition.text;
  console.log('Current --' + currentWeatherType);

  const forecastTodayWeatherType = apiData.forecast.forecastday[0].day.condition.text;
  console.log('Hoy --' + forecastTodayWeatherType);

  const forecastTomorrowWeatherType = apiData.forecast.forecastday[1].day.condition.text;
  console.log('Mañana --' + forecastTomorrowWeatherType);

  const forecastBeforeTomorrowWeatherType = apiData.forecast.forecastday[2].day.condition.text;
  console.log('Pasado mañana --' + forecastBeforeTomorrowWeatherType);



  // currentWeather day or night
  if (searchTime === '08' || searchTime === '09' || searchTime >= 10 && searchTime < 19) {
    switch(currentWeatherType) {
      case 'Soleado':
      case 'Despejado':
        icon.src = 'img/SunnyDay.svg';
        videobackground.src = 'video/clear_day.mp4';
        break;
      case 'Neblina':
      case 'Parcialmente nublado':
      case 'Cielo cubierto':
        icon.src = 'img/PartlyCloudyDay.svg';
        videobackground.src = 'video/cloudy_day.mp4';
        break;
      case 'Lluvia moderada':
      case 'Ligeras lluvias':
      case 'Ligeras precipitaciones':
      case 'Llovizna a intervalos':
      case 'Lluvia  moderada a intervalos':
        icon.src = 'img/ModerateRain.svg';
        videobackground.src = 'video/rain.mp4';
        break;
      case 'Fuertes nevadas':
      case 'Nieve moderada':
      case 'Nevadas ligeras':
        icon.src = 'img/SnowShowersDay.svg';
        videobackground.src = 'video/snow.mp4';
        break;
    }
  }  else {
    switch(currentWeatherType) {
      case 'Soleado':
        icon.src = 'img/SunnyDay.svg';
        videobackground.src = 'video/clear_day.mp4';
        break;
      case 'Despejado':
        icon.src = 'img/ClearNight.svg';
        videobackground.src = 'video/clear_night.mp4';
        break;
      case 'Cielo cubierto':
      case 'Nublado':
      case 'Neblina':
      case 'Parcialmente nublado':
        icon.src = 'img/MostlyCloudyNight.svg';
        videobackground.src = 'video/cloudy_night.mp4';
        break;
      case 'Llovizna':
      case 'Llovizna a intervalos':
      case 'Lluvia  moderada a intervalos':
        icon.src = 'img/ModerateRain.svg';
        videobackground.src = 'video/rain.mp4';
        break;
      case 'Nieve moderada':
      case 'Nevadas ligeras':
        icon.src = 'img/SnowShowersDay.svg';
        videobackground.src = 'video/snow.mp4';
        break;
    }
  }
  // forecast today
  switch(forecastTodayWeatherType) {
    case 'Soleado':
    case 'Despejado':
      forecastIconToday.src = 'img/SunnyDay.svg';
      break;
    case 'Nublado':
    case 'Neblina':
    case 'Parcialmente nublado':
    case 'Cielo cubierto':
      forecastIconToday.src = 'img/PartlyCloudyDay.svg';
      break;
    case 'Ligeras lluvias':
    case 'Ligeras precipitaciones':
    case 'Fuertes lluvias':
    case 'Lluvia moderada':
    case 'Lluvia  moderada a intervalos':
      forecastIconToday.src = 'img/ModerateRain.svg';
      break;
    case 'Fuertes nevadas':
    case 'Nieve moderada':
    case 'Nevadas ligeras':
      forecastIconToday.src = 'img/SnowShowersDay.svg';
      break;
  }
  // forecast tomorrow
  switch(forecastTomorrowWeatherType) {
    case 'Soleado':
    case 'Despejado':
      forecastIconTomorrow.src = 'img/SunnyDay.svg';
      break;
    case 'Neblina':
    case 'Parcialmente nublado':
    case 'Cielo cubierto':
      forecastIconTomorrow.src = 'img/PartlyCloudyDay.svg';
      break;
    case 'Ligeras lluvias':
    case 'Ligeras precipitaciones':
    case 'Fuertes lluvias':
    case 'Lluvia moderada':
    case 'Lluvia  moderada a intervalos':
      forecastIconTomorrow.src = 'img/ModerateRain.svg';
      break;
    case 'Fuertes nevadas':
    case 'Nieve moderada':
    case 'Nevadas ligeras':
      forecastIconTomorrow.src = 'img/SnowShowersDay.svg';
      break;
  }
  // forecast beforeTomorrow
  switch(forecastBeforeTomorrowWeatherType) {
    case 'Soleado':
    case 'Despejado':
      forecastIconBeforeTomorrow.src = 'img/SunnyDay.svg';
      break;
    case 'Neblina':
    case 'Parcialmente nublado':
    case 'Cielo cubierto':
      forecastIconBeforeTomorrow.src = 'img/PartlyCloudyDay.svg';
      break;
    case 'Ligeras lluvias':
    case 'Ligeras precipitaciones':
    case 'Fuertes lluvias':
    case 'Lluvia moderada':
    case 'Lluvia  moderada a intervalos':
      forecastIconBeforeTomorrow.src = 'img/ModerateRain.svg';
      break;
    case 'Fuertes nevadas':
    case 'Nieve moderada':
    case 'Nevadas ligeras':
      forecastIconBeforeTomorrow.src = 'img/SnowShowersDay.svg';
      break;
  }
};
