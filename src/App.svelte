<script>
  import Form from "./Form.svelte";
  import Dashboard from "./Dashboard.svelte";

  let submitted = false;
  let name = "";
  let roomCode = "";
</script>

{#if submitted}
  <Dashboard {name} {roomCode} />
{:else}
  <Form
    on:click={() => {
      if (roomCode.trim().length && name.trim().length) {
        submitted = true;
      }
    }}
    bind:name
    bind:roomCode
  />
{/if}
