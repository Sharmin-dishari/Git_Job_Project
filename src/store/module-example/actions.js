import { getJobApi } from "./Api/api";
export function getApiAction({ commit }, payload) {
  getJobApi(payload).then(response => {
    commit("setJoblist", response.data);
    console.log(response);
  });
}
export function getCovidAction({ commit }, payload) {
  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      commit("setCovidList", JSON.parse(this.responseText).response);
      return JSON.parse(this.responseText).response;
    }
  });
  xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
  xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "7ea1291b29msh15ab60d2739a237p1c1badjsn7c84a87d778d"
  );
  xhr.send(data);
  // console.log(getCovidApi());
}
export function getCovidHistory({ commit }, payload) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      commit("setCovidHistory", JSON.parse(this.responseText).response);
      return JSON.parse(this.responseText).response;
    }
  });

  xhr.open(
    "GET",
    `https://covid-193.p.rapidapi.com/history?country=${payload.country}`
  );
  xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "b84b0b809fmsh0f18684c293125ep14c865jsn9ddb336c40b6"
  );

  xhr.send(data);
}
