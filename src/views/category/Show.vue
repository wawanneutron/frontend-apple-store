<template>
  <div class="container-fluid mb-5 mt-5">
    <!-- data product -->
    <div class="row">
      <div class="col-md-12">
        <h4 class="font-weight-bold">
          <i class="fa fa-shopping-bag mr-2"></i>Product Berdasarkan Kategori
          "{{ convertToSlug(route.params.slug) }}"
        </h4>
        <hr
          style="border-top: 4px solid rgb(154 155 156); border-radius: 0.5rem"
        />
      </div>
    </div>
    <div v-if="products.length > 0" class="row justify-content-center">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-3 col-6 mb-3"
      >
        <div class="card h-100 border-0 shadow rounded-md">
          <div class="card-img">
            <img
              :src="product.gallery[0].image"
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
          <div style="display: inline-block; margin: 0 auto" class="card-body">
            <star-rating
              :inline="true"
              :star-size="20"
              :read-only="true"
              :show-rating="false"
              :increment="0.01"
              :rating="product.avg_rating"
            ></star-rating>
            <span class="ml-2"
              >(<b>{{ product.total_reviews }}</b> ulasan)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row alert alert-warning">
      <div class="col-12 text-center justify-content-center">
        <h5>
          Product Category "{{ convertToSlug(route.params.slug) }}" Kosong
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch("category/getProductOnCategory", route.params.slug);
    });

    const products = computed(() => {
      return store.getters["category/getProductOnCategory"];
    });

    const convertToSlug = (Text) => {
      return Text.toUpperCase()
        .replace(/ /g, "-")
        .replace(/[^\w]+/g, " ");
    };

    const formatRupiah = (money) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(money);
    };

    return {
      route,
      store,
      products,
      convertToSlug,
      formatRupiah,
    };
  },
};
</script>