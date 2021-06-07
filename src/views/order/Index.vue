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
              <i class="fas fa-shopping-cart mr-2"></i>My Order
            </h5>
            <table
              class="table table-striped table-bordered mt-4 table-responsive-lg"
              v-if="orders.length > 0"
            >
              <thead class="text-uppercase thead-dark">
                <tr class="text-center">
                  <th>invoice</th>
                  <th>Full name</th>
                  <th>Courier</th>
                  <th>Status</th>
                  <th>Grand Total</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order.id">
                  <td>{{ order.invoice }}</td>
                  <td>{{ order.name }}</td>
                  <td>
                    {{ order.courier }} | {{ order.service }} | Rp.
                    {{ moneyFormat(order.cost_courier) }}
                  </td>
                  <td>
                    {{ order.status }}
                  </td>
                  <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'detail_order',
                        params: { snap_token: order.snap_token },
                      }"
                      class="btn btn-primary"
                      ><i class="fas fa-eye mr-2"></i>detail</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- data kosong -->
            <div v-else>
              <table
                class="table table-striped table-bordered mt-4 table-responsive-lg"
              >
                <thead class="text-uppercase thead-dark">
                  <tr class="text-center">
                    <th>invoice</th>
                    <th>Full name</th>
                    <th>Shipping</th>
                    <th>Grand Total</th>
                    <th>Option</th>
                  </tr>
                </thead>
              </table>
              <div class="alert alert-danger text-center h5">Data Kosong</div>
            </div>
            <hr />
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
export default {
  components: {
    CustomerMenu,
  },
  setup() {
    // store vuex
    const store = useStore();
    // mounted
    onMounted(() => {
      // panggil action getOrder di module order vuex
      return store.dispatch("order/getOrder");
    });
    // computed
    const orders = computed(() => {
      // panggil getter dengan nama getOrder di module order vuex
      return store.getters["order/getOrder"];
    });
    return {
      store,
      orders,
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