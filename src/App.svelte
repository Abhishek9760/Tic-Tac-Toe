<script>
  import Form from "./Form.svelte";
  import Dashboard from "./Dashboard.svelte";

  let submitted = false;
  let name = "";
  let roomCode = "";
  let ref;
  $: console.log(ref);

  function hideKeyboard(element) {
    element.setAttribute("readonly", "readonly"); // Force keyboard to hide on input field.
    element.setAttribute("disabled", "true"); // Force keyboard to hide on textarea field.
    setTimeout(function () {
      element.blur(); //actually close the keyboard
      // Remove readonly attribute after keyboard is hidden.
      element.removeAttribute("readonly");
      element.removeAttribute("disabled");
    }, 100);
  }
</script>

{#if submitted}
  <Dashboard {name} {roomCode} />
{:else}
  <Form
    bind:ref
    on:click={() => {
      hideKeyboard(ref);
      submitted = true;
    }}
    bind:name
    bind:roomCode
  />
{/if}
