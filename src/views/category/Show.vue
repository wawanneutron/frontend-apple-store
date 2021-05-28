<template>
  <div class="container-fluid mb-5 mt-5">
    <!-- data product -->
    <div class="row">
      <div class="col-md-12">
        <h4 class="font-weight-bold">
          <i class="fa fa-shopping-bag mr-2"></i>Product Berdasarkan Kategori
          {{}}
        </h4>
        <hr
          style="border-top: 4px solid rgb(154 155 156); border-radius: 0.5rem"
        />
      </div>
    </div>
    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-3 col-6 mb-3"
      >
        <div class="card h-100 border-0 shadow rounded-md">
          <div class="card-img">
            <img
              :src="product.image"
              class="w-100"
              style="
                height: 15em;
                object-fit: cover;
                border-top-left-radius: 0.25rem;
                border-top-right-radius: 0.25rem;
              "
            />
          </div>
          <div class="card-body">
            <router-link
              :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="card-title font-weight-bold"
              style="font-size: 20px"
            ></router-link>
            <div class="discount mt-2" style="color: #999">
              <s>Rp. {{ moneyFormat(product.price) }} </s>
              <span
                style="background-color: darkorange"
                class="badge badge-pill badge-success text-white"
                >DISKON {{ product.discount }} %</span
              >
            </div>
            <div
              class="price font-weight-bold mt-3"
              style="color: #47b04b; font-size: 20px"
            >
              Rp. {{ moneyFormat(calculateDiscount(product)) }}
            </div>
            <router-link
              :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="btn btn-primary btn-md mt-3 btn-block shadow-md"
              >LIHAT PRODUK</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch("category/getProductOnCategory", route.params.slug);
    });

    const products = computed(() => {
      return store.getters["category/getProductOnCategory"];
    });

    return {
      route,
      store,
      products,
    };
  },
};
</script>