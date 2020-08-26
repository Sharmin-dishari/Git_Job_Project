<template>
  <div class="q-pa-md">
    <q-table
      v-if="getCovidList.length > 0"
      class="my-sticky-header-column-table"
      title="Top 10 Countries Reports"
      :data="tableData"
      :columns="tableColumns"
      row-key="name"
      :pagination.sync="pagination"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    };
  },
  methods: {
    ...mapActions({
      getCovidHistory: "example/getCovidHistory",
      covidAction: "example/getCovidAction"
    })
  },
  async created() {
    await this.covidAction();
  },
  computed: {
    ...mapGetters({
      getCovidList: "example/getCovidlist",
      covidHistory: "example/getCvHistory"
    }),
    tableColumns() {
      return [
        {
          name: "name",
          required: true,
          label: "Country",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "cases",
          align: "center",
          label: "Affected",
          field: "Cases",
          sortable: true
        },
        {
          name: "deaths",
          label: "Deaths",
          field: "Deaths",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "deaterate",
          label: "Death_Rate (%)",
          field: "DeathRate",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ];
    },
    tableData() {
      return this.getCovidList.map(item => {
        return {
          name: item.country,
          Cases: item.cases.total,
          Deaths: item.deaths.total,
          DeathRate: `${Number(
            (item.deaths.total * 100) / item.cases.total
          ).toFixed(3)} %`
        };
      });
    }
  }
};
</script>
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 100%

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 800px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
