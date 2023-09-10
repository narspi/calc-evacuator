document.addEventListener("DOMContentLoaded", () => {
  const calc = document.querySelector(".calc");
  const calcDistanceInputs = calc.querySelectorAll(".calc_distance-input");
  const btns = calc.querySelectorAll(".calc__nav-btn");
  const tabs = calc.querySelectorAll(".calc_grid");

  if (calc) {
    function clicBtnFoo() {
      const btn = this;
      const id = btn.dataset.id;
      btns.forEach((btn) => btn.classList.remove("active"));
      tabs.forEach((tab) => tab.classList.remove("active"));
      btn.classList.add("active");
      const currentTab = calc.querySelector(`#${id}`);
      currentTab.classList.add("active");
    }

    btns.forEach((btn) => {
      btn.addEventListener("click", clicBtnFoo);
    });

    function calcDistancePrice(input, price) {
      const value = input.value;
      const distance = Number(value);

      const distancePrice = distance * price;

      return distancePrice;
    }

    function changeDistanceInputFoo() {
      const input = this;
      let value = input.value;

      if (value.length === 0) {
        input.value = 0;
        input.selectionStart = 1;
      }

      if (value.length === 2 && value[0] === "0") {
        input.value = value[1];
      }

      const regExp = /[^0-9]/;

      if (regExp.test(value)) {
        value = value.replace(/[^0-9]/g, "");
        input.value = value;
      }

      calcTotalPriceFoo(input);
    }

    function calcTotalPriceFoo(target) {
      const tab = target.closest(".calc_grid");

      const outputElem = tab.querySelector(".calc_total-output");

      const servicesInputs = tab.querySelectorAll(
        '.calc_input-hidden[name="services"]:checked'
      );
      const complexityInputs = tab.querySelectorAll(
        '.calc_input-hidden[name="complexity"]:checked'
      );
      const distanseInput = tab.querySelector(".calc_distance-input");
      const transportInput = tab.querySelector(
        '.calc_input-hidden[name="transport"]:checked'
      );
      const wheelInput = tab.querySelector(
        '.calc_input-hidden[name="wheel"]:checked'
      );

      const transportPrice = transportInput
        ? Number(transportInput.dataset.price)
        : 0;

      const priceKM = transportInput
        ? Number(transportInput.dataset.priceKm)
        : 0;
      const wheelPrice = wheelInput ? Number(wheelInput.dataset.price) : 0;
      let servicesPrice = 0;
      let complexityPrice = 0;
      const distancePrice = calcDistancePrice(distanseInput, priceKM);

      servicesInputs.forEach((input) => {
        const dataset = input.dataset;
        const price = Number(dataset.price);
        servicesPrice += price;
      });

      let countDoubleTarget = 0;
      complexityInputs.forEach((input) => {
        const dataset = input.dataset;
        const isKpp = "kpp" in dataset;
        const isSteeringWheel = 'steeringWheel' in dataset;
        if (isKpp || isSteeringWheel) countDoubleTarget++;
        if (!((isKpp || isSteeringWheel) && countDoubleTarget === 2)) {
          const price = Number(dataset.price);
          complexityPrice += price;
        }
      });
      let total = 0;

      total =
        transportPrice +
        distancePrice +
        servicesPrice +
        wheelPrice +
        complexityPrice;

      if (transportInput) {
        outputElem.textContent = total;
      } else {
        outputElem.textContent = 0;
      }
    }

    function fooClickCalcBlock(e) {
      const target = event.target;
      const tab = target.closest(".calc_grid");
      let id;
      if (tab) id = tab.id;

      if (
        id === "calc-tab1" &&
        target.classList.contains("calc_input-hidden")
      ) {
        calcTotalPriceFoo(target);
      }

      if (
        id === "calc-tab2" &&
        target.classList.contains("calc_input-hidden")
      ) {
        calcTotalPriceFoo(target);
      }

      if (
        id === "calc-tab3" &&
        target.classList.contains("calc_input-hidden")
      ) {
        calcTotalPriceFoo(target);
      }

      if (
        target.classList.contains("calc_distance-input") &&
        target.value.length === 1 &&
        target.value === "0"
      ) {
        target.selectionStart = 1;
      }
    }

    calcDistanceInputs.forEach((calcDistanceInput) => {
      calcDistanceInput.addEventListener("input", changeDistanceInputFoo);
    });

    calc.addEventListener("click", fooClickCalcBlock);
  }
});
