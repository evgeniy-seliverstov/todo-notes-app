<template>
  <div class="todo">
    <!-- Чекбокс -->
    <div class="todo__checkbox">
      <input type="checkbox" v-model="todo.completed" name="check">
      <label for="check" @click="toggleCompleted"></label>
    </div>

    <!-- Текст задачи -->
    <div class="todo__text" :class="{completed: todo.completed}">
      <span @click="toggleCompleted" v-if="!changing">{{todo.text}}</span>
      <div v-else>
        <input type="text" v-model="changingValue" @keyup.enter="changeTodo">
        <span class="todo__help" v-if="changingHelp.length > 0">{{changingHelp}}</span>
      </div>
    </div>
    
    <!-- Кнопки редактирования задачи (редактировать, удалить) -->
    <div class="todo__buttons" :style="!changing ? '' : 'min-width: 155px;'">
      <button  v-if="changing" class="btn edit-agree success" :class="{disabled: !allowChange}" @click="changeTodo" title="Сохранить изменение">
        <img src="@/assets/svg/todo-check-agree.svg" alt="Сохранить изменение">
      </button>
      <button  v-if="changing" class="btn error edit-disagree" @click="closeChangingTodo" title="Отменить изменение">
        <img src="@/assets/svg/todo-check-disagree.svg" alt="Отменить изменение">
      </button>
      <button class="btn blue todo-edit-btn" v-if="!changing" @click="openChangingTodo" title="Изменить задачу" >
        <img src="@/assets/svg/todo-pencil.svg" alt="Изменить todo">
      </button>
      <button class="btn error todo-delete-btn" @click="deleteTodo" title="Удалить задачу"  :style="!changing ? '' : 'margin-right: 0'">
        <img src="@/assets/svg/todo-delete.svg" alt="Удалить todo">
      </button>
    </div>
  </div>
</template>

<script>
import validateMixin from "@/mixins/validate";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
      validator: ({id, text}) => {
        return Number.isInteger(id);
      }
    },
  },
  watch: {
    /* Валидация при вводе текста задачи */
    changingValue() {
      this.validateText();
    }
  },
  data() {
    return {
      changing: false,
      changingValue: "",
      changingHelp: "",
      allowChange: true,
      textValidate: [
        v => v.length > 0 || "Задача должна иметь описание",
        v => v.length <= 150 || "Описание не должно быть больше 150 символов"
      ]
    }
  },
  mounted() {
    /* Автоматическое открытие input для ввода при добавлении новой задачи */
    if (this.todo.text.length == 0) {
      this.changing = true;
    }
  },
  methods: {
    /* Изменение статуса задачи */
    toggleCompleted(e) {
      this.$emit("changeTodo");
      this.todo.completed = !this.todo.completed;
    },

    /* Удаление задачи */
    deleteTodo() {
      this.$emit("deleteTodo");
    },
    
    /* Изменение текста задачи */
    openChangingTodo() {
      this.changingValue = this.todo.text;
      this.changing = true;
    },
    closeChangingTodo() {
      if (this.todo.text != "") {
        this.changingValue = "";
        this.changing = false;
      } else {
        this.changingHelp = "Задача должна иметь описание";
      }
    },
    changeTodo() {
      this.validateText();
      this.$emit("changeTodo");
      if (this.allowChange) {
        this.todo.text = this.changingValue;
        this.changing = false;
      }
    },

    /* Валидация при вводе текста задачи */
    validateText() {
      let res = this.validate(this.changingValue, this.textValidate);
      if (res !== true) {
        this.changingHelp = res;
        this.allowChange = false;
      } else {
        this.changingHelp = "";
        this.allowChange = true;
      }
    }
  },
  mixins: [validateMixin]
}
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  font-size: 18px;

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  &__checkbox {
    padding: 10px 15px 4px 4px;

    input {
      display: none;
    }

    input:checked + label::before {
      background-image: url("../../assets/svg/todo-check.svg");
    }

    label {
      display: inline-flex;
      cursor: pointer;

      &::before {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid $note-add-border-color;
        border-radius: 4px;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }

  &__text {
    flex-grow: 1;
    margin-right: 20px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;

    .todo__help {
      display: inline-block;
      font-size: 14px;
      color: #fb6e6e;
    }

    span {
      padding-top: 7px;
      display: inline-block;
      width: 100%;
      cursor: pointer;
    }

    &.completed {
      span {
        text-decoration: line-through;

        &.todo__help {
          text-decoration: none;
        }
      }
    }

    input {
      display: inline-block;
      height: 38px;
      width: 100%;
      font-size: 18px;
      border-radius: 5px;
      border: 1px solid $note-add-border-color;
      outline: none;
      box-sizing: border-box;
      overflow: visible;
    }
  }

  &__edit-buttons {
    margin-right: 10px;
    min-width: 100px;
  }

  &__buttons {
    min-width: 100px;
  }

  button {
    max-height: 45px;
    padding: 10px 15px;

    &.edit-agree, &.edit-disagree, &.todo-edit-btn {
      margin-right: 10px;
    }

    &.edit-agree {
      &:not(.success) {
        cursor: auto;
      }
    }
  }

  @media screen and (max-width: 520px) {
    flex-wrap: wrap;

    &__text {
      margin-right: 0;
    }

    &__buttons {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>