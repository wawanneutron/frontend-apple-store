<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-3 mb-4">
        <CustomerMenu></CustomerMenu>
      </div>
      <div class="col-md-9 mb-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h5 class="font-weight-bold">
              <i class="fas fa-shopping-cart mr-2"></i>Detail Order
            </h5>
            <table
              class="
                table table-striped table-bordered
                mt-4
                table-responsive-lg
              "
            >
              <tr>
                <td style="width: 25%">No Invoice</td>
                <td style="width: 1%">:</td>
                <td>{{ detailOrder.invoice }}</td>
              </tr>
              <tr>
                <td>Nama Lengkap</td>
                <td>:</td>
                <td>
                  {{ detailOrder.name }}
                </td>
              </tr>
              <tr>
                <td>No. Telp / WA</td>
                <td>:</td>
                <td>
                  {{ detailOrder.phone }}
                </td>
              </tr>
              <tr>
                <td>KURIR / SERVICE / COST</td>
                <td>:</td>
                <td>
                  {{ detailOrder.courier }} / {{ detailOrder.service }} / Rp.
                  {{ detailOrder.cost_courier }}
                </td>
              </tr>
              <tr>
                <td>Alamat Lengkap</td>
                <td>:</td>
                <td>
                  {{ detailOrder.address }}
                </td>
              </tr>
              <tr>
                <td>Total pembelian</td>
                <td>:</td>
                <td>Rp. {{ detailOrder.grand_total }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>:</td>
                <td>
                  <div v-if="detailOrder.status == 'pending'">
                    <button
                      @click="payment(detailOrder.snap_token)"
                      class="btn btn-primary"
                    >
                      BAYAR SEKARANG
                    </button>
                    <div class="alert alert-warning mt-2">
                      Verifikasi dilakukan secara otomatis
                    </div>
                    <div class="alert alert-info mt-3">
                      Status pembayan anda <b>{{ detailOrder.status }}</b>
                      <br />
                      Silahkan melakukan pembayaran sekarang
                    </div>
                  </div>
                  <!-- pembayaran terverifikasi -->
                  <div v-else-if="detailOrder.status == 'payment-success'">
                    <button
                      @click="payment(detailOrder.snap_token)"
                      class="btn btn-success"
                    >
                      {{ detailOrder.status }}
                    </button>
                    <div class="alert alert-success mt-3">
                      Pembayaran Terverifikasi <br />
                      Barang akan di proses secepat mungkin
                    </div>
                  </div>

                  <!-- order success -->
                  <div v-else-if="detailOrder.status == 'success'">
                    <button
                      @click="payment(detailOrder.snap_token)"
                      class="btn btn-success"
                    >
                      {{ detailOrder.status }}
                    </button>
                    <div class="alert alert-success mt-3">
                      Pembelian telah selesai <br />
                      Terimakasih sudah berbelanja di Toko Online kami
                    </div>
                  </div>

                  <div v-else-if="detailOrder.status == 'process'">
                    <button
                      @click="payment(detailOrder.snap_token)"
                      class="btn btn-warning"
                    >
                      {{ detailOrder.status }}
                    </button>
                    <div class="alert alert-warning mt-3">
                      Barang sedang diproses. <br />
                      Kami akan segera mengirim no resi
                    </div>
                  </div>

                  <div v-else-if="detailOrder.status == 'shipping'">
                    <button
                      @click="payment(detailOrder.snap_token)"
                      class="btn btn-info"
                    >
                      {{ detailOrder.status }}
                    </button>
                    <div class="alert alert-warning mt-3">
                      Silahkan check nomor resi. <br />
                      Kami telah mengirim kealamat tujuan anda
                    </div>
                  </div>

                  <button
                    @click="payment(detailOrder.snap_token)"
                    v-else-if="detailOrder.status == 'expired'"
                    class="btn btn-warning"
                  >
                    {{ detailOrder.status }}
                  </button>
                  <button
                    @click="payment(detailOrder.snap_token)"
                    v-else-if="detailOrder.status == 'failed'"
                    class="btn btn-danger"
                  >
                    {{ detailOrder.status }}
                  </button>
                </td>
              </tr>
              <!-- jika status nya process tampilkan resi -->
              <tr
                v-if="
                  detailOrder.status == 'shipping' ||
                  detailOrder.status == 'success'
                "
              >
                <td>No Resi</td>
                <td>:</td>
                <td>
                  <button
                    id="btn-modal"
                    class="btn btn-primary"
                    type="submit"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                    @click.prevent="cekResi"
                  >
                    Cek Resi
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="card border-0 rounded shadow mt-4">
          <div class="card-body">
            <h5 class="font-weight-bold">
              <i class="fas fa-shopping-cart mr-2"></i>Detail Order
            </h5>
            <hr />
            <table
              class="table"
              style="
                border-style: solid !important;
                border-color: rgb(198, 206, 214) !important;
              "
            >
              <tbody>
                <tr
                  v-for="product in productInOrder"
                  :key="product.id"
                  style="background: #edf2f7"
                >
                  <td class="b-none" width="25%">
                    <div class="wrapper-image-cart">
                      <img
                        :src="product.product.gallery[0].image"
                        style="width: 100%; border-radius: 0.5rem"
                      />
                    </div>
                  </td>
                  <td class="b-none" width="50%">
                    <h5>
                      <b>{{ product.product_name }}</b>
                    </h5>
                    <table class="table-borderless" style="font-size: 14px">
                      <tr>
                        <td style="padding: 0.2rem">QTY</td>
                        <td style="padding: 0.2rem">:</td>
                        <td style="padding: 0.2rem">
                          <b>{{ product.qty }}</b>
                        </td>
                      </tr>
                    </table>
                    <div
                      @click="
                        (stateReview.order_id = product.id) &&
                          (stateReview.product_id = product.product_id)
                      "
                      @click.prevent="cekOrderId"
                      class="btn btn-warning text-uppercase mt-4"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      v-if="detailOrder.status == 'success'"
                    >
                      berikan ulasan
                    </div>
                  </td>
                  <td class="b-none text-right">
                    <p class="m-0 font-weight-bold">
                      Rp. {{ moneyFormat(product.price) }}
                    </p>
                  </td>
                  <!-- modal review -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Ulasan Produk
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="false">&times;</span>
                          </button>
                        </div>
                        <!-- handle inputan -->
                        <div class="modal-body">
                          <div class="row justify-content-center">
                            <div class="col-lg-6">
                              <star-rating
                                :star-size="50"
                                :show-rating="false"
                                :increment="0.5"
                                v-model:rating="stateReview.rating"
                              >
                              </star-rating>
                            </div>
                          </div>
                          <div class="form-group mt-5">
                            <label class="font-weight-bold" for="ulasan"
                              >Tulis Ulasan</label
                            >
                            <textarea
                              id="ulasan"
                              rows="3"
                              placeholder="Masukkan Ulasan Produk"
                              class="form-control"
                              spellcheck="false"
                              v-model="stateReview.reviewCustomer"
                            ></textarea>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            @click.prevent="submitReview"
                            class="btn btn-primary"
                          >
                            Kirim
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- modal cek resi -->
    <!-- Button trigger modal -->
    <div
      class="modal fade bd-example-modal-lg"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title font-weight-bold text-uppercase"
              id="exampleModalLongTitle"
            >
              <i class="fas fa-shopping-cart mr-2"></i>tracking status
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- cek resi -->
            <h6 class="font-weight-bold text-uppercase mt-3 mb-2">
              <i class="fas fa-info-circle mr-2"></i> Information shipping
            </h6>
            <table class="table table-responsive table-info text-uppercase h6">
              <tr>
                <td>No Resi</td>
                <td>:</td>
                <td>{{ state.data_resi.awb }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>:</td>
                <td>{{ state.data_resi.status }}</td>
              </tr>
              <tr>
                <td>Service</td>
                <td>:</td>
                <td>{{ state.data_resi.service }}</td>
              </tr>
              <tr>
                <td class="col-6">Dikirm Tanggal</td>
                <td class="">:</td>
                <td class="col-6">{{ state.data_resi.date }}</td>
              </tr>
              <tr>
                <td>Dikirm Oleh</td>
                <td>:</td>
                <td>{{ state.details.shipper }}</td>
              </tr>
              <tr>
                <td>Dikirm Ke</td>
                <td>:</td>
                <td>{{ state.details.destination }}</td>
              </tr>
              <tr>
                <td>Desc</td>
                <td>:</td>
                <td>{{ state.data_resi.desc }}</td>
              </tr>

              <tr>
                <td>Courier</td>
                <td>:</td>
                <td>{{ state.data_resi.courier }}</td>
              </tr>
            </table>
            <!-- information status tracking -->
            <h6 class="font-weight-bold text-uppercase mt-5 mb-2">
              <i class="fas fa-car mr-2"></i> Information status tracking
            </h6>
            <table
              class="
                table table-responsive table-bordered
                text-uppercase
                mb-3
                h6
              "
            >
              <tr>
                <th>Tangal</th>
                <th>Keterangan</th>
              </tr>
              <tr v-for="data of state.histories" :key="data">
                <template v-for="(item, index) of data" :key="index">
                  <td class="col-6">{{ item }}</td>
                </template>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerMenu from "@/components/CustomerMenu.vue";
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import StarRating from "vue-star-rating";
import Api from "../../api/Jne";
import ApiServer from "../../api/Api";

export default {
  components: {
    CustomerMenu,
    StarRating,
  },
  setup() {
    // store vuex
    const store = useStore();
    // route & router vue router
    const route = useRoute();
    const router = useRouter();

    // mounted
    onMounted(() => {
      // panggil action detailOrder didalam module order di vuex
      store.dispatch("order/detailOrder", route.params.snap_token);
    });

    // computed
    const detailOrder = computed(() => {
      // panggil getter dengan nama detailOrder didalam module order di vuex
      return store.getters["order/detailOrder"];
    });

    const productInOrder = computed(() => {
      // panggil getter dengan nama productInOrder didalam module order di vuex
      return store.getters["order/productInOrder"];
    });

    // function payment Midtrans
    function payment(snap_token) {
      window.snap.pay(snap_token, {
        onSuccess: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
        onPending: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
        onError: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
      });
    }

    // cek resi pengiriman

    // define state from cek resi
    let state = reactive({
      api_key:
        "a4020d997938fd6b233b295bab207e442a6bab2e697a10bb5149d7418586f168",
      data_resi: {},
      details: {},
      histories: [], //history pengiriman
    });

    const cekResi = () => {
      if (detailOrder.value.courier == "jne") {
        Api.get("/v1/track", {
          params: {
            api_key: state.api_key,
            courier: detailOrder.value.courier,
            awb: detailOrder.value.resi,
          },
        })
          .then((response) => {
            let sumary = response.data.data.summary;
            let dataHistory = response.data.data.history;
            let detail = response.data.data.detail;

            const history = dataHistory.map((elmn) => {
              return elmn;
            });

            state.histories = history;
            state.data_resi = sumary;
            state.details = detail;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("anada tidak memekai jne");
      }
    };

    /* rating atau reaview product oleh customer */
    // get data token dan user
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    Api.defaults.headers.common["Authorization"] = "Bearer " + token;

    let stateReview = reactive({
      order_id: "",
      product_id: "",
      rating: "",
      reviewCustomer: "",
      status: [],
    });

    // fungsi untuk mengecek length review
    const cekOrderId = () => {
      let orderId = stateReview.order_id;
      // kirim ke server untuk di cek
      ApiServer.post("/reviewcek", {
        order_id: orderId,
        user_id: user.id,
      })
        .then((response) => {
          stateReview.status = response.data.review;
          console.log(stateReview.status);
          // cek jika array belum ada isi nya
          if (stateReview.status.length == 0) {
            alert("silahkan isi ulasan anda");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // fungsi untuk menambahkan review / ulasan dan rating
    const submitReview = () => {
      let orderId = stateReview.order_id;
      let productId = stateReview.product_id;
      let rating = stateReview.rating;
      let review = stateReview.reviewCustomer;
      // cek apakah data ada ?
      if (stateReview.status.length <= 0) {
        ApiServer.post("/review", {
          customer_id: user.id,
          order_id: orderId,
          product_id: productId,
          rating: rating,
          review: review,
        }).then(() => {
          // hapus data di form
          stateReview.rating = "";
          stateReview.reviewCustomer = "";
          // cek lagi isi reviewnya
          ApiServer.post("/reviewcek", {
            order_id: orderId,
            user_id: user.id,
          })
            .then((response) => {
              stateReview.status = response.data.review;
              console.log(stateReview.status);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        alert("anda sudah memberikan ulasan");
        // hapus data di form
        stateReview.rating = "";
        stateReview.reviewCustomer = "";
      }

      console.log(stateReview.reviewCustomer);
      console.log(stateReview.rating);
      console.log(stateReview.order_id);
      console.log(stateReview.product_id);
    };

    return {
      store,
      route,
      router,
      detailOrder,
      productInOrder,
      payment,
      cekResi,
      state,
      stateReview,
      submitReview,
      cekOrderId,
    };
  },
};
</script>

<style scoped>
.table .thead-dark th {
  color: #fff;
  background-color: #6777ef;
  border-color: #6777ef;
}
</style>