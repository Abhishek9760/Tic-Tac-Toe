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
  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
