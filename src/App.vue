<template>
  <div class="app">
    <transition name="route" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  watch: {
    /* На любое изменение заметок сохраняем их в localStorage */
    notes: {
      deep: true,
      handler() {
        this.$store.dispatch("setNotesToLocalStorage");
      }
    }
  },
  computed: {
    notes() {
      this.$store.state.notes;
    }
  },
  created() {
    this.$store.dispatch("getNotes");
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  justify-content: center;
  padding: 20px;

  .route-enter-active, .route-leave-active {
    transition: all .3s ease;
  }
  .route-enter, .route-leave-to {
    opacity: 0;
  }
}
</style>
