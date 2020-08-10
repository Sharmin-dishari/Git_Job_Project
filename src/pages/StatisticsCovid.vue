<template>
   <div style="background-color: #473E97;">
      <q-item-section>
        <!-- <q-btn-toggle
         no-caps
        rounded
        class="my-custom-toggle text-white"
      spread
      v-model="location"
      toggle-color="white"
      toggle-text-color="black"
      :options="[
        {label: 'My Country', value: 'one'},
        {label: 'Global', value: 'two'},
      ]"
    /> -->
    </q-item-section>
   
            <q-item class="box q-pa-md  text-bold text-white text-h5">
              <q-item-label><span class="itemsAll">{{ statisticsobject.country }}</span></q-item-label>
            </q-item>
          <q-item class="row q-gutter-md">
            <q-card class="col card1" >
              <q-item-label><span class="itemsAll">Total Cases</br>{{statisticsobject.cases.total }}</span></q-item-label>
            </q-card>
          <q-card class="col card2 bg-#FFB259" >
              <q-item-label><span class="itemsAll">New Affected</br>{{ statisticsobject.cases.new}}</span></q-item-label>
            </q-card>
           </q-item>
           <q-item class="row q-gutter-md  q-mb-xl">
           <q-card class="col card3">
            <q-item-label><span class="itemsAll">Active Cases</br>{{ statisticsobject.cases.active  }}</span></q-item-label>
            </q-card>
            <q-card class="col card4">
            <q-item-label><span class="itemsAll">Total Deaths</br>{{ statisticsobject.deaths.total }}</span></q-item-label>
            </q-card>
            <q-card class="col card5">
            <q-item-label><span class="itemsAll">Total Recovered</br>{{ statisticsobject.cases.recovered }}</span></q-item-label>
            </q-card>
            </q-item>
           <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey graph-component"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Pie Chart" />
          <q-tab name="alarms" label="Bar Chart" />
          <q-tab name="movies" label="Line Chart" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel  name="mails">
      <line-chart :chart-data="chartData"></line-chart>   
          </q-tab-panel>

          <q-tab-panel name="alarms">
      <div class="flex items-center justify-center" v-if="!covidHistory.length">
        <q-spinner-audio
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerAudio</q-tooltip>
      </div>
      <lineC v-else :chart-data="lineChartDataTest"/>
          </q-tab-panel>

          <q-tab-panel   name="movies" >
            <div class="flex items-center justify-center" v-if="!covidHistory.length">
              <q-spinner-audio
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerAudio</q-tooltip>
            </div>
          <stacked v-else :chart-data="stackedChartDataTest"/>  
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    
    <q-item>
    </q-item>
</div>

</template>
<script>
import LineChart from "../components/Chart/LineChart";
import LineC from "../components/Chart/Line"
import Stacked from "../components/Chart/Stacked"
import { mapActions,mapGetters,mapMutations } from "vuex";
export default {
  props: {
    statisticsobject: {
      type: Object,
      required: true
    }
  },
  components: {
    LineChart,
    LineC,
    Stacked
  },
  data() {
    return {
      location: null,
      tab: 'mails'
    };
  },
  methods: {
    ...mapActions({getCovidHistory:"example/getCovidHistory"}),
    ...mapMutations({setCovidHistory: "example/setCovidHistory"})
  },
  destroyed() {
    this.setCovidHistory([])
  },
  created() {
    this.getCovidHistory(
      {
        country :this.statisticsobject.country ,
        day : null
      }
    )
  },
  computed: {
    ...mapGetters({covidHistory: "example/getCvHistory"}),
   
    stackedChartDataSet1(){
      return this.covidHistory.map((value)=>{
        return Number(value.deaths.total)
      })
    },
    stackedChartDataSet2(){
      return this.covidHistory.map((value)=>{
        return Number(value.cases.recovered)
      })
    },
    stackedChartDataSet3(){
      return this.covidHistory.map((value)=>{
        return Number(value.cases.total)
      })
    },
    lineChartData(){
    return this.covidHistory.map((value)=>{
      return value.time.slice(0,10)
    })
    },
    lineChartDataSet(){
      return this.covidHistory.map((value)=>{
        return Number(value.cases.new)
      })
    },
    lineChartDataTest(){
      return{
        labels: this.lineChartData,
        datasets: [
          {
            label: "Affected",
            backgroundColor:"#FF5959",
            fill: false,
           data: this.lineChartDataSet
          }
        ]
      }
    },
     stackedChartDataTest(){
      return{
        labels: this.lineChartData,
        datasets: [
          {
            label: "Death",
            backgroundColor:"#FF5959",
            fill: false,
           data: 
             this.stackedChartDataSet1
           
          },
          {
            label: "Recovered",
            backgroundColor:"#4CD97B",
            fill: false,
           data: 
             this.stackedChartDataSet2
           
          },
           {
            label: "Active cases",
            backgroundColor:"#9059FF",
            fill: false,
           data: 
             this.stackedChartDataSet3
           
          },
        

        ]
      }
    },
    chartData() {
      return {
        labels: ["Total Death", "Total Recovered", " Total Unrecovered "],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#FF5959", "#4BB5FF", "#9059FF"],
            fill: false,
            data: [
              this.statisticsobject.deaths.total,
              this.statisticsobject.cases.recovered,
              this.statisticsobject.cases.total -
                (this.statisticsobject.deaths.total +
                  this.statisticsobject.cases.recovered)
            ]
          },
        ]
      };
    }
  }
};
</script>

<style >
.graph-component {
  max-width: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  float: center; 
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background: white;
  
  
}

.small {
  max-width: 200px;
  margin: 150px auto;
}
.button,.box,.card1,.card2,.card3,.card4,.card5 {
  display:flex;
  border-radius: 5px;
  text-align:center;
  padding: 20px;
  justify-content: center;
  align-self:center ;
}

.card1{
  background-color: #FFB259;
}
.card2{
  background-color: #9059FF;
}
.card3{
 background-color:#4CD97B;
}
.card4{
  background-color: #FF5959;
}
.card5{
  background-color: #4BB5FF;
}
.itemsAll{
  display: flex;
  align-items: center; 
 color:cornsilk;
}

</style>
