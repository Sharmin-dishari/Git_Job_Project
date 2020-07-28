<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-black" style="background-color: #FF3CAC;
background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 58%, #2B86C5 100%);

">
      <div class="row">
      <div class="q-pa-md col">
      <q-icon name="menu" size="30px"/>
      </div>
      <div class="q-pa-md col" >
      <q-icon style="float:right" name="notifications_none" size="30px"/>
      </div>
      </div>
      <q-toolbar class="q-mb-md">
        <q-avatar size="55px">
          <img src="~/assets/cov.jpg" />
        </q-avatar>
        <q-toolbar-title style="font-size:15px">
          Covid Report
        </q-toolbar-title>
        <q-select
          clearable
          rounded 
          outlined
          style="width:150px font-size:4px"
          class=""
          v-model="selectBox"
          :options="getAllCountry"
          label="Select Country"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding class="bg-purple-2">
        <q-card class="q-mt-md " style="background-color: #21D4FD;
background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
" padding v-for="(item, index) in filteredCovidList" :key="index">
          <q-item class=" ">
          <q-item-section class="">
          <q-item-label class="country text-h6 " style="font-size: 30px;
  background: -webkit-linear-gradient(#aaa, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;">{{item.country}}--->>{{item.day}}</q-item-label>
          </q-item-section>
          </q-item>
          <q-item class="row q-gutter-md">
            <q-card class="col box1" style="background-color: #FBDA61;
background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);

 ">
              <q-item-label class="" ><span class="itemsAll">Total Affected</br>{{ item.cases.total }}</span></q-item-label>
            </q-card>
            <q-card class="col box1" style=" background: rgb(207,164,52);
background: radial-gradient(circle, rgba(207,164,52,0.7455181901862307) 0%, rgba(232,189,14,0.9612044646960347) 100%);">
              <q-item-label class=""><span class="itemsAll">New Affected</br>{{ item.cases.new }}</span></q-item-label>
            </q-card>
           <q-card class="col box1" style="background-color: #08AEEA;
background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%);
">
              <q-item-label class=""><span class="itemsAll">Critical Case</br>{{ item.cases.critical }}</span></q-item-label>
           </q-card>
           </q-item>
           <q-item class="row q-gutter-md">
              <q-card class="col" style="background-image: linear-gradient( 109.6deg,  rgba(177,173,219,1) 11.2%, rgba(245,226,226,1) 91.1% ); ">
            <q-item-label class="box1 "><span class="itemsAll">Total Tests</br>{{ item.tests.total }}</span></q-item-label>
            </q-card>
            <q-card class="col" style="  background: rgb(207,104,52);
background: radial-gradient(circle, rgba(207,104,52,1) 0%, rgba(232,14,48,0.9612044646960347) 100%);  ">
            <q-item-label class="box1 "><span class="itemsAll">Total Deaths</br>{{ item.deaths.total }}</span></q-item-label>
            </q-card>
            <q-card class="col text-white" style=" background: rgb(169,207,52);
background: radial-gradient(circle, rgba(169,207,52,1) 0%, rgba(57,221,106,0.9612044646960347) 100%);">
            <q-item-label class="box1 "><span class="itemsAll">Total Recovered</br>{{ item.cases.recovered }}</span></q-item-label>
            </q-card>
          </q-item>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectBox: null
    };
  },
  methods: {
    ...mapActions({ covidAction: "example/getCovidAction" })
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
.box1 {
  display:flex;
  border-radius: 5px;
  text-align:center;
  padding: 20px;
  justify-content: center;
  align-self:center ;
}
.country{
  color:brown;
  font-weight: bold;
}
.itemsAll{
  display: flex;
  align-items: center; 
}
</style>
