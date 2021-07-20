<script>
  export let text;
  export let dir = "left";
</script>

<span class:left={dir === "left"} class:right={dir === "right"}>
  <p>{text}</p>
</span>

<style>
  .left {
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    animation: slideInLeft 0.5s ease-out;
    left: 0;
  }
  .right {
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    animation: slideInRight 0.5s ease-out;
    right: 0;
  }
  span {
    position: absolute;
    z-index: 100;
    width: 150px;
    height: 50px;
    display: grid;
    place-items: center;
    background: rgba(55, 42, 202, 0.476);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  span p {
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @media (max-width: 500px) {
    span {
      width: 100px;
    }
  }
</style>
