let weather = {
    apikey: "a11dcf030233fb3ca5c226de10d6890f",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city +
            "&units=imperial&appid="
            + this.apikey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("Incorrect spelling or city doesn't exist");
                }
                return response.json();
                })
            .then(data => this.displayWeather(data))
    },

    displayWeather: function(data){
        const{name} = data;
        const{icon, description} = data.weather[0];
        const{temp, humidity} = data.main;
        const{speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp +"°F";
        document.querySelector(".description").innerText = description;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function(){

        var bar = document.querySelector(".search-bar").value;
        //console.log(bar);

        // This is where I check if there is a value in the search bar
        if(document.querySelector(".search-bar").value){
            this.fetchWeather(bar);
        }else{
            this.fetchWeather("Hargeisa");
        }
        
        //console.log(document.querySelector(".search-bar").value);
        document.querySelector(".search-bar").value='';
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
    });

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
        weather.search();
        }
    });

weather.fetchWeather("Denver");


// Help from Jonah Lawrence youtube tutorial for weather app