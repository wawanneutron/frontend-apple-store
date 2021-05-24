<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div v-if="validation.message" class="mt-2 alert alert-danger">
          {{ validation.message }}
        </div>
        <div class="card border-0 shadow rounded">
          <div class="card-body">
            <h4>LOGIN</h4>
            <hr />
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email Addres</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  id="email"
                  placeholder=" Email Address"
                />
              </div>
              <div v-if="validation.email" class="mt-2 alert alert-danger">
                {{ validation.email[0] }}
              </div>
              <div class="form-group">
                <label for="email">Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div v-if="validation.password" class="mt-2 alert alert-danger">
                {{ validation.password[0] }}
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="checkbox" />
                <label for="checkbox" class="form-check-label"
                  >Ingatkan Saya</label
                >
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                LOGIN
              </button>
            </form>
          </div>
        </div>
        <div class="register mt-3 text-center">
          <p>
            Belum punya akun ?
            <router-link :to="{ name: 'register' }"
              >Daftar Sekarang !</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    // user state
    const user = reactive({
      email: "",
      password: "",
    });
    // validation state
    const validation = ref([]);
    // store vuex
    const store = useStore();
    // route
    const router = useRouter();

    // method login
    function login() {
      // define variable
      let email = user.email;
      let password = user.password;
      // panggil action login dari module auth di vuex
      store
        .dispatch("auth/login", {
          email,
          password,
        })
        .then(() => {
          // redirect ke dashboard
          router.push({ name: "dashboard" });
        })
        .catch((error) => {
          // assign validation message
          validation.value = error;
        });
    }
    // return object
    return {
      user,
      validation,
      login,
    };
  },
};
</script>