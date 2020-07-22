<template>
  <q-page padding>
    <q-input @keyup.enter="handleSearch" class="q-mb-md" outlined  v-model="searchField" placeholder="Enter Job Title or Language" label="Description" clearable>
      <template v-slot:prepend>
          <q-icon name="work" />
        </template>
    </q-input>
    <q-input @keyup.enter="handleSearch" class="q-mb-md" outlined bottom-slots v-model="searchLocation" placeholder="Enter Prefered Job Location" label="Location" clearable>
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
      </q-input>
 
    <q-btn flat @click="handleSearch">Search</q-btn>
    <div v-if="getJoblist.length">
      <q-card
        class="q-my-md q-pa-sm"
        v-for="(item, index) in getJoblist"
        :key="index"
      >
        <!-- <q-item></q-item> -->
        <q-item-section @click="handleNextPage(item)">
          <q-item-label class="text-bold" style="color:red">{{
            item.title
          }}</q-item-label>
          <q-item-label>{{ item.company }}--------{{item.type}}</q-item-label>
          <q-item-label>{{ item.company_url }}</q-item-label>
          <q-item-label>{{ item.location }}</q-item-label>
          <!-- <q-item-label v-html="item.description"></q-item-label> -->
        </q-item-section>
        <q-item-section side top>
          <q-item-label>{{ getCalculatedDate(item.created_at) }}</q-item-label>
        </q-item-section>
      </q-card>
    </div>
    <div v-else>No Data Found</div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
export default {
  data() {
    return {
      searchLocation: "",
      searchField: ""
    };
  },
  computed: {
    //     getCalculatedDate(createdDate){
    //  return date.getDateDiff(createdDate, new Date())
    //     }
  },
  methods: {
    handleSearch() {
      this.getApiAction({
        description: this.searchField,
        location: this.searchLocation
      });
    },
    handleNextPage(value) {
      console.log(value);
      this.$router.push({
        name: "description",
        params: { description: value }
      });
    },
    getCalculatedDate(createdDate) {
      if (date.getDateDiff(new Date(), createdDate, "hours") > 24) {
        return date.getDateDiff(new Date(), createdDate, "days") + " days ago";
      }
      return date.getDateDiff(new Date(), createdDate, "hours") + " hours ago";
    },
    ...mapActions({ getApiAction: "example/getApiAction" })
  },
  created() {
    this.handleSearch()
  },
  computed: {
    ...mapGetters({ getJoblist: "example/getJoblist" })
  },
  name: "PageIndex"
};
</script>
