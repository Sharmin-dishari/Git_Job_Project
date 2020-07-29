<template>
      <q-page padding class="bg-purple-2">
           <q-select
            clearable
            rounded
            outlined
            class="bg-purple-2"
            style="width:350px"
            v-model="selectBox"
            :options="getAllCountry"
            label="Select Country"
          />
        <q-card @click="handleGraphPage(item)" class="q-mt-md page-container" padding v-for="(item, index) in filteredCovidList" :key="index">
          <q-item >
          <q-item-section>
          <q-item-label class="country text-body2">
          {{item.country}}-->{{item.day}}
          </q-item-label>
          </q-item-section>
          </q-item>
          <q-item class="row q-gutter-md">
            <q-card class="col box1" >
              <q-item-label><span class="itemsAll">Total Cases</br>{{ item.cases.total }}</span></q-item-label>
            </q-card>
          <q-card class="col box2">
              <q-item-label><span class="itemsAll">New Affected</br>{{ item.cases.new }}</span></q-item-label>
            </q-card>
           <q-card class="col box3">
              <q-item-label><span class="itemsAll">Critical Case</br>{{ item.cases.critical }}</span></q-item-label>
           </q-card>
           </q-item>
           <q-item class="row q-gutter-md">
              <q-card class="col box4" style="">
            <q-item-label><span class="itemsAll">Total Tests</br>{{ item.tests.total }}</span></q-item-label>
            </q-card>
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectBox: null,
    };
  },
  methods: {
    ...mapActions({ covidAction: "example/getCovidAction" }),
    handleGraphPage(value){
      console.log(value)
      this.$router.push({name:"graph", params: {statisticsobject:value} });
    },
  },
  created() {
    this.covidAction();
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
.box1,.box2,.box3,.box4,.box5,.box6 {
  display:flex;
  border-radius: 5px;
  text-align:center;
  padding: 20px;
  justify-content: center;
  align-self:center ;
}
.box1{
  background-color: #FBDA61;background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)
}
.box2{
   background: rgb(207,164,52);background: radial-gradient(circle, rgba(207,164,52,0.7455181901862307) 0%, rgba(232,189,14,0.9612044646960347) 100%);
}
.box3{
   background-color: #08AEEA;background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%); 
}
.box4{
  background-image: linear-gradient( 109.6deg,  rgba(177,173,219,1) 11.2%, rgba(245,226,226,1) 91.1% ); 
}
.box5{
  background: rgb(207,104,52);background: radial-gradient(circle, rgba(207,104,52,1) 0%, rgba(232,14,48,0.9612044646960347) 100%);  
}
.box6{
  background: rgb(169,207,52);background: radial-gradient(circle, rgba(169,207,52,1) 0%, rgba(57,221,106,0.9612044646960347) 100%);
}
.country{
  color:brown;
  font-weight: bold;
  font-size: 30px;background: -webkit-linear-gradient(#aaa, #fff); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.itemsAll{
  display: flex;
  align-items: center; 
}
.page-container{
  background-color: #21D4FD;background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
}
</style>
