<template>
  <div class="card border-0 rounded shadow">
    <div class="card-body">
      <h5 class="font-weight-bold">
        <i class="fa fa-shopping-bag"></i> KATEGORI
        <hr />
        <div v-if="categories <= 0">
          <ul class="list-group-item mb-3" height="100">
            <bullet-list-loader />
          </ul>
          <ul class="list-group-item mb-3">
            <bullet-list-loader />
          </ul>
          <ul class="list-group-item mb-3">
            <bullet-list-loader />
          </ul>
        </div>
        <ul class="list-group">
          <router-link
            :to="{ name: 'detail_category', params: { slug: category.slug } }"
            v-for="category of categories"
            :key="category.id"
            class="
              list-group-item
              shadow-sm
              font-weight-bold
              text-decoration-none text-dark
            "
          >
            <img :src="category.image" style="width: 35px" />
            {{ category.name }}
          </router-link>
          <router-link
            :to="{ name: 'categories' }"
            class="
              list-group-item
              text-center
              active
              shadow-sm
              font-weight-bold
              text-decoration-none
            "
            >LIHAT KATEGORI LAINNYA <i class="fa fa-long-arrow-alt-right"></i
          ></router-link>
        </ul>
      </h5>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { BulletListLoader } from "vue-content-loader";

export default {
  components: {
    BulletListLoader,
  },
  setup() {
    //   store vuex
    const store = useStore();
    // panggil action getCategories di module category vuex

    onMounted(() => {
      store.dispatch("category/getCategoriesHome");
    });
    //computed properti digunakan untuk get data categories dari state di module category
    const categories = computed(() => {
      return store.getters["category/getCategoriesHome"];
    });
    return {
      store,
      categories,
    };
  },
};
</script>