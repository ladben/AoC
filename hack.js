function a () {
  const s = document.createElement('style');
  s.innerHTML = `
  #h {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000000000000;
  }

  #h.closed {
    transform: none;
    left: 50px;
    width: 20px;
    height: 50px;
    background: #e5e5e5;
  }

  #h.closed::after {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    top: 50%;
    left: -5px;
    transform-origin: center;
    transform: translateY(-50%) rotate(45deg);
  }

  #h.closed div {
    display: none;
  }

  #h .wrapper {
    width: 200px;
    height: 50px;
    background: white;
    opacity: .7;
  }
  `;
  document.body.appendChild(s);

  const h = document.createElement('div');
  h.setAttribute('id', 'h');
  h.innerHTML = `
    <div class="wrapper">
      <div class="rmv">rmv</div>
      <div class="bn m-30m"></div>
      <div class="bn m-10m"></div>
      <div class="bn m-5m"></div>
      <div class="bn m-1m"></div>
      <div class="bn m-10s"></div>
      <input class="inpt"></input>
      <div class="bn p-10s"></div>
      <div class="bn p-1m"></div>
      <div class="bn p-5m"></div>
      <div class="bn p-10m"></div>
      <div class="bn p-30m"></div>
    </div>
  `;
  document.body.appendChild(h);
}

a();