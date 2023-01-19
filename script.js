document.querySelector(".busca").addEventListener("submit", async (event) => {
    event.preventDefault(); // Previne o comportamento padrao do formulario

    let input = document.getElementById("searchInput").value;
    
    if(input !== "") {
        clearInfo();
        showWarning("Carregando...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=37b960ff665c98e5843c477c2371b4d4&units=metric&lang=pt_br`; // API do OpenWeather para consulta

        let results = await fetch(url); // 'await' => Espera a conclusão de uma tarefa, é necessário uma função assíncrona('async') para usa-lo
        let json = await results.json(); // Converte a 'Promise' resultante do fetch em um json

        if(json.cod === 200) { // 200 = sucesso
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempSense: json.main.feels_like,
                tempWeatherDescription: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning("Localização não encontrada");
        }
    } else {
        clearInfo();
    }
});

// Função responsável por limpar a tela
function clearInfo() {
    showWarning("");
    document.querySelector(".resultado").style.display = "none";
}

// Função responsável por preencher as informações
function showInfo(json) {
    showWarning("");

    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country} <img src="https://openweathermap.org/images/flags/${json.country.toLowerCase()}.png" alt=""/>`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".tempSense").innerHTML = `${json.tempSense} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector(".tempWeatherInfo").innerHTML = `${json.tempWeatherDescription}`;
    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector(".resultado").style.display = "block";
}

// Função responsável por alterar a mensagem de aviso
function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}