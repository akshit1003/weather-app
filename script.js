let weather = {
    apiKey: "f3340099d8069347ab80b33a2d333d3f",
    fetchCoordinates: function(city){
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q=" 
            + city +
            "&units=metric&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayCoordinates(data));
        },
        displayCoordinates: function (data) {
            const {lat}=data[0];
            const {lon}=data[0 ];
           // console.log(lat,lon);
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat="+ lat + 
            "&lon="+ lon +
            "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((mdata) => this.displayWeather(mdata));
        },
        displayWeather: function (mdata) {
            const { name } = mdata;
            const { icon, description} = mdata.weather[0];
            const { temp, humidity } = mdata.main;
            const { speed } = mdata.wind;
           // console.log( name,icon,description,temp,humidity,speed);
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/"+ icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = temp+ "°C";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%";
            document.querySelector(".wind").innerText= "Wind speed: " + speed + "km/h";
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
  },
  search: function () {
    this.fetchCoordinates(document.querySelector(".search-bar").value);
  },
};

document
   .querySelector(".search button").addEventListener("click", function() {
      weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchCoordinates("Delhi");

