<script>
  export let list;
  export let messages;
  export let name;
  import MessageListItem from "./MessageListItem.svelte";
</script>

<ul bind:this={list}>
  {#each messages as message}
    <MessageListItem {name} {message} />
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    list-style: none;
    overflow-y: auto;
    height: 399px;
    overflow-x: hidden;
    margin-bottom: 10px;
  }
</style>
