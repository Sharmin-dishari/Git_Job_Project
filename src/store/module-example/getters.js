export function getJoblist(state) {
  return state.jobList;
}
export function getCovidlist(state) {
  // console.log(cases.total);
  return [...state.covidList]
    .sort((a, b) => {
      return a.cases.total < b.cases.total ? 1 : -1;
    })
    .filter(item => item.country !== "All");
}
export function getCvHistory(state) {
  return [...state.coviHistory].reverse();
}
