<template>
  <div class="notifications-list">
    <notification-message
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationMessage from "./NotificationMessage.vue";
import { useStore } from "vuex";
export default {
  components: {
    NotificationMessage,
  },
  setup() {
    const store = useStore();
    const notifications = store.state.alert.notifications;

    return {
      store,
      notifications,
    };
  },
};
</script>

<style>
.notifications-list {
  position: fixed;
  top: 60px;
  right: 0;
  margin-right: 15px;
  margin-left: 15px;
}
</style>