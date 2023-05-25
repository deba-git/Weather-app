

const API_KEY = 'b61c7d0dcac9c6d416c4efd50a6049d2';
const makeIconUrl = (iconId)  => `http://openweathermap.org/img/wn/${iconId}@2x.png` 

const getWeatherData = async(city,units = 'metric') => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

    // console.log(data);
    // Object Destructuring

const 
{ weather, main:{temp, feels_like, temp_min, temp_max, pressure, humidity}, wind :{speed},sys:{country},name,} = data;

const {description, icon} = weather[0];

return{
    description,
    iconUrl: makeIconUrl(icon),
    temp,
    temp_max,temp_min,
    feels_like,
    pressure,humidity,speed,
    country,name
}

}

export {getWeatherData};