import {getJobApi} from './Api/api'
export function getApiAction ({commit}, payload) {
 getJobApi(payload).then((response)=>{
     commit('setJoblist',response.data )
     console.log(response)
 })
}
