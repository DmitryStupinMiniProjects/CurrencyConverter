import { API_KEY } from './config.js';

const amountInputElement = document.querySelector("[data-js-amount]")
const selectFromElement = document.querySelector("[data-js-from]")
const selectToElement = document.querySelector("[data-js-to]")
const convertButtonElement = document.querySelector("[data-js-convert]")
const resultBlockElement = document.querySelector("[data-js-result]")
const errorBlockElement = document.querySelector("[data-js-error]")

const getCurrency = async (fromCurrencyValue, toCurrencyValue, amountValue) => {
  try {
    const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${fromCurrencyValue}`)
    const data = await response.json()

    resultBlockElement.textContent = (data.data[toCurrencyValue].value * amountValue).toFixed(2)
  } catch (error) {
    resultBlockElement.textContent = "";
    errorBlockElement.textContent = "Ошибка при получении данных. Попробуйте позже.";
  }
}

convertButtonElement.addEventListener("click", () => {
  const amount = Number(amountInputElement.value)
  
  if (!amountInputElement.value.trim()) {
    errorBlockElement.textContent = "Введите сумму!"
    resultBlockElement.textContent = ''
    return
  }
  
  if (isNaN(amount)) {
    errorBlockElement.textContent = "Введите корректное число!";
    resultBlockElement.textContent = "";
    return;
  }

  if (amount <= 0) {
    errorBlockElement.textContent = "Сумма должна быть больше нуля!";
    resultBlockElement.textContent = "";
    return;
  }

  errorBlockElement.textContent = ''
  
  getCurrency(selectFromElement.value, selectToElement.value, amount)
})
