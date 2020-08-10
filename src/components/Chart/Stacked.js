import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
      // scales: {
      //   yAxes: [
      //     {
      //       stacked: true,
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }
      //   ],
      //   xAxes: [
      //     {
      //       stacked: true,
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }
      //   ]
      // }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
