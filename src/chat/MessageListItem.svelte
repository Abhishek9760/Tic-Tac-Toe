<script>
  export let message;
  export let name;
  import { fly } from "svelte/transition";
</script>

<li
  transition:fly={{ x: message.from === name ? 100 : -100 }}
  class:recieve={message.from === name}
>
  <p>{message.message}</p>
</li>

<style>
  .recieve {
    border-radius: 15px 0 15px 15px;
    background-color: rgb(198, 231, 222);
  }

  li {
    background: #fff;
    padding: 10px;
    display: flex;
    max-height: 100px;
    overflow-y: auto;
    word-break: break-all;
    border-radius: 0 15px 15px 15px;
  }

  li:not(:last-child) {
    margin-bottom: 10px;
  }

  p {
    max-width: 16ch;
    font-size: 1rem;
  }
  @media (max-width: 500px) {
    p {
      font-size: 0.8rem;
    }
  }
</style>
