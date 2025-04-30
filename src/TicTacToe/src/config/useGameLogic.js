import { reactive, computed, ref, onMounted, onUpdated } from "vue";

export default function useGameLogic() {
  const history = ref([
    {
      squares: Array(9).fill(null),
      position: null
    }
  ]);
  const xIsNext = ref(true);
  const stepNumber = ref(0);
  const status = ref("");

  const current = computed(() => history.value[stepNumber.value]);
  const player = computed(() => (xIsNext.value ? "X" : "O"));
  const winner = computed(() => calculateWinner(current.value.squares));

  function onSquareSelection(event) {
    history.value = history.value.slice(0, stepNumber.value + 1);
    const squares = current.value.squares.slice();
    if (winner.value || squares[event.index]) return;

    squares[event.index] = player.value;
    history.value.push({
      squares: squares,
      position: getPosition(parseInt(event.index, 10))
    });

    stepNumber.value = history.value.length - 1;
    xIsNext.value = !xIsNext.value;
    updateStatus();
  }

  function updateStatus() {
    if (winner.value) {
      status.value = `Player ${winner.value} won!`;
    } else {
      status.value = "Next player: " + player.value;
    }
  }

  function moveTo(step) {
    stepNumber.value = step;
    xIsNext.value = step % 2 === 0;
    updateStatus();
  }

  onMounted(updateStatus);
  onUpdated(updateStatus);

  return {
    history,
    stepNumber,
    current,
    player,
    winner,
    status,
    onSquareSelection,
    moveTo
  };
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getPosition(i) {
  let row, col;
  if (i > 5) {
    row = 3;
    col = i - 5;
  } else if (i > 2) {
    row = 2;
    col = i - 2;
  } else {
    row = 1;
    col = i + 1;
  }
  return { row, col };
}
