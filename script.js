// Get DOM elements
const billTotal = document.getElementById("billTotal");
const totalWithTax = document.getElementById("totalWithTax");
const tipSlider = document.getElementById("tipSlider");
const tipBubble = document.getElementById("tipBubble");
const convertedTip = document.getElementById("convertedTip");
const convertedTotal = document.getElementById("convertedTotal");
const currency = document.getElementById("currency");
const error = document.getElementById("error");
const toggleTheme = document.getElementById("toggleTheme");

let bill = 0;
let taxAmount = 0;
let selectedCurrency = "usd";

// Currency conversion rates
const rates = {
  usd: 1,
  inr: 85,
  eur: 0.95
};

// Handle bill input
billTotal.addEventListener("input", () => {
  bill = parseFloat(billTotal.value);

  if (isNaN(bill) || bill < 0) {
    error.textContent = "Please enter a valid non-negative bill total.";
    totalWithTax.value = "";
    convertedTip.value = "";
    convertedTotal.value = "";
    return;
  }

  error.textContent = "";
  taxAmount = bill * 0.11;
  totalWithTax.value = (bill + taxAmount).toFixed(2);

  updateBubble();
  updateValues();
});

// Update on tip slider input
tipSlider.addEventListener("input", () => {
  updateBubble();
  updateValues();
});

// Update on currency change
currency.addEventListener("change", () => {
  selectedCurrency = currency.value;
  updateValues();
});

// Update tip bubble tooltip position
function updateBubble() {
  const slider = tipSlider;
  const bubble = tipBubble;

  const value = parseInt(slider.value);
  bubble.textContent = `${value}%`;

  const percent = value / 100;
  const offset = percent * slider.offsetWidth;
  bubble.style.left = `${offset}px`;
}

// Calculate and display results
function updateValues() {
  if (isNaN(bill) || bill <= 0) return;

  const tipPercent = parseInt(tipSlider.value);
  const tipAmount = (bill * tipPercent) / 100;
  const total = bill + tipAmount + taxAmount;

  const rate = rates[selectedCurrency];
  const symbol = selectedCurrency === "inr" ? "₹" :
                 selectedCurrency === "eur" ? "€" : "$";

  convertedTip.value = `${symbol} ${(tipAmount * rate).toFixed(2)}`;
  convertedTotal.value = `${symbol} ${(total * rate).toFixed(2)}`;
}

// Toggle dark/light mode with dynamic button label
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleTheme.textContent = "☀️ Toggle Light Mode";
  } else {
    toggleTheme.textContent = "🌙 Toggle Dark Mode";
  }
});

// On page load, set the correct toggle button label
window.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("dark")) {
    toggleTheme.textContent = "☀️ Toggle Light Mode";
  } else {
    toggleTheme.textContent = "🌙 Toggle Dark Mode";
  }
});
