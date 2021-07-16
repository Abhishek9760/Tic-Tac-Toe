<script>
  import Button from "./Button.svelte";
  import Toast from "./Toast.svelte";
  import GameOver from "./GameOver.svelte";
  import marks, { socket } from "./store";
  import { onMount } from "svelte";

  let winner = null;
  let tie = false;
  let roomCode = prompt("room name?");
  let player = {
    // name: ,
    roomCode: "myroom",
    symbol: "X",
    turn: false,
  };
  let winnerName;
  let userCount = 1;

  $: console.log(userCount);

  onMount(() => {
    // JOINING ROOM
    socket.emit("join-room", roomCode);
    socket.emit("get-users-count");
    // GETTING MARKERS
    socket.on("get-data", () => {
      socket.emit("marks-list", $marks);
    });

    // GETTING USERS COUNT
    socket.on("updated-users-count", (count) => {
      console.log(userCount);
      userCount = count;
    });

    // UPDATED MARKERS
    socket.on("updated-marks", (newMarks) => marks.setMarks(newMarks));

    // GETTING TURN
    socket.emit("get-player", player);
    socket.on("updated-player", (p) => {
      player = p;
    });

    // SENDING WINNER
    socket.on("get-winner", (win) => (winner = win));

    // RESET GAME
    socket.on("reset-game", reset);
    // TIE
    socket.on("tie-game", () => (tie = true));

    //  WINNER'S NAME
    socket.on("name", (name) => (winnerName = name));
  });

  const getSymbol = () => (player.symbol === "X" ? "O" : "X");

  const nextTurn = (i) => {
    if (!player.turn || $marks[i] === "X" || $marks[i] === "O") {
      return;
    }
    player.turn = false;
    player.symbol = getSymbol();
    socket.emit("get-player", player);
    marks.addMarker(player.symbol, i);
    socket.emit("marks-list", $marks);
    winner = marks.checkWin();
    if (winner) {
      socket.emit("get-name");
      socket.emit("winner", winner);
    }
    tie = marks.checkTie();
    if (tie) {
      socket.emit("tie");
    }
  };

  const reset = () => {
    winner = null;
    tie = false;
    marks.clear();
  };
</script>

<svelte:component this={Toast} dir="right" text={`Joined: ${userCount}`} />
<svelte:component
  this={tie || winner ? null : Toast}
  text={player.turn ? `Your turn ${getSymbol()}` : "Waiting..."}
/>
<svelte:component this={tie ? Toast : null} text="Game Tie!" />
<svelte:component this={winner ? Toast : null} text={`${winnerName} wins!`} />
<div class="container">
  <div class="blocks">
    {#each $marks as mark, i}
      <div class="block" id={i + 1} on:click={() => nextTurn(i)}>
        <Button text={mark} />
      </div>
    {/each}
  </div>
</div>
{#if winner || tie}
  <GameOver
    on:click={() => {
      socket.emit("newgame");
      reset();
    }}
    text="Continue"
  />
{/if}

<style>
  .container {
    border-radius: 10px;
    height: 70%;
    width: 500px;
  }

  .blocks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: 100%;
    padding: 20px;
    grid-gap: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 1em;
    backdrop-filter: blur(8px);
    border: solid 2px rgba(255, 255, 255, 0.15);
    background-clip: padding-box;
  }

  .block {
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1em;
    color: white;
    backdrop-filter: blur(8px);
    border: solid 2px rgba(255, 255, 255, 0.3);
    background-clip: padding-box;
  }

  .block:hover,
  .block:focus {
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
  @media (max-width: 500px) {
    .blocks {
      padding: 5px;
      grid-gap: 5px;
    }

    .container {
      width: 90%;
      height: 50%;
    }
  }
</style>
