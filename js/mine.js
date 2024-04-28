




let date = new Date(),
myData,
currentCity = "Cairo",
todayDate=document.getElementById("date"),
day=document.getElementById("day"),
cityLocation=document.getElementById("location"),
todayDegree=document.getElementById("numdegree"),
todayIcon=document.getElementById("today-icon"),
description=document.getElementById("today-description"),
humidty=document.getElementById("humidty"),
wind=document.getElementById("wind"),
compass=document.getElementById("compass"),
weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];

let nextDay = document.getElementsByClassName("nextDay"),
    afterNextDay = document.getElementsByClassName("afterNextDay"),
    nextDate = document.getElementsByClassName("nextDate"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description");



async function  getData(){
  let respo=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8655321e43ff401bbd822644210905&q=${currentCity}&days=3`);
  myData=await respo.json();

  console.log(myData);
  displayTodayWeather();
  displayNextDaysWeather();
}

function displayTodayWeather() {

  let dateApi =myData.forecast.forecastday[0].date;
  let date_components = dateApi.split("-");
  let current_day = date_components[2];

  day.innerHTML = weekDays[date.getDay()];
  todayDate.innerText = `${current_day} ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = myData.location.name;
  todayDegree.innerHTML = myData.current.temp_c;
  todayIcon.setAttribute("src", `https:${myData.current.condition.icon}`);
  description.innerHTML = myData.current.condition.text;
  humidty.innerHTML = myData.current.humidity;
  wind.innerHTML = myData.current.wind_kph;
  compass.innerText =myData.current.wind_dir
}
getData();
function getNextDays(nextDateApi) {

  let d = new Date(nextDateApi);
  return d && weekDays[d.getDay()];
};
function getNextDayMonth(nextDateApi) {

  let m = new Date(nextDateApi);
  return m && monthName[m.getMonth()];
};
function displayNextDaysWeather() {
  for(let i = 0;  i < nextDay.length; i++)
  {   
      let nextDateApi = myData.forecast.forecastday[i+1].date;
      let nextDate_components = nextDateApi.split("-");
      let next_day = nextDate_components[2];

      nextDay[i].innerHTML = getNextDays(nextDateApi);
      nextDate[i].innerHTML = `${next_day} ${getNextDayMonth(nextDateApi)}`;
      nextDayIcon[i].setAttribute("src", `https:${myData.forecast.forecastday[i+1].day.condition.icon}`);
      maxDegree[i].innerHTML =myData.forecast.forecastday[i+1].day.maxtemp_c;
      minDegree[i].innerHTML = myData.forecast.forecastday[i+1].day.mintemp_c;
      nextDayDescription[i].innerHTML= myData.forecast.forecastday[i+1].day.condition.text;
      
  }
};
let searchBar=document.getElementById("search-bar");
searchBar.addEventListener("keyup", function() {
  currentCity = searchBar.value;
  getData();
});

//Onload Calling Function:
getData();
