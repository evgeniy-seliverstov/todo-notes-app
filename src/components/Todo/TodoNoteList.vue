<template>
  <div class="todos">
    <div class="todos__item" v-for="todo in todos" :key="todo.id">
      <input type="checkbox" disabled class="todos__checkbox" :checked="todo.completed">
      <span class="todos__text" :class="{completed: todo.completed}">{{todo.text}}</span>
    </div>
    <div class="todos__ellipsis" v-if="count > 3">
      ...
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoNoteList",
  props: {
    count: {
      type: Number,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.todos {
  text-align: left;

  .todos__item {
    display: flex;
    align-items: center;
    line-height: 30px;
    white-space: nowrap;

    .todos__text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      
    }

    .completed {
      text-decoration: line-through;
    }
  }

  &__ellipsis {
    padding-left: 5px;
  }
}
</style>