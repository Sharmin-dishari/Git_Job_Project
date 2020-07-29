<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="text-black`"
      style="background-color: #FF3CAC;background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 58%, #2B86C5 100%);"
    >
      <div class="row">
        <div class="q-pa-md col">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </div>
        <div class="q-pa-md col">
          <q-icon style="float:right" name="notifications_none" size="30px" />
        </div>
      </div>
      <q-item>
        <q-toolbar class="q-mb-md">
          <q-avatar size="55px">
            <img src="~/assets/cov.jpg" />
          </q-avatar>
          <q-toolbar-title style="font-size:18px">
            Covid Report
          </q-toolbar-title>
        </q-toolbar>
      </q-item>
    </q-header>
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="600">
      <q-scroll-area
        style="height: calc(100% - 200px); margin-top: 180px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Star
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
        style="height: 150px;background-color: #FF3CAC;background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 58%, #2B86C5 100%);"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
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
  }
};
</script>
