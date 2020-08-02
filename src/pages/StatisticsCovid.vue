<template>
   <div style="background-color: #473E97;">
      <div>
        <q-btn-toggle
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
    />
    </div>
    
    <q-item class="report q-gutter-xl">
      <div>Total</div>
      <div>Today</div>
      <div>Yesterday</div>
    </q-item>
   
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
            <q-item-label><span class="itemsAll">Total Tests</br>{{ statisticsobject.tests.total  }}</span></q-item-label>
            </q-card>
            <q-card class="col card4">
            <q-item-label><span class="itemsAll">Total Deaths</br>{{ statisticsobject.deaths.total }}</span></q-item-label>
            </q-card>
            <q-card class="col card5">
            <q-item-label><span class="itemsAll">Total Recovered</br>{{ statisticsobject.cases.recovered }}</span></q-item-label>
            </q-card>
            </q-item>
            <q-item class="graph-component">
      <line-chart :chart-data="chartData"></line-chart>
      
    </q-item>
    <q-item class="graph-component">
      <div class="flex items-center justify-center" v-if="!covidHistory.length">
        <q-spinner-audio
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerAudio</q-tooltip>
      </div>
      <lineC v-else :chart-data="lineChartDataTest"/>
    </q-item>
    <q-item>
    </q-item>
</div>

</template>
<script>
import LineChart from "../components/Chart/LineChart";
import LineC from "../components/Chart/Line"
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
    LineC
  },
  data() {
    return {
      location: null
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
            fill: true,
           data: this.lineChartDataSet
          }
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
          }
        ]
      };
    }
  }
};
</script>

<style >
.graph-component {
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  float: center; 
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background: white;
  
  
}
.report{
  display: flex;
  align-items: center;
  justify-content: center;
 
}
.report>div{
   font-size: 18px;
   color:#d6ecff
}
.report>div:hover{
   font-size: 18px;
   font-weight: bold;
}
.my-custom-toggle{
   border: 1px solid #d6ecff
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
