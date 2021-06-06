<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-6">
        <div class="card border-0 shadow rounded">
          <div class="card-body">
            <h5><i class="fa fa-shopping-cart mr-2"></i>Detail Pesanan</h5>
            <hr />
            <table
              class="table"
              style="
                border-style: solid !important;
                border-color: rgb(198, 206, 214) !important;
              "
            >
              <tbody>
                <tr v-for="cart of carts" :key="cart.id">
                  <td width="25%">
                    <div class="image-cart">
                      <img
                        :src="cart.product.image"
                        style="width: 100%; border-radius: 0.5rem"
                      />
                    </div>
                  </td>
                  <td class="" width="50%">
                    <h5>
                      <b>{{ cart.product.title }}</b>
                    </h5>
                    <table class="table-borderless" style="font-size: 14px">
                      <tr>
                        <td style="padding: 0.2rem">QTY</td>
                        <td style="padding: 0.2rem">:</td>
                        <td style="padding: 0.2rem">
                          <b>{{ cart.quantity }}</b>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="text-right">
                    <p class="m-0 font-weight-bold">
                      Rp. {{ moneyFormat(cart.price) }}
                    </p>

                    <p class="m-0">
                      <s style="text-decoration-color: red"
                        >Rp.
                        {{ moneyFormat(cart.product.price * cart.quantity) }}</s
                      >
                    </p>

                    <br />
                    <div class="text-right">
                      <button
                        @click.prevent="removeCart(cart.id)"
                        class="btn btn-sm btn-danger"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table table-default">
              <tbody>
                <tr>
                  <td class="text-left" width="60%">
                    <p class="m-0">Jumlah</p>
                  </td>
                  <td class="text-right" width="30%">&nbsp; : Rp.</td>
                  <td class="text-right set-td">
                    <p class="m-0">
                      {{ moneyFormat(cartTotal) }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="set-td text-left border-0">
                    <p class="m-0">
                      ONGKOS KIRIM (<strong>{{ cartWeight }}</strong> gram)
                    </p>
                  </td>
                  <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                  <td class="set-td border-0 text-right">
                    <p class="m-0" id="ongkir-cart">
                      {{ moneyFormat(state.courier_cost) }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="text-left border-0">
                    <p class="font-weight-bold m-0 h5 text-uppercase">
                      Grand Total
                    </p>
                  </td>
                  <td class="border-0 text-right">&nbsp; : Rp.</td>
                  <td class="border-0 text-right">
                    <p class="font-weight-bold m-0 h5" align="right">
                      {{ moneyFormat(state.grandTotal) }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow rounded">
          <div class="card-body">
            <h5><i class="fa fa-user circle mr-2"></i>Rincian Pengiriman</h5>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name" class="font-weight-bold"
                    >Nama Lengkap</label
                  >
                  <input
                    type="text"
                    v-model="state.name"
                    id="nama_lengkap"
                    class="form-control"
                    placeholder="Nama lengkap"
                  />
                  <div v-if="validation.name" class="mt-2 alert alert-danger">
                    Masukan nama lengkap anda
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone_number" class="font-weight-bold"
                    >No. Hp / Whatsapp</label
                  >
                  <input
                    type="bumber"
                    v-model="state.phone"
                    id="phone_number"
                    class="form-control"
                    placeholder="No. Hp / Whatsapp"
                  />
                  <div v-if="validation.phone" class="mt-2 alert alert-danger">
                    Masukan No. telpon anda
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="province" class="font-weight-bold"
                    >Provinsi</label
                  >
                  <select
                    class="form-control"
                    v-model="state.province_id"
                    id="province"
                    @change="getCities"
                  >
                    <option value="">-- pilih provinsi --</option>
                    <option
                      v-for="province in state.provinces"
                      :key="province.id"
                      :value="province.province_id"
                    >
                      {{ province.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="city" class="font-weight-bold"
                    >Kota / kabupaten</label
                  >
                  <select
                    class="form-control"
                    v-model="state.city_id"
                    id="city"
                    @change="getCourier"
                  >
                    <option value="">-- pilih kota --</option>
                    <option
                      v-for="city in state.cities"
                      :key="city.id"
                      :value="city.city_id"
                    >
                      {{ city.name }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- kurir pengiriman -->
              <div class="col-md-12">
                <div class="form-group" v-if="state.courier">
                  <label class="font-weight-bold mb-3">Kurir Pengiriman</label>
                  <br />
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="shipping_jne"
                      value="jne"
                      v-model="state.courier_type"
                      @change="getOngkir"
                    />
                    <label
                      for="shipping_jne"
                      class="form-check-label font-weight-bold mr-4"
                      >JNE</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="shipping_tiki"
                      value="tiki"
                      v-model="state.courier_type"
                      @change="getOngkir"
                    />
                    <label
                      for="shipping_tiki"
                      class="form-check-label font-weight-bold mr-4"
                      >TIKI</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="shipping_pos"
                      value="pos"
                      v-model="state.courier_type"
                      @change="getOngkir"
                    />
                    <label
                      for="shipping_pos"
                      class="form-check-label font-weight-bold mr-4"
                      >POS</label
                    >
                  </div>
                </div>
              </div>
              <!-- service kurir serta ongkos kirim -->
              <div class="col-md-12">
                <div class="form-group" v-if="state.cost">
                  <hr />
                  <label class="font-weight-bold mb-3">Service Kurir</label>
                  <br />
                  <div class="alert alert-danger" v-if="state.costs == 0">
                    <span
                      >Pengiriman
                      <b>{{ state.courier_type.toUpperCase() }}</b> tidak ada ke
                      kota tujuan anda</span
                    >
                  </div>
                  <div
                    v-for="value in state.costs"
                    :key="value.service"
                    class="form-check form-check-inline"
                  >
                    <input
                      type="radio"
                      class="form-check-input mb-3"
                      :id="value.service"
                      :value="value.cost[0].value + '|' + value.service"
                      v-model="state.costService"
                      @change="getCostService"
                    />
                    <label
                      :for="value.service"
                      class="form-check-label font-weight-normal mr-5 mb-3"
                    >
                      {{ value.service }} - Rp.
                      {{ moneyFormat(value.cost[0].value) }}
                    </label>
                  </div>
                </div>
              </div>
              <!-- estimasi -->
              <div class="col-md-12">
                <div v-if="state.etd">
                  <label class="font-weight-bold mb-3">Estimasi Sampai</label>
                  <br />
                  <span v-if="state.courier_type == 'pos'"
                    >{{ state.costs[0].cost[0].etd }} Pengiriman</span
                  >
                  <span v-else
                    >{{
                      state.costs == 0
                        ? ((state.etd = false),
                          (state.courier_cost = 0),
                          (state.grandTotal = 0))
                        : state.costs[0].cost[0].etd + " Hari Pengiriman"
                    }}
                  </span>
                </div>
                <hr />
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="font-weight-bold" id="alamat"
                    >Alamat Lengkap</label
                  >
                  <textarea
                    class="form-control"
                    v-model="state.address"
                    id="alamat"
                    rows="3"
                    placeholder="Alamat Lengkap&#10;&#10;Contoh: Perum Badak Triraksa - Tigaraksa Kab. Tangerang"
                  ></textarea>
                  <div
                    v-if="validation.address"
                    class="mt-2 alert alert-danger"
                  >
                    Masukan alamat dengan lengkap
                  </div>
                </div>
              </div>
              <div v-if="state.buttonCheckout" class="col-md-12">
                <button
                  @click.prevent="checkout"
                  class="btn btn-primary btn-lg btn-block text-uppercase"
                >
                  checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import Api from "../../api/Api";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      // store.dispatch("cart/cartCount");
      // store.dispatch("cart/cartTotoal");
      store.dispatch("cart/cartWeight");
    });

    const carts = computed(() => {
      return store.getters["cart/getCart"];
    });

    const cartTotal = computed(() => {
      return store.getters["cart/cartTotal"];
    });

    const cartWeight = computed(() => {
      return store.state.cart.cartWeight;
    });

    /* function hapus data cart */
    const removeCart = (cart_id) => {
      if (confirm("Do you want to delete ?")) {
        store.dispatch("cart/removeCart", cart_id);
      }
    };
    /*  */
    /*
    ongkos kirim 
     */
    /*  */
    //  difine state form
    const state = reactive({
      name: "",
      phone: "",
      address: "",
      provinces: [],
      province_id: "",
      cities: [],
      city_id: "",
      courier: false,
      courier_type: "",
      cost: false,
      costs: "",
      costService: "",
      courier_cost: 0,
      courier_service: "",
      etd: false,
      buttonCheckout: false,
      grandTotal: 0,
    });

    // define state validation
    const validation = reactive({
      name: false,
      phone: false,
      address: false,
    });

    // mounted data provinces
    const provinces = onMounted(() => {
      Api.get("/rajaongkir/provinces")
        .then((response) => {
          state.provinces = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // fungsi mendapatkan data kota/kabupaten berdasarkan ID Provinsi
    const getCities = () => {
      Api.get("/rajaongkir/cities", {
        params: {
          province_id: state.province_id,
        },
      })
        .then((response) => {
          state.cities = response.data.data;
          console.log(state.cities);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // fungsi menampilkan pilihan courier
    const getCourier = () => {
      state.courier = true;
    };

    // fungsi untuk mendapatkan biaya ongkos kirim
    const getOngkir = () => {
      // check berat product
      if (cartWeight.value == 0) {
        alert("silahkan pilih product terlebih dahulu");
        return;
      }

      Api.post("/rajaongkir/check-ongkir", {
        city_destination: state.city_id, //tujuan pengiriman
        weight: cartWeight.value, //berat product
        courier: state.courier_type, //jenis kurir
      })
        .then((response) => {
          // set true, untuk menampilkan piliahn cost pengiriman
          state.cost = true;
          state.costs = response.data.data[0].costs;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // fungsi untuk menampilkan biaya ongkos kirim dan service kurir
    const getCostService = () => {
      // ubah string menjadi array
      let shipping = state.costService.split("|");
      // set state cost dengan service
      state.courier_cost = shipping[0];
      state.courier_service = shipping[1];

      // menghitung grand total
      const token = store.state.auth.token;
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get("cart/total").then((response) => {
        // jumlahkan total cart dan cost pengiriman
        state.grandTotal =
          parseInt(response.data.total) + parseInt(state.courier_cost);
      });

      // uppercase

      // show button checkout
      state.buttonCheckout = true;
      state.etd = true;
    };

    const checkout = () => {
      // check apakah ada nama, phone, address, dan berat product
      if (state.name && state.phone && state.address && cartWeight.value) {
        // define variable
        let data = {
          name: state.name,
          phone: state.phone,
          province_id: state.province_id,
          city_id: state.city_id,
          courier_type: state.courier_type,
          courier_service: state.courier_service,
          cost_courier: state.courier_cost,
          weight: cartWeight.value,
          address: state.address,
          grandTotal: state.grandTotal,
        };
        store
          .dispatch("cart/checkout", data)
          .then((response) => {
            // jika berhasil, arahkan kedetail order dengan parameter snap_token midtrans
            router.push({
              name: "detail_order",
              params: {
                snap_token: response[0].snap_token,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      /* 
      check validasi 
      jika state tidak ada isinya validasi bernilai true*/
      if (!state.name) {
        validation.name = true;
      }

      if (!state.phone) {
        validation.phone = true;
      }

      if (!state.address) {
        validation.address = true;
      }
    };

    return {
      store,
      carts,
      cartTotal,
      cartWeight,
      removeCart,
      state,
      validation,
      provinces,
      getCities,
      getCourier,
      getOngkir,
      getCostService,
      checkout,
    };
  },
};
</script>