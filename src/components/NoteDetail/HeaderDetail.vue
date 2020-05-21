<template>
  <div class="detail__header">
    <div class="detail__title" title="Изменить заголовок" @click="changeTitle">
      <template v-if="!changingTitle">
        {{title}}
      </template>
      <input v-else type="text" v-model="changingValueTitle" @blur="saveTitle" @keyup.enter="saveTitle">
    </div>
    <div class="detail__history-buttons">
      <button class="btn-history" :class="{disabled: !historyLength}" @click.prevent="undo" title="Отменить изменение">
        <img src="@/assets/svg/history-back.svg" alt="Вперед">
      </button>
      <button class="btn-history" :class="{disabled: !canceledHistoryLength}" @click.prevent="redo" title="Вернуть изменение">
        <img src="@/assets/svg/history-forward.svg" alt="Назад">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderDetail",
  props: {
    title: {
      type: String,
      required: true
    },
    historyLength: {
      type: Number,
      required: true
    },
    canceledHistoryLength: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      changingTitle: false,       // изменяем ли заголовок прямо сейчас
      changingValueTitle: null,   // изменяемое значение
    }
  },
  watch: {
    /* Следим, чтобы не было более 30 символов (не даем пользователю ошибиться) */
    changingValueTitle(val, oldVal) {
      if (val.length > 30)
        this.changingValueTitle = oldVal;
    }
  },
  created() {
    this.changingValueTitle = this.title;
  },
  methods: {
    /* Изменение заголовка */
    changeTitle() {
      this.changingTitle = true;
    },
    saveTitle() {
      if (this.changingValueTitle != "") {
        if (this.changingValueTitle != this.title)
          this.$emit("saveTitle", this.changingValueTitle);
        this.changingTitle = false;
      }
    },

    /* Работа с историей изменений */
    undo() {
      this.$emit("undo");
    },
    redo() {
      this.$emit("redo");
    }
  }
}
</script>

<style lang="scss">
.detail__header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  position: relative;
  border-bottom: 1px solid $note-border-color;

  .detail__title {
    font-size: 18px;
    font-weight: bold;
    color: $title-color;
    max-width: 75%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  input {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    border-radius: 5px;
    border: 1px solid #929292;
    outline: none;
    overflow: visible;
  }

  .detail__history-buttons {
    position: absolute;
    right: 20px;


    .btn-history {
      background: rgba(0, 0, 0, 0);
      border: none;
      outline: none;
      cursor: pointer;

      &.disabled {
        cursor: auto;
        opacity: .4;
      }
    }
  }
}
</style>