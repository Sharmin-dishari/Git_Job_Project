import { Stacked, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Stacked,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};