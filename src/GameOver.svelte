<script>
  export let text;
</script>

<div class="backdrop">
  <div class="game-over">
    <h1>Game Over</h1>
    <button on:click>{text}</button>
  </div>
</div>

<style>
  h1 {
    font-weight: 300;
    letter-spacing: 0.8rem;
    margin-bottom: 2rem;
    line-height: 5rem;
    border-bottom: 1px solid rgb(145, 137, 229);
  }
  .backdrop {
    position: absolute;
    inset: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .game-over {
    text-transform: uppercase;
    padding: 25px;
    position: absolute;
    height: 250px;
    width: 100%;
    inset: 0;
    margin: auto;
    text-align: center;
    color: #fff;
    animation: gameOver 0.5s ease-in-out;
    background: rgba(37, 21, 208, 0.476);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  button {
    border: none;
    padding: 1rem 2rem;
    background-color: rgba(37, 21, 208, 0.758);
    color: #fff;
    border: 10px solid rgb(101, 90, 214);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  button:hover,
  button:focus {
    cursor: pointer;
    background-color: rgba(37, 21, 208, 0.758);
    border: 10px solid rgb(251, 251, 251);
    outline: none;
  }

  @keyframes gameOver {
    0% {
      transform: translateY(200%);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
