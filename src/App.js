import React, { useState } from 'react';

const API = {
  key: '46a470b8b8e4a67d172d8042c9a7a273',
  base: 'http://api.openweathermap.org/data/2.5/'
};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});



  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${API.base}weather?q=${query}&units=metric&lang=fr&appid=${API.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  };
  const searchLocal = () => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        fetch(`${API.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=fr&appid=${API.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
          });
      },
      function (errorObj) {
        alert('Votre navigateur ne permet pas cette fonctionnalité essayez en un autre !');
      });
  };

  const dateBuilder = (d) => {
    let months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ];

    let days = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }




  return (
    <div className={
      (typeof weather.main != 'undefined')
        ? ((weather.main.temp > 16)
            ? 'app warm'
            : 'app'
        )
        : 'app'
    }>
      <main>
        <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        </div>
        {
          (typeof weather.main != 'undefined')
          ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</div>
              </div>
            </div>
          )
          : (
              <div>
                <div className="weather-box">
                  <div className="research">
                      Entrez le nom d'un pays/ville dans la barre de recherche!
                  </div>
                </div>
              </div>
            )
        }

        <a
          href="#"
          className="btn"
          onClick={searchLocal}
          >
          Cliquez moi pour le temps dans votre ville
         </a>

      </main>
    </div>
  );
}

export default App;
