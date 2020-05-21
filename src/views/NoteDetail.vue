<template>
  <div class="detail" v-if="note.id != null">

    <!-- Хедер заметки -->
    <header-detail
      :title="note.title"
      :historyLength="history.length"
      :canceledHistoryLength="canceledHistory.length"
      @undo="undo"
      @redo="redo"
      @saveTitle="saveTitle"
    />

    <!-- Список задач -->
    <div class="detail__content">
      <div class="detail__todos" v-if="note.todos.length">
        <todo-item v-for="todo in note.todos" :key="todo.id" :todo="todo" @deleteTodo="openDeleteDialog(todo)" @changeTodo="changeTodo"/>
      </div>
      <div v-if="note.todos.length < maxCountTodos" class="detail__add-todo">
        <button class="btn success add-task-btn" @click.prevent="addTodo" title="Добавить задачу">
          <img src="@/assets/svg/add-small.svg" alt="Добавить задачу">
        </button>
      </div>
    </div>

    <!-- Футер заметки -->
    <footer-detail :noteId="note.id" :changes="changes" @updateNote="updateNote"/>

    <!-- Диалоговое окно для подтверждения удаления задачи -->
    <confirm
      v-model="deleteTodoDialog"
      title="Удалить выбранную задачу?"
      @disagree="closeDeleteDialog"
      @agree="deleteTodo"
    />
  </div>
</template>

<script>
import TodoItem from "@/components/Todo/TodoItem";
import Dialog from "@/components/Dialog";
import Confirm from "@/components/Confirm";
import HeaderDetail from "@/components/NoteDetail/HeaderDetail";
import FooterDetail from "@/components/NoteDetail/FooterDetail";

export default {
  name: "NoteDetail",
  data() {
    return {
      note: {
        id: null,
        title: "",
        todos: []
      },
      deleteTodoDialog: false,    // модальное окно для подтверждения удаления задачи в заметке
      deletedTodo: null,          // удаляемая задача

      maxCountTodos: 50,  // максимальное кол-во задач
      startNote: null,    // начальное значение заметки
      changes: false,     // произошли ли изменения,

      history: [],        // история изменений
      canceledHistory: []
    }
  },
  watch: {
    note: {
      deep: true,
      handler(val, oldVal) {
        this.changes = this.compare();
      }
    },
  },
  created() {
    let note = this.$store.getters.getNoteById(this.$route.params.id);
    if (!note) {
      this.$router.push("/");
    } else {
      this.note = JSON.parse(JSON.stringify(note));
      this.startNote = JSON.parse(JSON.stringify(note));
    }
  },
  mounted() {
    document.addEventListener("keyup", this.keyup);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.keyup);
  },
  methods: {
    /* Изменение заголовка заметки */
    saveTitle(newTitle) {
      this.addToHistory();
      this.note.title = newTitle;
    },

    /* Добавление задачи в заметку */
    addTodo() {
      this.note.todos.push({
        id: this.note.todos.length > 0 ? this.note.todos[this.note.todos.length - 1].id + 1 : 0,
        text: "",
        completed: false
      });
    },

    /* Изменение задачи */
    changeTodo() {
      this.addToHistory();
    },

    /* Удаление задачи из заметки */
    openDeleteDialog(todo) {
      this.deletedTodo = todo;
      this.deleteTodoDialog = true;
    },
    closeDeleteDialog() {
      this.deleteTodoDialog = false;
    },
    deleteTodo() {
      if (this.deletedTodo) {
        this.addToHistory();
        this.note.todos.splice(this.note.todos.indexOf(this.deletedTodo), 1);
      }
      this.closeDeleteDialog();
    },

    /* Сравнение начальной заметки и текущей */
    compare() {
      if (this.note.todos.length != this.startNote.todos.length)
        return true;
      let f = false;
      this.note.todos.forEach((v, i) => {
        if (!f && (v.id != this.startNote.todos[i].id || v.text != this.startNote.todos[i].text || v.completed != this.startNote.todos[i].completed)) {
          f = true;
        }
      });
      if (f) return true;
      return this.note.title != this.startNote.title;
    },
    /* Сохранение изменений заметки */
    updateNote() {
      if (this.changes) {
        this.note.todos = this.note.todos.filter(v => v.text != "");  // удаление незаполненных задач

        this.startNote = JSON.parse(JSON.stringify(this.note));
        this.changes = false;

        this.history = [];            // очищаем историю
        this.canceledHistory = [];

        this.$store.commit("updateNote", JSON.parse(JSON.stringify(this.note)));
      }
    },

    /* Работа с историей изменений */
    addToHistory() {
      let note = { ...this.note };
      note.todos = note.todos.filter(v => v.text != "");

      this.canceledHistory = [];
      this.history.push(JSON.parse(JSON.stringify(note)));
    },
    addToCanceledHistory() {
      this.canceledHistory.push(JSON.parse(JSON.stringify(this.note)));
    },
    undo() {
      if (this.history.length > 0) {
        this.addToCanceledHistory();
        this.note = this.history.splice(this.history.length - 1, 1)[0];
      }
    },
    redo() {
      if (this.canceledHistory.length > 0) {
        this.history.push(JSON.parse(JSON.stringify(this.note)));
        this.note = this.canceledHistory.splice(this.canceledHistory.length - 1, 1)[0];
      }
    },
    
    /* Функция обработки клавиш */
    keyup(e) {
      if(e.keyCode == 90 && e.ctrlKey && !e.shiftKey)
        this.undo();
      else if (e.keyCode == 90 && e.ctrlKey && e.shiftKey)
        this.redo();
    }
  },
  components: {
    TodoItem,
    "dialog-window": Dialog,
    Confirm,
    HeaderDetail,
    FooterDetail
  }
};
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  min-height: 500px;
  max-width: 500px;
  width: 100%;
  background: $note-bg-color;
  border: 1px solid $note-border-color;
  border-radius: 10px;

  &__content {
    flex-grow: 1;
    padding-bottom: 30px;

    .add-task-btn {
      width: 48px;
      height: 48px;
      padding: 0;
      border-radius: 100%;
    }
  }

  &__todos {
    padding: 30px 20px 0;
  }

  &__add-todo {
    display: flex;
    justify-content: flex-end;
    padding: 30px 20px 0;
  }
}
</style>
