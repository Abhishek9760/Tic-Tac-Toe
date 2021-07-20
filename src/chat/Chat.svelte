<script>
  import { socket } from "../store";
  import { onMount } from "svelte";
  import Form from "./Form.svelte";
  import MessagesList from "./MessagesList.svelte";
  import DrawerButton from "./DrawerButton.svelte";
  export let name;
  let toggle = false;
  let message = "";
  let messages = [];
  let list;
  let count = 0;

  onMount(() => {
    socket.on("messageFromServer", (message) => {
      if (!toggle) {
        count++;
      }
      messages = [...messages, message];
      setTimeout(() => (list.scrollTop = list.scrollHeight));
    });

    socket.on("getHis", () => {
      socket.emit("messages", messages);
    });

    socket.on("getMsgs", (data) => {
      if (!toggle) {
        count = data.length;
      }
      messages = data;
      setTimeout(() => (list.scrollTop = list.scrollHeight));
    });
  });

  const addMessage = () => {
    if (message.trim().length) {
      socket.emit("newMessage", { message, from: name });
      message = "";
    }
  };

  const toggleDrawer = () => {
    count = 0;
    toggle = !toggle;
  };
</script>

{#if toggle}
  <div class="backdrop" on:click />
{/if}
<div class="chat" class:shadow={!toggle && count > 0} class:open={toggle}>
  <div class="container">
    <MessagesList {name} {messages} bind:list />
    <DrawerButton {count} on:click={toggleDrawer} />
    <Form on:submit={addMessage} bind:message />
  </div>
</div>

<style>
  .shadow {
    box-shadow: 1px 0 0 0 rgb(22 138 141);
  }
  .chat {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    padding: 10px;
    background: rgb(29 91 108);
    transition: all 0.5s cubic-bezier(0.47, 0.01, 0, 1.01);
    transform: translateX(-100%);
    max-width: 75%;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    padding-right: 20px;
  }

  .open {
    transform: translateX(0);
  }

  @media (max-width: 500px) {
    .chat {
      max-width: 85%;
    }
  }
</style>
