<script>
  export let count;
</script>

<span on:click><p>{count ? count : ""}</p></span>

<style>
  span {
    position: absolute;
    top: 50%;
    right: 0;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    transform: translateX(50%);
    cursor: pointer;
    background: rgba(22, 138, 141, 1);
    border: 2px solid rgba(255, 255, 255, 1);
  }

  span p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
    color: #fff;
  }

  span::selection {
    background-color: transparent;
  }
  @media (max-width: 500px) {
    span {
      height: 40px;
      width: 40px;
    }
  }
</style>
