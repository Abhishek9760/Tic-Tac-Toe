<script>
  import { socket } from "./store";
  import { onMount } from "svelte";
  export let name;
  let toggle = true;
  let message = "";
  let messages = [];

  onMount(() => {
    socket.on("messageFromServer", (message) => {
      console.log(message, name);
      messages = [...messages, message];
    });

    socket.on("getHis", () => {
      console.log("getHis");
      socket.emit("messages", messages);
    });

    socket.on("getMsgs", (data) => {
      console.log("data is", data);
      messages = data;
    });
  });

  const addMessage = () => {
    socket.emit("newMessage", { message, from: name });
    message = "";
  };

  const toggleDrawer = () => (toggle = !toggle);
</script>

<div class="chat" class:open={toggle}>
  <div class="container">
    <ul>
      {#each messages as message}
        <li class:recieve={message.from === name}>
          <p class:right={message.from === name}>{message.message}</p>
        </li>
      {/each}
    </ul>
    <span on:click={toggleDrawer} />
    <form on:submit|preventDefault={addMessage}>
      <input bind:value={message} type="text" />
      <button type="submit">Send</button>
    </form>
  </div>
</div>

<style>
  .chat {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    padding: 10px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    transition: all 0.5s cubic-bezier(0.47, 0.01, 0, 1.01);
    transform: translateX(-100%);
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }

  .open {
    transform: translateX(0);
  }

  form {
    display: flex;
  }

  span {
    position: absolute;
    top: 50%;
    right: 0;
    height: 50px;
    width: 50px;
    background-color: rgb(21, 243, 246);
    border-radius: 50%;
    transform: translateX(50%);
    cursor: pointer;
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 5px solid rgba(255, 255, 255, 0.669);
  }

  .right {
    margin-left: auto;
  }

  input[type="text"] {
    height: 2rem;
    width: 100%;
    font-family: inherit;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    color: "#eee";
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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
  ul {
    padding: 0;
    list-style: none;
    overflow-y: auto;
    height: 399px;
  }
  .recieve {
    border-radius: 15px 0 15px 15px;
  }

  li {
    background: rgba(198, 231, 222, 0.45);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: inherit;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 10px;
    display: flex;
    max-height: 100px;
    overflow-y: auto;
    border-radius: 0 15px 15px 15px;
  }

  li:not(:last-child) {
    margin-bottom: 10px;
  }

  p {
    max-width: 16ch;
    font-size: 1rem;
  }
</style>
