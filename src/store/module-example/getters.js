export function getJoblist(state) {
  return state.jobList;
}
export function getCovidlist(state) {
  return [...state.covidList].sort((a, b) => {
    return a.cases.total < b.cases.total;
  });
}
