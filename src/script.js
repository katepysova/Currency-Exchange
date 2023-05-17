const currencyOne = document.querySelector("#currency-1");
const currencyTwo = document.querySelector("#currency-2");

const amountOne = document.querySelector("#amount-1");
const amountTwo = document.querySelector("#amount-2");

const rate = document.querySelector(".rate");
const swapBtn = document.querySelector(".btn.swap");

const API_URL = `https://open.er-api.com/v6/latest/`;

const getRate = async (currency) => {
  const response = await fetch(`${API_URL}${currency}`);
  return response.json();
};

async function calculate() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;

  const data = await getRate(currencyOneValue);

  const rateValue = data.rates[currencyTwoValue];
  rate.innerHTML = `1 ${currencyOneValue} = ${rateValue.toFixed(
    2
  )} ${currencyTwoValue}`;
  amountTwo.value = (amountOne.value * rateValue).toFixed(2);
}

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

swapBtn.addEventListener("click", () => {
  [currencyOne.value, currencyTwo.value] = [
    currencyTwo.value,
    currencyOne.value,
  ];
  calculate();
});

calculate();
