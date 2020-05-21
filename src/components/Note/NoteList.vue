<template>
  <div>
    <transition-group name="scale" tag="div" class="note-list">
      <!-- Список заметок -->
      <note-item v-for="note in notes" :key="note.id" :note="note" class="note" @openDeleteDialog="openDeleteNoteDialog(note)" />
      
      <!-- Добавление новой заметки -->
      <add-note-button @click="openAddDialog" key="addNote" v-if="notes.length < maxCountNotes"/>
    </transition-group>

    <!-- Диалоговое окно с формой добавления -->
    <dialog-window v-model="addDialog">
      <add-note @addedNote="closeAddDialog" />
    </dialog-window>

    <!-- Диалоговое окно для подтверждения удаления -->
    <confirm v-model="deleteNoteDialog" title="Удалить выбранную заметку?" @disagree="closeDeleteNoteDialog" @agree="deleteNote"/>
  </div>
</template>

<script>
import NoteItem from "@/components/Note/NoteItem";
import AddNoteButton from "@/components/Note/Actions/AddNoteButton";
import Dialog from "@/components/Dialog";
import AddNote from "@/components/Note/Actions/AddNote";
import Confirm from "@/components/Confirm";

export default {
  name: "NoteList",
  data() {
    return {
      deletedNote: null,
      maxCountNotes: 50,
      deleteNoteDialog: false,
      addDialog: false
    }
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {
    /* Открытие и закрытие модального окна для добавления заметки */
    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },


    /* Удаление заметки */
    openDeleteNoteDialog(note) {
      this.deletedNote = note;
      this.deleteNoteDialog = true;
    },
    closeDeleteNoteDialog() {
      this.deleteNoteDialog = false;
    },
    deleteNote() {
      this.$store.commit("deleteNote", this.deletedNote);
      this.closeDeleteNoteDialog();
    }
  },
  components: {
    NoteItem,
    AddNoteButton,
    "dialog-window": Dialog,
    AddNote,
    Confirm
  }
}
</script>

<style lang="scss">
.note-list {
  display: flex;
  flex-flow: row wrap;
  max-width: 1000px;
    
  @media screen and (max-width: 1040px) {
    max-width: 700px;
  }

  @media screen and (max-width: 740px) {
    max-width: 500px;
  }

  @media screen and (max-width: 540px) {
    width: 100%;
    justify-content: center;
  }
}

.scale-enter-active, .scale-leave-active {
  transition: all .5s;
}
.scale-enter, .scale-leave-to {
  transform: scale(0);
}
</style>