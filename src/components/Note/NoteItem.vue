<template>
  <div class="note" @click="openDetailNote">
    <div class="note__title">
      <!-- Заголовок -->
      <span :title="note.title">{{note.title}}</span>

      <!-- Кнопка удаления заметки (открывает диалоговое окно) -->
      <div class="note__delete" title="Удалить заметку" @click="openDeleteDialog">
        <img ref="deleteNote" src="@/assets/svg/delete.svg" alt="Удалить">
      </div>
    </div>

    <!-- Список из максимум 3 тудушек -->
    <div class="note__todos">
      <todo-note-list :todos="note.todos.slice(0, 3)" :count="note.todos.length" />
    </div>

    <!-- Если тудушек больше 3, то показываем троеточие -->
    <div class="note__footer">
      Выполнено {{completedTodos.length}}/{{note.todos.length}}
    </div>
  </div>
</template>

<script>
import TodoNoteList from "@/components/Todo/TodoNoteList";

export default {
  name: "NoteItem",
  props: {
    note: {
      type: Object,
      required: true,
      validator: ({id, title, todos}) => {
        return Number.isInteger(id) && !!title && Array.isArray(todos);
      }
    }
  },
  computed: {
    completedTodos() {
      return this.note.todos.filter(v => v.completed);
    }
  },
  methods: {
    /* Открытие диалогового окна */
    openDeleteDialog() {
      this.$emit("openDeleteDialog")
    },

    /* Переход на детальную страницу заметки */
    openDetailNote(e) {
      if (e.target != this.$refs.deleteNote) {
        this.$router.push(`/note/${this.note.id}`);
      }
    }
  },
  components: {
    TodoNoteList
  }
}
</script>

<style lang="scss">
.note {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  margin: 5px;
  width: calc(((1000px - 10px * 4) / 4 - 2px));
  min-width: 200px;
  height: 200px;
  background-color: $note-bg-color;
  border: 1px solid $note-border-color;
  border-radius: 20px;
  text-align: center;
  transition: .3s ease-in-out;
  color: $description-color;

  &:hover {
    cursor: pointer;
    background: $note-bg-hover-color;
    transform: scale(0.97);
  }

  &__title {
    position: relative;
    padding: 0 30px;
    line-height: 35px;
    height: 35px;
    border-bottom: 1px solid $note-border-color;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 18px;
    color: $title-color;
  }

  &__todos {
    padding: 15px 20px;
    height: 130px;
    overflow: hidden;
  }

  &__footer {
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    text-align: right;
    font-size: 14px;
  }

  &__delete {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 10px;
  }

  @media screen and (max-width: 1040px) {
    width: calc(((700px - 10px * 3) / 3 - 2px));
  }

  @media screen and (max-width: 740px) {
    width: calc(((500px - 10px * 2) / 2 - 2px));
  }

  @media screen and (max-width: 540px) {
    width: 100%;
    max-width: 300px;
  }
}
</style>