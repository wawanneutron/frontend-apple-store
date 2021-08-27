<template>
  <div
    :class="typeClass"
    class="alert alert-dismissible fade show"
    role="alert"
  >
    {{ notification.message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["notification"],

  computed: {
    typeClass() {
      return `alert-${this.notification.type}`;
    },
  },
};
</script>