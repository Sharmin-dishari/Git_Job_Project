<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-black bg-white">
      <q-toolbar>
        <q-avatar size="55px">
          <img src="~/assets/cov.jpg" />
        </q-avatar>
        <q-toolbar-title style="font-size:23px">
          CoVid-19
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding>
        <q-avatar style=" height:370px; width:100% ;float:center">
          <img src="~/assets/final.jpg" />
        </q-avatar>
        <div class="button">
          <q-btn
            @click="handleNextPage"
            class="q-pa-sm q-ma-md bg-blue-3"
            style="width:150px"
            outlined
            label="Let's Start"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  methods: {
    handleNextPage() {
      this.$router.push({ name: "Covid" });
    }
  }
};
</script>
<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
