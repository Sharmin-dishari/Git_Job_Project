<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from "./Chart/LineChart.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null,
      options: { backgroundColor: "#fff" }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "Arman",
          "Sharmin",
          "Arman",
          "Arman",
          "Sharmin",
          "Arman",
          "Arman",
          "Sharmin",
          "Arman"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#fff",
            fill: false,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
