<template>
  <div v-if="state.loading <= 0">
    <content-loader></content-loader>
  </div>
  <div id="carousel" class="carousel slide" data-ride="carousel" v-else>
    <div class="carousel-inner">
      <div
        class="carousel-item"
        v-for="(slider, id) in sliders"
        :class="{ active: id == 0 }"
        :key="slider.id"
      >
        <router-link :to="slider.link">
          <img
            :src="slider.image"
            class="d-block w-100 rounded-lg"
            style="min-height: 240px; max-height: 520px"
          />
        </router-link>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carousel"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carousel"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { ContentLoader } from "vue-content-loader";

export default {
  components: {
    ContentLoader,
  },

  setup() {
    const store = useStore();
    const state = reactive({
      loading: "",
    });
    onMounted(() => {
      store.dispatch("slider/getSliders");
    });

    const sliders = computed(() => {
      return store.getters["slider/getSliders"];
    });
    state.loading = sliders;
    console.log(state.loading);

    return {
      store,
      sliders,
      state,
    };
  },
  // data() {
  //   return {
  //     myData: null,
  //   };
  // },
  // mounted() {
  //   setTimeout(() => {
  //     this.myData = "Example Data";
  //   }, 5000);
  // },
};
</script>