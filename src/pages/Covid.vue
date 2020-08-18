<template>
<div class="flex fixed-center" v-if="!getCovidList.length">
        <q-spinner-audio
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerAudio</q-tooltip>
      </div>
      <q-page v-else padding >
        <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Total" />
          <q-tab name="alarms" label="Today" />
          <q-tab name="movies" label="Yesterday" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Total</div>   
           <div style="text-align:center">
              <div class="text-h6">Corona Virus Cases</div>
              <div class="text-h5 text-weight-bolder text-blue-grey-4">{{ getCovidList[0].cases.total.toLocaleString() }}</div>
           </div></br></br>
              <div style="text-align:center" >
            <div class="text-h6">Total Deaths</div>
            <div class="text-h5 text-weight-bolder text-blue-grey-10">{{getCovidList[0].deaths.total.toLocaleString() }}</div>
            </div></br></br>
            <div style="text-align:center">
            <div class="text-h6">Total Recovered</div>
            <div class=" text-weight-bolder text-h5 text-green-9">{{ getCovidList[0].cases.recovered.toLocaleString()}}</div>
            </div> 
          
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Today</div>
            <q-select
            clearable
            rounded
            outlined
            v-model="selectBox"
            :options="getAllCountry"
            label="Select Country"
          />
          <q-item>
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
              <q-item-label><span class="itemsAll">Total Cases</br>{{ item.cases.total.toLocaleString() }}</span></q-item-label>
            </q-card>
          <q-card class="col box2">
              <q-item-label><span class="itemsAll">New Affected</br>{{ item.cases.new }}</span></q-item-label>
            </q-card>
           </q-item>
           <q-item class="row q-gutter-md">
           <q-card class="col box3">
              <q-item-label><span class="itemsAll">Active Cases</br>{{ item.cases.active.toLocaleString() }}</span></q-item-label>
           </q-card>
              <!-- <q-card class="col box4" style="">
            <q-item-label><span class="itemsAll">Total Tests</br>{{ item.tests.total }}</span></q-item-label>
            </q-card> -->
            <q-card class="col box5">
            <q-item-label><span class="itemsAll">New Deaths</br>{{ item.deaths.new}}</span></q-item-label>
        
            </q-card>
            <q-card class="col box6">
            <q-item-label><span class="itemsAll">Total Recovered</br>{{ item.cases.recovered.toLocaleString() }}</span></q-item-label>
            </q-card>
          </q-item>
            <q-item class="row justify-center">
              <q-btn  @click="handleGraphPage(item)" round color="primary" icon="bar_chart" />
            </q-item>
        </q-card>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Yesterday</div>
            <q-select
            
            @input="handleSearch"
            clearable
            rounded
            outlined
            v-model="selectBox1"
            :options="getAllCountry"
            label="Select Country"
          />
           <q-item>
          <q-item-section>
          <q-item-label class="country text-body2">
          <span>Last Updated: </span> {{handlePreviousDate[0] && updateDateFormat(handlePreviousDate[0].day)}}
          </q-item-label>
          </q-item-section>
          </q-item>

        <q-card class="q-mt-md " padding v-for="(item, index) in handlePreviousDate" :key="index">
            <q-card class="col box" >
              <q-item-label><span class="country-container  text-bold text-grey text-h5">{{ item.country }}</span></q-item-label>
            </q-card>
          <q-item class="row q-gutter-md">
            <q-card class="col box1" >
              <q-item-label><span class="itemsAll">Total Cases</br>{{ item.cases.total.toLocaleString() }}</span></q-item-label>
            </q-card>
          <q-card class="col box2">
              <q-item-label><span class="itemsAll">New Affected</br>{{ item.cases.new }}</span></q-item-label>
            </q-card>
           </q-item>
           <q-item class="row q-gutter-md">
           <q-card class="col box3">
              <q-item-label><span class="itemsAll">Active Cases</br>{{ item.cases.active.toLocaleString() }}</span></q-item-label>
           </q-card>
            <q-card class="col box5">
            <q-item-label><span class="itemsAll"> Death</br>{{ item.deaths.new}}</span></q-item-label>
        
            </q-card>
            <q-card class="col box6">
            <q-item-label><span class="itemsAll">Recovered</br>{{ item.cases.recovered.toLocaleString() }}</span></q-item-label>
            </q-card>
            
            
            </q-item>
             </q-card>
          </q-tab-panel>
        </q-tab-panels>
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
      selectBox1: null,
      loading: false,
       tab: 'mails'
    };
  },
  methods: {
    ...mapActions({ covidAction: "example/getCovidAction",getCovidHistory:"example/getCovidHistory" }),
    ...mapMutations({ setCovidList:"example/setCovidList" }),
    handleGraphPage(value){
      this.$router.push({name:"graph", params: {statisticsobject:value} });
    },
     handleSearch() {
      this.getCovidHistory({
        country: this.selectBox1,
        day: null
      });
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
    ...mapGetters({ getCovidList: "example/getCovidlist",covidHistory: "example/getCvHistory"}),
    getAllCountry() {
      return this.getCovidList
        .map(item => {
          return item.country;
        })
        .sort((a, b) => {
          return a > b ? 1 : -1;
        });
    }, 
//     function numberWithCommas(x) {
//     return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// }
  handlePreviousDate(){
    return this.covidHistory.filter(item => {
      if(item.day === new Date(Date.now() - 1 * 86400000 - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0])
          {
            return item.country;
          }
        })
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
.col{
  padding: 15px;
}
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
.report{
  display: flex;
  align-items: center;
  justify-content: center;
 
}
.report>div{
   font-size: 18px;
   color:#1b50b3af
}
.report>div:hover{
   font-size: 18px;
   font-weight: bold;
}
</style>
