<template>
  <div>
    <h1>Tic Tac Toe (Vue.js)</h1>
    <div class="game">
      <div class="game-board">
        <Board :squares="current.squares" @squareSelection="onSquareSelection" />
      </div>
      <div class="game-info">
        <div>{{ status }}</div>
        <Moves :history="history" :currentStep="stepNumber" @move="(index) => moveTo(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import Moves from "./Moves.vue";
import useGameLogic from "../config/useGameLogic.js";

export default {
  name: "Game",
  components: {
    Board,
    Moves
  },
  setup() {
    return useGameLogic();
  }
};
</script>
