<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div
        v-for="category in categories"
        :key="category.id"
        class="col-md-2 col-6 mb-3"
        style="padding: 0 5px"
      >
        <router-link
          :to="{ name: 'detail_category', params: { slug: category.slug } }"
        >
          <div class="card border-0 rounded shadow">
            <div class="card-body text-center">
              <img :src="category.image" style="width: 100px" />
              <hr />
              <label class="font-weight-bold">{{ category.name }}</label>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("category/getCategoriesAll");
    });

    const categories = computed(() => {
      return store.getters["category/getCategoriesAll"];
    });

    return {
      store,
      categories,
    };
  },
};
</script>