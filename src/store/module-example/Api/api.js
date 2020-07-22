import axios from 'axios'
export const  getJobApi = (payload) => {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${payload.description}&location=${payload.location}`)
}
