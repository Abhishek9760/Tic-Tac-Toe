<script>
  import Form from "./Form.svelte";
  import Dashboard from "./Dashboard.svelte";

  let submitted = false;
  let name = "";
  let roomCode = "";

  const submit = () => {
    if (roomCode.trim().length && name.trim().length) {
      submitted = true;
    }
  };
</script>

{#if submitted}
  <Dashboard {name} {roomCode} />
{:else}
  <Form on:submit={submit} bind:name bind:roomCode />
{/if}
