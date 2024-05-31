<template>
  <div :class="getBoardItemClasses" @click="select"></div>
</template>

<script setup>
import { computed } from "vue";
import { FIELD, GAME_STATUS } from "../const";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  gameStatus: {
    type: Number,
    default: GAME_STATUS.NONE,
  },
});

const emit = defineEmits(["selectField"]);

const getBoardItemClasses = computed(() => {
  let classes = "item ";
  if (
    (props.field.value === FIELD.FILLED &&
      props.gameStatus === GAME_STATUS.PREVIEW) ||
    (props.field.click && props.field.value === FIELD.FILLED)
  ) {
    classes += " active";
  }

  if (props.field.click && props.field.value === FIELD.EMPTY) {
    classes += " error";
  }
  return classes;
});

const select = () => {
  if (props.gameStatus === GAME_STATUS.STARTED) {
    emit("selectField", props.field.id);
  }
};
</script>

<style>
.item {
  position: relative;
  width: 50px;
  height: 50px;
  background: #ffffff;
  float: left;
  margin: 5px;
  cursor: pointer;
  display: inline-block;
  transition: 0.4s;
  transform-style: preserve-3d;
}

.item.active {
  background: #42b983cc;
  transform: rotate(180deg);
}

.item.error {
  background-color: #ff000055;
  transform: rotateX(180deg);
}
</style>