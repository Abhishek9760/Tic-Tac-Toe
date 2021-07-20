<script>
  export let text = "";
</script>

<span class="noselect" style={`color: ${text === "X" ? "#F49097" : "#F5E960"}`}
  >{text}</span
>

<style>
  span {
    font-size: 3rem;
    font-weight: 700;
  }
</style>
