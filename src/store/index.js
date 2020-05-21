import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* Список заметок */
    notes: [
      {
        id: 0,
        title: "Заметка с длинным названием",
        todos: [
          {
            id: 0,
            completed: true,
            text: "Выполнить задачу 1"
          },
          {
            id: 1,
            completed: false,
            text: "Выполнить задачу 2"
          },
          {
            id: 2,
            completed: false,
            text: "Выполнить задачу 3"
          },
        ]
      },
      {
        id: 1,
        title: "Сделать тестовое задание",
        todos: [
          {
            id: 0,
            completed: true,
            text: "Проектирование приложения"
          },
          {
            id: 1,
            completed: true,
            text: "Разработка"
          },
          {
            id: 2,
            completed: true,
            text: "Деплой"
          },
        ]
      },
      {
        id: 2,
        title: "Сходить в магазин",
        todos: [
          {
            id: 0,
            completed: false,
            text: "2л молока"
          },
          {
            id: 1,
            completed: false,
            text: "Буханка хлеба"
          },
          {
            id: 2,
            completed: false,
            text: "6 морковок"
          },
          {
            id: 3,
            completed: false,
            text: "Пачка гречки"
          },
          {
            id: 4,
            completed: false,
            text: "Маска"
          },
          {
            id: 5,
            completed: false,
            text: "Перчатки"
          },
          {
            id: 6,
            completed: false,
            text: "6 котлеток"
          },
          {
            id: 7,
            completed: false,
            text: "1кг курицы"
          },
          {
            id: 1,
            title: "Сделать тестовое задание",
            todos: [
              {
                id: 0,
                completed: true,
                text: "Проектирование приложения"
              },
              {
                id: 1,
                completed: true,
                text: "Разработка"
              },
              {
                id: 2,
                completed: true,
                text: "Деплой"
              },
            ]
          },
        ]
      },
      {
        id: 3,
        title: "Заметка 4",
        todos: [
          {
            id: 0,
            completed: true,
            text: "Задача 1"
          }
        ]
      },
      {
        id: 4,
        title: "Заметка 5",
        todos: [
          {
            id: 0,
            completed: false,
            text: "Задача 1"
          },
          {
            id: 1,
            completed: false,
            text: "Задача 2"
          },
          {
            id: 2,
            completed: false,
            text: "Задача 3"
          }
        ]
      },
    ]
  },
  getters: {
    /* Получение заметки по id */
    getNoteById: state => id => {
      return state.notes.find(note => note.id == id);
    },
  },
  mutations: {
    /* Установить список заметок (используется при первой загрузке страницы) */
    setNotes(state, notes) {
      state.notes = notes;
    },
    /* Добавить заметку */
    addNote(state, title) {
      state.notes.push({
        id: state.notes.length > 0 ? state.notes[state.notes.length - 1].id + 1 : 0,
        title,
        todos: []
      });
    },
    /* Удалить заметку */
    deleteNote(state, note) {
      state.notes.splice(state.notes.indexOf(note), 1);
    },
    /* Удалить заметку по id */
    deleteNoteById(state, id) {
      state.notes.splice(state.notes.findIndex(v => v.id == id), 1);
    },
    /* Изменить заметку */
    updateNote(state, note) {
      const index = state.notes.findIndex(v => v.id == note.id);
      state.notes.splice(index, 1, note);
    }
  },
  actions: {
    /* Получить список заметок из локального хранилища */
    getNotes({commit}) {
      let notes = JSON.parse(localStorage.getItem("notes"));
      if (notes != null)
        commit("setNotes", notes);
    },
    /* Установить список заметок в локальное хранилище */
    setNotesToLocalStorage({state}) {
      localStorage.setItem("notes", JSON.stringify(state.notes));
    }
  }
});
