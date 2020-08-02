<template>
<div class="flex fixed-center" v-if="!getCovidList.length">
        <q-spinner-audio
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerAudio</q-tooltip>
      </div>
      <q-page v-else padding >
           <q-select
            clearable
            rounded
            outlined
            v-model="selectBox"
            :options="getAllCountry"
            label="Select Country"
          />
          <q-item >
          <q-item-section>
          <q-item-label class="country text-body2">
          <span>Last Updated: </span> {{getCovidList[0] && updateDateFormat(getCovidList[0].day)}}
          </q-item-label>
          </q-item-section>
          </q-item>
        <q-card @click="handleGraphPage(item)" class="q-mt-md " padding v-for="(item, index) in filteredCovidList" :key="index">
              <q-tooltip anchor="top middle" self="top middle" :offset="[10, 10]">
          <strong>Want to see</strong><em>Graph</em>
          (<q-icon name="keyboard_arrow_down"/>)
        </q-tooltip>
            <q-card class="col box" >
              <q-item-label><span class="country-container  text-bold text-grey text-h5">{{ item.country }}</span></q-item-label>
            </q-card>
          <q-item class="row q-gutter-md">
            <q-card class="col box1" >
              <q-item-label><span class="itemsAll" color="teal">Total Cases</br>{{ item.cases.total }}</span></q-item-label>
            </q-card>
          <q-card class="col box2">
              <q-item-label><span class="itemsAll">New Affected</br>{{ item.cases.new }}</span></q-item-label>
            </q-card>
           </q-item>
           <q-item class="row q-gutter-md">
           <q-card class="col box3">
              <q-item-label><span class="itemsAll">Critical Case</br>{{ item.cases.critical }}</span></q-item-label>
           </q-card>
              <!-- <q-card class="col box4" style="">
            <q-item-label><span class="itemsAll">Total Tests</br>{{ item.tests.total }}</span></q-item-label>
            </q-card> -->
            <q-card class="col box5">
            <q-item-label><span class="itemsAll">Total Deaths</br>{{ item.deaths.total }}</span></q-item-label>
        
            </q-card>
            <q-card class="col box6">
            <q-item-label><span class="itemsAll">Total Recovered</br>{{ item.cases.recovered }}</span></q-item-label>
            </q-card>
          </q-item>
        </q-card>
      </q-page>
</template>
<script>
import { mapActions, mapGetters,mapMutations } from "vuex";
import {date} from "quasar" 
export default {
  data() {
    return {
      selectBox: null,
      loading: false
    };
  },
  methods: {
    ...mapActions({ covidAction: "example/getCovidAction" }),
    ...mapMutations({ setCovidList:"example/setCovidList" }),
    handleGraphPage(value){
      console.log(value)
      this.$router.push({name:"graph", params: {statisticsobject:value} });
    },
    updateDateFormat(day){
       return date.formatDate(day,'dddd D MMMM')
    },
  },
   async created() {
    await this.covidAction(); 
  },
  destroyed() {
    this.setCovidList([])
  },
  computed: {
    ...mapGetters({ getCovidList: "example/getCovidlist" }),
    getAllCountry() {
      return this.getCovidList
        .map(item => {
          return item.country;
        })
        .sort((a, b) => {
          return a > b ? 1 : -1;
        });
    },
    
    filteredCovidList() {
      return this.getCovidList.filter(item => {
        if (this.selectBox === null) {
          return true;
        }
        return item.country === this.selectBox;
      });
    }
  }
};
</script>
<style scoped>
.box,.box1,.box2,.box3,.box4,.box5,.box6 {
  display:flex;
  border-radius: 5px;
  text-align:center;
  padding: 20px;
  justify-content: center;
  align-self:center ;
}
.box1{
  background-color: #FFB259;
}
.box2{
  background-color: #9059FF;
}
.box3{
  background-color: #ff5999;
}
.box4{
 background-color: #4CD97B;
}
.box5{
  background-color:#FF5959;
}
.box6{
background-color: #4BB5FF;
}
.country{
color:grey;
}

.itemsAll{
  display: flex;
  align-items: center; 
  color:white;
}
</style>
