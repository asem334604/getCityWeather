function dispCurrWeather(obj) {
    function showCurrTime(timestamp) {
        return new Date(timestamp).toLocaleTimeString();
    }

    $('#content').append(`
        <div class="card m-4 p-4 rounded-3">
            <h1>${obj.name}</h1>
            <p>
                <small>Weather now: </small>
                <span class="big_txt">${obj.weather[0].description}</span>
            </p>
            <p>
                <small>Country: </small>
                <span class="big_txt">${obj.sys.country}</span>
                <small>Sunrise: </small>
                <span class="big_txt">${showCurrTime(obj.sys.sunrise)}</span>
                <small>Sunset: </small>
                <span class="big_txt">${showCurrTime(obj.sys.sunset)}</span>
            </p>
            <h2><small>Temperature: </small>${Math.round(obj.main.temp)} &#8451;</h2>
            <p>
                <small>Feels like:</small>
                <span class="big_txt">${Math.round(obj.main.feels_like)} &#8451;</span>
                <small>Min: </small>
                <span class="big_txt">${Math.round(obj.main.temp_min)} &#8451;</span>
                <small>Max: </small>
                <span class="big_txt">${Math.round(obj.main.temp_max)} &#8451;</span>
            </p>
            <p>
                <small>Humidity: </small>
                <span class="big_txt">${obj.main.humidity}g/m<sup>3</sup></span>
                <small>Pressure: </small>
                <span class="big_txt">${obj.main.pressure} hPa</span>
            </p>
            <p>
                <small>Wind speed: </small>
                <span class="big_txt">${obj.wind.speed} m/s</span>
            </p>
        </div>
    `)
}

function dispErr(err) {
    $('#content').append(`
        <div class="card m-4 p-4 rounded-3">
            <p>
                <span class="big_txt">Sorry, ${err.responseJSON.message}</span>
            </p>
        </div>        
    `)
}

$('document').ready(function () {
    $('#jq').on('click', function () {
        let cityVal = $('#city_input').val();
        $.ajax(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=71fdef9bdd87cc41615717c692885330&units=metric`,
            {
                method: 'GET',
                success: (currWeather) => {
                    dispCurrWeather(currWeather);
                },
                error: (err) => {
                    dispErr(err);
                }
            }).done($('#city_input').val(''));
    })

})