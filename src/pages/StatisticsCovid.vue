<template>
  <q-card>
    <line-chart class="graph-component" :chart-data="chartData"></line-chart>
  </q-card>
</template>

<script>
import LineChart from "../components/Chart/LineChart";

export default {
  props: {
    statisticsobject: {
      type: Object,
      required: true
    }
  },
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null
    };
  },
  computed: {
    chartData() {
      return {
        labels: ["Total Death", "Total Recovered", " Total Unrecovered "],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#000", "#f00", "#666"],
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

<style>
.graph-component {
  max-width: 30em;
}
.small {
  max-width: 200px;
  margin: 150px auto;
}
</style>
