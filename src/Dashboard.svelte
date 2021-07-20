<script>
  import Button from "./Button.svelte";
  import { fade } from "svelte/transition";
  import Toast from "./Toast.svelte";
  import GameOver from "./GameOver.svelte";
  import marks, { socket } from "./store";
  import { onMount } from "svelte";
  import Chat from "./chat/Chat.svelte";
  import { scale } from "svelte/transition";

  export let name;
  export let roomCode;
  let winner = null;
  let tie = false;
  let player = {
    symbol: "X",
    turn: false,
  };
  let winnerName;
  let userCount = 1;
  let blocks;
  let clink = new Audio("/sounds/clink.mp3");

  onMount(() => {
    // socket = io("https://fathomless-stream-20577.herokuapp.com/", {
    // query: { name },
    // });
    // socket.close();
    // JOINING ROOM
    socket.emit("join-room", roomCode);

    // GET USERS COUNT
    socket.emit("get-users-count");

    // GETTING MARKERS
    socket.on("get-data", () => {
      socket.emit("marks-list", $marks);
    });

    // GETTING USERS COUNT
    socket.on("updated-users-count", (count) => {
      userCount = count;
    });

    // UPDATED MARKERS
    socket.on("updated-marks", (newMarks) => {
      let i = findDifferenceIndex(newMarks, $marks);
      if (i !== -1) {
        clink.play();
        changeBg();
        changeBg(i);
        marks.setMarks(newMarks);
      }
    });

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
    socket.emit("history", roomCode);
  });

  const findDifferenceIndex = (newArr, oldArr) => {
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] !== oldArr[i]) {
        return i;
      }
    }
    return -1;
  };

  const getSymbol = () => (player.symbol === "X" ? "O" : "X");

  const nextTurn = (i) => {
    if (!player.turn || $marks[i] === "X" || $marks[i] === "O") {
      return;
    }
    changeBg();
    changeBg(i);
    clink.play();
    player.turn = false;
    player.symbol = getSymbol();
    socket.emit("get-player", player);
    marks.addMarker(player.symbol, i);
    socket.emit("marks-list", $marks);
    winner = marks.checkWin();
    if (winner) {
      socket.emit("get-name", name);
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
    changeBg();
    marks.clear();
  };

  const changeBg = (id) => {
    if (id !== undefined) {
      blocks.children[id].style.background = "rgb(1 4 23 / 68%)";
    } else {
      for (let block of blocks.children) {
        block.style.background = "rgba(255, 255, 255, 0.3)";
      }
    }
  };
</script>

<svelte:component this={Toast} dir="right" text={`Joined: ${userCount}`} />
<svelte:component
  this={tie || winner ? null : Toast}
  text={player.turn ? `Your turn ${getSymbol()}` : "Waiting..."}
/>
<svelte:component this={tie ? Toast : null} text="Game Tie!" />
<svelte:component this={winner ? Toast : null} text={`${winnerName} wins!`} />
<Chat {name} />
<div class="container" transition:fade>
  <div class="blocks" bind:this={blocks}>
    {#each $marks as mark, i}
      <div transition:scale class="block" on:click={() => nextTurn(i)}>
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
    z-index: 1;
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
    border: solid 2px rgba(255, 255, 255, 0.15);
  }

  .block {
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1em;
    color: white;
    border: solid 2px rgba(255, 255, 255, 0.3);
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
