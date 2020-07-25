<template>
  <q-page padding>
    <div class="q-pa-none">
      <q-item class="row q-px-none q-py-none ">
        <q-item-section class="col">
          <q-input
            @keyup.enter="handleSearch"
            dense
            outlined
            v-model="searchField"
            placeholder="Enter Job Title or Language"
            label="Description"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="work" />
            </template>
          </q-input>
        </q-item-section>
        <q-item-section class="col">
          <q-input
            @keyup.enter="handleSearch"
            dense
            outlined
            v-model="searchLocation"
            placeholder="Enter Prefered Job Location"
            label="Location"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-input>
        </q-item-section>
        <q-item-section class="col-2">
          <q-btn
            style="width:100%"
            outlined
            @click="handleSearch"
            label="Search"
          />
        </q-item-section>
      </q-item>
    </div>
    <!-- <q-input @keyup.enter="handleSearch" class="q-mb-md" outlined  v-model="searchField" placeholder="Enter Job Title or Language" label="Description" clearable>
      <template v-slot:prepend>
          <q-icon name="work" />
        </template>
    </q-input>
    <q-input @keyup.enter="handleSearch" class="q-mb-md" outlined bottom-slots v-model="searchLocation" placeholder="Enter Prefered Job Location" label="Location" clearable>
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
      </q-input> -->

    <div v-if="getJoblist.length">
      <q-card
        class="q-my-md q-pa-sm click"
        v-for="(item, index) in sortDate"
        :key="index"
      >
        <q-item>
          <q-item-section>
            <q-item-label
              @click="handleNextPage(item)"
              class="text-primary text-h6"
              >{{ item.title }}</q-item-label
            >
            <q-item-label class="text-body2">
              <q-icon name="perm_contact_calendar"></q-icon>
              &nbsp;&nbsp;<span class="text-grey">Company:&nbsp;&nbsp;</span
              ><a
                target="_blank"
                class="text-primary"
                style="text-decoration:none"
                :href="item.company_url"
                >{{ item.company }}</a
              >
              <span class="text-green text-bold"
                >&nbsp;&nbsp;&nbsp;&nbsp; {{ item.type }}
              </span></q-item-label
            >
            <!-- <q-item-label v-html="item.description"></q-item-label> -->
          </q-item-section>
          <q-item-section side top>
            <q-item-label class="text-body1">{{ item.location }}</q-item-label>
            <q-item-label>{{
              getCalculatedDate(item.created_at)
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="no-tasks absolute-center" v-else>
      <q-icon
      name="check"
      size="100px"
      color="primary"
      />
      <div class="text-h5 text-primary text-center">No Matched</div>
      </div> 
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
      if (date.getDateDiff(new Date(), createdDate, "days") > 365) {
        return (
          date.getDateDiff(new Date(), createdDate, "years") + " years ago"
        );
      } else if (date.getDateDiff(new Date(), createdDate, "hours") > 24) {
        return date.getDateDiff(new Date(), createdDate, "days") + " days ago";
      }
      return date.getDateDiff(new Date(), createdDate, "hours") + " hours ago";
    },
    ...mapActions({ getApiAction: "example/getApiAction" })
  },
  created() {
    this.handleSearch();
  },
  computed: {
    ...mapGetters({ getJoblist: "example/getJoblist" }),
    sortDate(){
  return this.getJoblist.slice().sort((a, b)=>{
    return (new Date(a.created_at) < new Date(b.created_at)) ? 1 : -1;
  });
}
  },
  name: "PageIndex"
};
</script>
<style scoped>
.click {
  cursor: pointer;
}
</style>
