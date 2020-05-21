<template>
  <dialog-window v-model="active">  
    <div class="confirm">
      <div class="confirm__title">{{title}}</div>
      <div class="confirm__buttons">
        <button class="btn success" @click.prevent="agree">Да</button>
        <button class="btn error" @click.prevent="disagree">Нет</button>
      </div>
    </div>
  </dialog-window>
</template>

<script>
import Dialog from "@/components/Dialog";

export default {
  name: "Confirm",
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  watch:{
    value() {
      this.active = this.value;
    },
    active(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
    /* Обработка нажатия кнопки "Да" */
    agree() {
      this.$emit("agree");
    },
    /* Обработка нажатия кнопки "Нет" */
    disagree() {
      this.$emit("disagree");
    }
  },
  components: {
    "dialog-window": Dialog
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  max-width: 500px;
  min-width: 300px;

  &__buttons {
    margin-top: 15px;

    button:nth-child(1) {
      margin-right: 10px;
    }
  }
}
</style>