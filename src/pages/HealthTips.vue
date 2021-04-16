<template>
  <div>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      :control-type="controlType"
      control-color="black"
      padding
      arrows
      class="text-black rounded-borders"
      style="min-height:100vh"
    >
      <q-carousel-slide name="style" class="column">
        <h5 class="q-mt-none text-center text-h5 text-bold">
          How It Spreads
        </h5>
        <p class="text-weight-medium text-body1 text-center">
          Covid-19, also referred to as "Coronavirus" mainly spreads from person
          to person between people who are in close contact with one
          another(within about 6 feet two meters). Through respiratory droplets
          produced production when an infected person coughs or sneezes.
        </p>
        <q-item-section class="flex-center">
          <q-avatar size="180px">
            <img src="~/assets/how spreads.png" />
          </q-avatar>
        </q-item-section>
      </q-carousel-slide>
      <q-carousel-slide name="swe" class="column">
        <h5 class="q-mt-none text-center text-h5 text-bold">
          Clean Your Hands
        </h5>
        <p class="text-weight-medium text-body1 text-center">
          <strong>Wash your hands</strong> often with soap and water for at least
          20 seconds especially after you have been in a public place, or after
          blowing your nose, coughing, or sneezing.
          </br>
          <strong>Avoid touching your eyes, nose, and mouth</strong> with unwashed hands.
        </p>
        <q-item-section class="flex-center">
          <q-avatar size="180px">
            <img src="~/assets/wahing hands.png" />
          </q-avatar>
        </q-item-section>
      </q-carousel-slide>
       <q-carousel-slide name="map" class="column">
        <h5 class="q-mt-none text-center text-h5 text-bold">
          Avoid Close Contact
        </h5>
        <p class="text-weight-medium text-body1 text-center">
          <strong>Avoid close contact</strong> with people who are sick.
          </br></br>
          <strong>Put distance between yourself and other people</strong> 
          if COVID-19 is spreading in your community. This is especially important for people who are at higher risk of getting very sick, including the elderly.
        </p>
        <q-item-section class="flex-center">
          <q-avatar size="180px">
            <img src="~/assets/spreads.jpg" />
          </q-avatar>
        </q-item-section>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-pa-xl">
      <q-btn color="white" text-color="black" label="Standard" />
    <q-btn color="white" text-color="black" label="Standard" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      controlType: "flat",
      controlTypeOptions: [
        { value: "regular", label: "regular" },
        { value: "unelevated", label: "unelevated" },
        { value: "flat", label: "flat (default)" },
        { value: "outline", label: "outline" },
        { value: "push", label: "push" }
      ],

      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
    };
  }
};
</script>
