<template>
  <div>
    <div class="detail__footer">
      <button class="btn blue" @click.prevent="openCancelUpdateDialog">Назад</button>
      <button class="btn success" :class="{disabled: !changes}" @click.prevent="updateNote">Сохранить</button>
      <button class="btn error" @click.prevent="openDeleteNoteDialog">Удалить</button>
    </div>

    <!-- Диалоговое окно для подтверждения удаления заметки -->
    <confirm
      v-model="deleteNoteDialog"
      title="Удалить выбранную заметку?"
      @disagree="closeDeleteNoteDialog"
      @agree="deleteNote"
    />

    <!-- Диалоговое окно для подтверждения отмены редактирования -->
    <confirm
      v-model="cancelUpdateDialog"
      title="Есть несохраненные изменения. Вы уверены, что хотите отменить редактирование?"
      @disagree="closeCancelUpdateDialog"
      @agree="cancelUpdate"
    />
  </div>
</template>

<script>
import Confirm from "@/components/Confirm";

export default {
  name: "FooterDetail",
  props: {
    noteId: {
      type: Number,
      required: true
    },
    changes: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      deleteNoteDialog: false,    // модальное окно для подтверждения удаления заметки
      cancelUpdateDialog: false,  // модальное окно для подтверждения отмены редактирования
    }
  },
  methods: {
    /* Диалоговое окно для подтверждения отмены редактирования */
    openCancelUpdateDialog() {
      if (!this.changes) {
        this.$router.push("/");
      } else {
        this.cancelUpdateDialog = true;
      }
    },
    closeCancelUpdateDialog() {
      this.cancelUpdateDialog = false;
    },
    cancelUpdate() {
      this.$router.push("/");
    },

    /* Диалоговое окно для подтверждения удаления заметки */
    openDeleteNoteDialog() {
      this.deleteNoteDialog = true;
    },
    closeDeleteNoteDialog() {
      this.deleteNoteDialog = false;
    },
    deleteNote() {
      this.$store.commit("deleteNoteById", this.noteId);
      this.$router.push("/");
    },

    /* Сохранение изменений заметки (родителю) */
    updateNote() {
      this.$emit("updateNote");
    }
  },
  components: {
    Confirm
  }
}
</script>

<style lang="scss" scoped>
.detail__footer {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-top: 1px solid $note-border-color;
  flex-wrap: wrap;

  button {
    flex: auto;
  }

  button:not(:last-child) {
    margin-right: 10px;
  }
  
  @media screen and (max-width: 450px) {
    button:not(:last-child) {
      margin-right: 0;
      margin-bottom: 10px;
    }

    button:first-child {
      margin-right: 10px;
    }

    button:last-child {
      width: 100%;
    }
  }
}
</style>