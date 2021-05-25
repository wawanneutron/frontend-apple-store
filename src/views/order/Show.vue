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
              class="table table-striped table-bordered mt-4 table-responsive-lg"
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
                  <button
                    @click="payment(detailOrder.snap_token)"
                    v-if="detailOrder.status == 'pending'"
                    class="btn btn-primary"
                  >
                    BAYAR SEKARANG
                  </button>
                  <button
                    @click="payment(detailOrder.snap_token)"
                    v-else-if="detailOrder.status == 'success'"
                    class="btn btn-success"
                  >
                    {{ detailOrder.status }}
                  </button>
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
            </table>
            <hr />
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
                        :src="product.image"
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
                  </td>
                  <td class="b-none text-right">
                    <p class="m-0 font-weight-bold">
                      Rp. {{ moneyFormat(product.price) }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerMenu from "@/components/CustomerMenu.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    CustomerMenu,
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

    return {
      store,
      route,
      router,
      detailOrder,
      productInOrder,
      payment,
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