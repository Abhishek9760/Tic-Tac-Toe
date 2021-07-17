<script>
  export let name = "";
  export let roomCode = "";
  import { fade } from "svelte/transition";
</script>

<div class="form" transition:fade>
  <h1>Tic Tac Toe</h1>
  <div class="wrapper">
    <div class="text">
      <label for="name">NAME</label>
      <input
        bind:value={name}
        type="text"
        id="name"
        autocapitalize="off"
        autocomplete="off"
      />
    </div>
    <div class="text">
      <label for="room">ROOM CODE</label>
      <input
        bind:value={roomCode}
        type="text"
        id="room"
        autocapitalize="off"
        autocomplete="off"
      />
    </div>
    <button on:click>JOIN</button>
  </div>
</div>

<style>
  h1 {
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 2rem;
    letter-spacing: 1.5px;
    font-family: "Lobster Two", cursive;
    /* animation: flicker 3s infinite alternate; */
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa,
      0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa;
  }
  .form {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 10px;
    position: absolute;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    min-height: 100px;
    width: 500px;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1em;
    border: solid 2px rgba(255, 255, 255, 0.3);
    background-clip: padding-box;
  }

  label {
    color: #fff;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  input {
    border: none;
    height: 2rem;
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    color: "#eee";
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  input:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.9);
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
  }

  button {
    align-self: center;
    padding: 0.4rem 2rem;
    background: rgb(15 185 173 / 50%);
    box-shadow: 0 8px 32px 0 rgba(74, 74, 80, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 1em;
    border: 1px solid rgba(255, 255, 255, 0.18);
    cursor: pointer;
    color: #fff;
    font-family: "Lobster Two", cursive;
  }

  button:focus {
    outline: none;
    background-color: rgb(15 185 173 / 90%);
  }

  @media (max-width: 500px) {
    .wrapper {
      width: 100%;
    }
  }
</style>
