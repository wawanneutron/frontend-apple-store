<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card" v-if="gallery <= 0">
          <div class="card-body">
            <!-- card header -->
            <content-loader />
            <!-- thumbnail -->
            <div class="row mt-3 justify-content-center">
              <div class="col-md-3 col-4 col-thumbnail">
                <content-loader />
              </div>
              <div class="col-md-3 col-4 col-thumbnail">
                <content-loader />
              </div>
              <div class="col-md-3 col-4 col-thumbnail">
                <content-loader />
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-else>
          <div class="card-body">
            <!-- card header -->
            <transition
              name="slide-fade"
              mode="out-in"
              v-if="gallery[photoActive]"
            >
              <img
                :src="gallery[photoActive].image"
                class="img-store img-fluid w-100"
              />
            </transition>
            <!-- thumbnail -->
            <div class="row justify-content-center">
              <div
                class="col-md-3 col-4 col-thumbnail"
                v-for="(item, index) of gallery"
                :key="index"
              >
                <main @click="changeActive(index)">
                  <img
                    class="w-100 img-thumbnail float-left"
                    :src="item.image"
                    :class="{ active: index == photoActive }"
                  />
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px">
              {{ product.title }}
            </label>
            <div class="alert alert-danger" v-if="product.stock == 0">
              <p>Upps maaf stock barang sedang kosong</p>
            </div>
            <hr />
            <div
              class="price-product"
              id="price-product"
              style="font-size: 1.35rem"
            >
              <span class="font-weight-bold mr-4" style="color: green"
                >Rp. {{ calculateDiscount(product) }}</span
              >
              <s class="font-weight-bold" style="text-decoration-color: red"
                >Rp. {{ product.price }}</s
              >
            </div>
            <table class="table table-borderless mt-3">
              <tbody>
                <tr>
                  <td class="font-weight-bold">DISKON</td>
                  <td>:</td>
                  <td>
                    <button
                      class="btn btn-sm"
                      style="color: #ff2f00; border-color: #ff2f00"
                    >
                      DISKON {{ product.discount }} %
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">BERAT</td>
                  <td>:</td>
                  <td>
                    <span
                      class="badge badge-pill badge-success"
                      style="
                        font-size: 14px;
                        border-radius: 0.3rem;
                        padding: 0.25em 0.5em 0.2em;
                      "
                    >
                      {{ product.weight }} gram</span
                    >
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">STOCK</td>
                  <td>:</td>
                  <td>
                    <span
                      class="badge badge-pill badge-warning"
                      style="
                        font-size: 14px;
                        border-radius: 0.3rem;
                        padding: 0.25em 0.5em 0.2em;
                      "
                    >
                      {{ product.stock }} stock</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="product.stock == 0">
              <button class="btn btn-danger btn-lg btn-block">
                <i class="fa fa-shopping-cart"></i> STOCK KOSONG
              </button>
            </div>
            <div v-else>
              <button
                @click.prevent="
                  addToCart(
                    product.id,
                    calculateDiscount(product),
                    product.weight
                  )
                "
                class="btn btn-primary btn-lg btn-block"
              >
                <i class="fa fa-shopping-cart"></i> TAMBAH KE KERANJANG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  id="detail-tab"
                  data-toggle="tab"
                  href="#detail"
                  role="tab"
                  aria-controls="detail"
                  aria-selected="true"
                  >Detail Produk</a
                >
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="ulasan-tab"
                  data-toggle="tab"
                  href="#ulasan"
                  role="tab"
                  aria-controls="ulasan"
                  aria-selected="false"
                >
                  <star-rating
                    :show-rating="true"
                    :star-size="23"
                    :read-only="true"
                    :increment="0.01"
                    :rating="reviewsAvg"
                  ></star-rating>
                  <span
                    >( <b>{{ countReviews }}</b> ulasan)</span
                  >
                </a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="detail"
                role="tabpanel"
                aria-labelledby="detail-tab"
              >
                <div class="mt-4" v-html="product.content"></div>
              </div>
              <div
                class="tab-pane fade"
                id="ulasan"
                role="tabpanel"
                aria-labelledby="ulasan-tab"
                v-if="reviews !== null"
              >
                <div class="ulasan mt-5">
                  <ul class="list-unstyled">
                    <div
                      class="card card-body mt-5"
                      v-for="data in reviews"
                      :key="data.id"
                    >
                      <li class="media">
                        <img
                          :src="`https://ui-avatars.com/api/?name=${data.customer.name}&background=1f1235&color=ffffff`"
                          class="mr-3 rounded-circle"
                          width="50"
                          alt="profile"
                        />
                        <div class="media-body">
                          <star-rating
                            :show-rating="false"
                            :star-size="21"
                            :read-only="true"
                            :increment="0.01"
                            :rating="data.rating"
                          ></star-rating>
                          <h5 class="mt-0 mb-1">{{ data.customer.name }}</h5>
                          <p>{{ data.review }}</p>
                        </div>
                      </li>
                    </div>
                    <!-- jika tidak ada ulasan -->
                    <div class="mt-5" v-if="reviews == 0">
                      <li class="media">
                        <div class="media-body">
                          <div class="alert alert-info">Belum ada ulasan</div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="ulasan"
                role="tabpanel"
                aria-labelledby="ulasan-tab"
                v-if="reviews == null"
              >
                <div class="ulasan mt-5">
                  <ul class="list-unstyled">
                    <div class="card card-body mt-5">
                      <li class="media">
                        <div class="media-body">
                          <div class="alert alert-info">Belum ada ulasan</div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ContentLoader } from "vue-content-loader";
import StarRating from "vue-star-rating";

export default {
  components: {
    ContentLoader,
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      store.dispatch("product/getDetailProduct", route.params.slug);
    });

    const product = computed(() => {
      return store.getters["product/getDetailProduct"];
    });

    const gallery = computed(() => {
      return store.getters["product/getGalleries"];
    });

    /* reviews customer */
    const reviews = computed(() => {
      return store.getters["product/getReviews"].reviews;
    });
    const countReviews = computed(() => {
      return store.getters["product/getReviews"].reviews_count;
    });
    const reviewsAvg = computed(() => {
      return store.getters["product/getReviews"].reviews_avg_rating;
    });

    /* tambah produk ke keranjang */
    function addToCart(product_id, price, weight) {
      // check token terlebih dahulu
      const token = store.state.auth.token;

      if (!token) {
        return router.push({ name: "login" });
      }
      // panggil action addToCart di module cart
      store.dispatch("cart/addToCart", {
        product_id: product_id,
        price: price,
        weight: weight,
        quantity: 1,
      });
    }

    return {
      product,
      addToCart,
      gallery,
      reviews,
      countReviews,
      reviewsAvg,
    };
  },

  // photo galleries thumbnail
  data: () => ({
    photoActive: 0,
  }),
  methods: {
    changeActive(id) {
      this.photoActive = id;
    },
  },
};
</script>