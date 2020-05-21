<template>
  <transition name="fade">
    <div class="modal" v-if="value" @click="clickOutside">
      <div class="modal__block">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    /* Обработка нажатия вне диалогового окна */
    clickOutside(e) {
      if (e.target.classList.contains("modal")) {
        this.$emit("input", false);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  transition: .3s;

  &__block {
    display: inline-block;
    padding: 15px 20px;
    background-color: $note-bg-color;
    border: 1px solid $note-border-color;
    border-radius: 8px;
    text-align: center;
    color: $note-title-color;
  }
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>