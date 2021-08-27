<template>
  <div class="container-fluid">
    <div class="row mt-4 mb-3">
      <div class="col-md-3">
        <Category></Category>
      </div>
      <div class="col-md-9">
        <Sliders></Sliders>
      </div>
    </div>
    <div class="container-fluid mb-5 mt-5">
      <!-- data product -->
      <div class="row">
        <div class="col-md-12">
          <h4 class="font-weight-bold">
            <i class="fa fa-shopping-bag mr-2"></i>Product Terlaris
          </h4>
          <hr
            style="
              border-top: 4px solid rgb(154 155 156);
              border-radius: 0.5rem;
            "
          />
        </div>
      </div>
      <div class="row justify-content-center" v-if="productsTerlaris <= 0">
        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
        <div
          v-for="product of productsTerlaris"
          :key="product.id"
          class="col-md-3 col-6 mb-3"
          style="padding: 0 4px"
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
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mb-5 mt-5">
      <!-- data product -->
      <div class="row">
        <div class="col-md-12">
          <h4 class="font-weight-bold">
            <i class="fa fa-shopping-bag mr-2"></i>Product Terbaru
          </h4>
          <hr
            style="
              border-top: 4px solid rgb(154 155 156);
              border-radius: 0.5rem;
            "
          />
        </div>
      </div>
      <div class="row justify-content-center" v-if="products <= 0">
        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card">
            <facebook-loader />
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
        <div
          v-for="product of products"
          :key="product.id"
          class="col-md-3 col-6 mb-3"
          style="padding: 0 4px"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import Sliders from "@/components/Slider.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { FacebookLoader } from "vue-content-loader";
// import { ListLoader } from "vue-content-loader";
// import { BulletListLoader } from "vue-content-loader";
// import { CodeLoader } from "vue-content-loader";

export default {
  components: {
    Category,
    Sliders,
    FacebookLoader,
    // ListLoader,
    // BulletListLoader,
    // CodeLoader,
  },

  setup() {
    // store vuex
    const store = useStore();

    // onMounted pertama kali object dibuat
    onMounted(() => {
      store.dispatch("product/getProductsHome");
    });
    onMounted(() => {
      store.dispatch("product/getTerlaris");
    });
    //computed properti digunakan untuk get data products dari state di module product
    const products = computed(() => {
      return store.getters["product/getProductsHome"];
    });
    const productsTerlaris = computed(() => {
      return store.getters["product/getProductsTerlaris"];
    });

    return {
      store,
      products,
      productsTerlaris,
    };
  },
};
</script>