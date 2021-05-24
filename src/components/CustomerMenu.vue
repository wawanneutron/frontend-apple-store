<template>
  <div class="card border-0 shadow">
    <div class="card-body text-uppercase">
      <h5 class="font-weight-bold">Main menu</h5>
      <hr />
      <ul class="list-group">
        <router-link
          :to="{ name: 'dashboard' }"
          class="list-group-item text-decoration-none text-dark"
          ><i class="fas fa-tachometer-alt mr-3"></i>dashboard</router-link
        >
        <a href="#" class="list-group-item text-decoration-none text-dark">
          <i class="fas fa-shopping-cart mr-3"></i>My order
        </a>
        <a
          style="cursor: pointer"
          class="list-group-item text-decoration-none text-dark"
          data-toggle="modal"
          data-target="#myModal"
        >
          <i class="fas fa-sign-out-alt mr-3"></i>Logout
        </a>
      </ul>
    </div>
  </div>
  <!-- The Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Logout</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <h4>Yakin ingin keluar ?</h4>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-dismiss="modal">
            Close
          </button>
          <button
            @click="logout"
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
ul {
  padding: 0;
}
</style>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    // store vuex
    const store = useStore();
    // vue router
    const router = useRouter();
    // method logout
    function logout() {
      // panggil action logout di dalam module auth
      store.dispatch("auth/logout").then(() => {
        // jika berhasil akan diarahkan keraouter login
        router.push({
          name: "login",
        });
      });
    }
    return {
      store,
      router,
      logout,
    };
  },
};
</script>