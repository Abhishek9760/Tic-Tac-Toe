<script>
  export let message;
</script>

<form on:submit|preventDefault>
  <input bind:value={message} type="text" />
  <button type="submit">Send</button>
</form>

<style>
  form {
    display: flex;
  }
  input[type="text"] {
    height: 2rem;
    width: 100%;
    font-family: inherit;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    color: "#eee";
    background: rgba(255, 255, 255, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.18);
    caret-color: rgba(0, 0, 0, 0.7);
  }

  input[type="text"]:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.9);
  }

  button {
    background: rgb(15 185 173 / 50%);
    box-shadow: 0 8px 32px 0 rgba(74, 74, 80, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    cursor: pointer;
    color: #fff;
    font-family: "Lobster Two", cursive;
    padding: 0 1rem;
    font-size: 1rem;
  }

  button:focus {
    outline: none;
    background-color: rgb(15 185 173 / 90%);
  }
</style>
