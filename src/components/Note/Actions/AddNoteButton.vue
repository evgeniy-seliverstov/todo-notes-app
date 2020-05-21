<template>
  <div @click="$emit('click')">
    <!-- Кнопка для открытия формы -->
    <div class="new-note note" title="Добавить новую заметку">
      <img src="@/assets/svg/add-big.svg" alt="Добавить">
    </div>

    <!-- Мобильный вид -->
    <div class="new-small-note">
      <img src="@/assets/svg/add-small.svg" alt="Добавить">
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNoteButton"
}
</script>

<style lang="scss" scoped>
.new-note {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0);
  border-style: dashed;
  border-color: $note-add-border-color;
  opacity: 0.5;

  &:hover {
    background-color: none;
    transform: none;
    opacity: 1;
  }
  
}
.new-small-note {
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: $note-add-small-color;
  transition: .15s ease;

  &:hover {
    background-color: $note-add-small-hover-color;
  }
}
.new-small-note {
  display: none;
}
@media screen and (max-width: 740px) {
  .new-small-note {
    display: flex;
  }
  .new-note {
    display: none;
  }
}
</style>