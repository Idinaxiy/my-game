<template>
  <div class="board__wrapper">
    <div class="board">
      <BoardItem
        v-for="field in fields"
        :key="'item ' + field.id"
        :field="field"
        :game-status="gameStatus"
        @selectField="selectField"
      />
    </div>

    <p class="difficult__text">
      Сложность <strong>{{ count }}</strong>
    </p>
    <p class="win" v-if="isWin">Поздравляю вы выйграли, играйте дальше!</p>
    <p class="fail" v-if="isFail">Вы проиграли попробуйте еще раз;)</p>

    <div class="btn-start">
      <button @click="start" :disabled="!canStartGame" class="btn">
        Start
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BoardItem from "./BoardItem.vue";
import useGameInit from "../store/useGameInit";
import useGameStart from "../store/useGameStart";
import useGameSelect from "../store/useGameSelect";
import { GAME_STATUS } from "../const";

const nums = 25;
const gameStatus = ref(GAME_STATUS.NONE);

const { count, fields, init } = useGameInit(nums);
const { start, canStartGame } = useGameStart(
  init,
  fields,
  count,
  nums,
  gameStatus
);
const { selectField, isWin, isFail, checkGame } = useGameSelect(
  fields,
  gameStatus,
  count,
  init,
  start
);
</script>

<style>
.board__wrapper {
  margin-bottom: 100px;
}
.board {
  width: 300px;
  background: #eee;
  margin: 0 auto;
}

.difficult__text {
  text-align: center;
  margin-top: 20px;
  color: #fff;
  font-weight: 500;
}

.btn-start {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.btn {
  background: #42b983cc;
  color: #fff;
  border-radius: 2px;
  padding: 10px 30px;
  margin: 10px 0;
  transition: 0.4s;
}
.btn:hover {
  background: #42b983;
}

.btn:disabled {
  opacity: 0.5;
}
.win {
  color: #42b983;
  text-align: center;
}

.fail {
  color: #ff0000;
  text-align: center;
}
</style>