const currency_1 = document.getElementById("currency-1"),
  currency_2 = document.getElementById("currency-2"),
  amount_1 = document.getElementById("amount-1"),
  amount_2 = document.getElementById("amount-2"),
  rateEl = document.getElementById("rate"),
  swap = document.getElementById("swap");

// fetch exchange rates and update the dom
function calculate() {
  const first_currency = currency_1.value,
    second_currency = currency_2.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${first_currency}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[second_currency];

      rateEl.innerText = `1 ${first_currency} = ${rate} ${second_currency}`;

      amount_2.value = (amount_1.value * rate).toFixed(2);
    });
}

// event listeners
currency_1.addEventListener("change", calculate);
amount_1.addEventListener("input", calculate);
currency_2.addEventListener("change", calculate);
amount_2.addEventListener("change", calculate);

swap.addEventListener("click", () => {
  const temp = currency_1.value;
  currency_1.value = currency_2.value;
  currency_2.value = temp;
  calculate();
});

calculate();
