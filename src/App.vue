<template>
  <Header />
  <router-view />
  <notifications-list />
  <Footer />
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotificationsList from "./components/NotificationsList.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    NotificationsList,
  },
};
</script>


