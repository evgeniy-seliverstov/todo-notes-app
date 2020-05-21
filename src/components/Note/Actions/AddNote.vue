<template>
  <div class="add-note">
    <div class="add-note__title">Добавить заметку</div>
    <div class="add-note__form">
      <form>
        <label for="title">
          <span class="add-note__label">Заголовок:</span>
          <div class="add-note__input">
            <input v-model="title" type="text" name="title" autocomplete="off"/>
            <span class="add-note__help">{{help}}</span>
          </div>
        </label>
        <button @click.prevent="addNote" :class="{disabled: !allowAdd}" class="btn success add-note-btn">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
import validateMixin from "@/mixins/validate";

export default {
  name: "addNote",
  data() {
    return {
      title: "",
      help: "",
      allowAdd: false,
      titleValidate: [
        v => v.length > 0 || "Заголовок не может быть пустым",
        v => v.length <= 30 || "Заголовок не должен превышать 30 символов"
      ]
    }
  },
  watch: {
    title() {
      this.validTitle();
    }
  },
  methods: {
    /* Добавление заметки */
    addNote() {
      this.validTitle()
      if (this.allowAdd) {
        this.$store.commit("addNote", this.title);
        this.title = "";
        this.$emit("addedNote");
      }
    },

    /* Валидация инпута */
    validTitle() {
      let res = this.validate(this.title, this.titleValidate);      
      if (res.length > 0) {
        this.help = res;
        this.allowAdd = false;
      } else {
        this.help = "";
        this.allowAdd = true;
      }
    }
  },
  mixins: [validateMixin]
}
</script>

<style lang="scss" scoped>
.add-note {
  max-width: 300px;
  width: 100%;
  
  &__title {
    font-size: 18px;
  }

  &__form {
    margin-top: 15px;

    .add-note__input {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;

      .add-note__help {
        margin-top: 3px;
        max-width: 190px;
        color: #ec0f0f;
        text-align: left;
        font-size: 12px;
      }

      input {
        padding: 0 10px;
        height: 24px;
        border-radius: 3px;
        border: 1px solid $note-add-border-color;
        font-size: 14px;

        &:focus {
          outline: none;
        }
      }
    }

    .add-note-btn {
      margin-top: 15px;
    }
  }
}
</style>