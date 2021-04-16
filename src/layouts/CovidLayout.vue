<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-white" style="background-color: #473E97;">
      <div class="row">
        <div class="q-pa-md col">
          <q-btn flat v-if="showBackButton()" @click="handleBackPage()" round dense icon="keyboard_backspace" />
          <q-btn flat v-else @click="drawer = !drawer" round dense icon="menu" />
        </div>
        <div class="q-pa-md col">
          <q-icon style="float:right" name="notifications_none" size="30px" />
        </div>
      </div>
      <q-item>
          <q-toolbar-title style="font-size:22px">
           Statistics
          </q-toolbar-title>
        </q-toolbar>
      </q-item>
    </q-header>
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="600">
      <q-scroll-area
        style="height: calc(100% - 200px); margin-top: 180px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/tips">
            <q-item-section avatar>
              <q-icon name="medical_services" />
            </q-item-section>

            <q-item-section>
             Health Tips
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/report">
            <q-item-section avatar>
              <q-icon name="table_chart" />
            </q-item-section>

            <q-item-section>
              Report
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        style="height: 114px;background-color: #FF3CAC;background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 58%, #2B86C5 100%);"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="65px" class="q-mb-sm">
            <img src="~/assets/tumpa.jpg" />
          </q-avatar>
          <div class="text-weight-bold">Sharmin Akter</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: "CovidLayout",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    
  },
  methods: {
    handleBackPage(){
      console.log(this.$router)
      this.$router.back()
    },
  showBackButton(){
      return this.$router.history.current.name !== 'Covid'
    }
  },
};
</script>
