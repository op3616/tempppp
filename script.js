const loanAmount = document.getElementById("loan_amount");
const loanTenure = document.getElementById("loan_tenure");
const loanRate = document.getElementById("loan_interest");

const loanEmi = document.querySelector(".loan_emi");
const loanPrinciple = document.querySelector(".loan_principle");
const loanTotal = document.querySelector(".loan_total");
const loanInterest = document.querySelector(".loan_interest_rate");

const submitBtn = document.querySelector(".calculator-btn");

loanAmount.addEventListener(
  "keyup",
  function (evt) {
    this.name = this.value.replaceAll(".", "");
    if (
      this.value == "" ||
      this.value == undefined ||
      isNaN(parseInt(this.name)) == true
    ) {
      this.value = 0;
      this.name = "0";
    } else {
      this.value = parseInt(this.name).toLocaleString();
    }
  },
  false
);

submitBtn.addEventListener("click", function () {
  if (
    loanAmount.value == "" ||
    loanTenure.value == "" ||
    loanRate.value == ""
  ) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (
    Number(loanAmount.value) == 0 ||
    Number(loanTenure.value) == 0 ||
    Number(loanRate.value) == 0
  ) {
    alert("Vui lòng nhập số khác 0");
    return;
  }

  amount = localStringToNumber(loanAmount.value);
  tenure = loanTenure.value;
  rate = loanRate.value / 100;
  interestResult = [];
  emiResult = [];
  principle = amount / tenure;

  for (let i = 0; i < tenure; i++) {
    interestResult[i] = ((amount - principle * i) * rate) / 12;
    emiResult[i] = principle + interestResult[i];
  }

  interestTotal = interestResult.reduce((v, t) => v + t, 0);
  emiTotal = emiResult.reduce((v, t) => v + t, 0);
  emi = emiTotal / tenure;
  interestMonthly = interestTotal / tenure;
  total = amount + interestTotal;

  loanEmi.innerHTML = convertToCurrency(Math.floor(emi));
  loanPrinciple.innerHTML = convertToCurrency(Math.floor(amount));
  loanTotal.innerHTML = convertToCurrency(Math.floor(total));
  loanInterest.innerHTML = convertToCurrency(Math.floor(interestTotal));
});

function convertToCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function localStringToNumber(s) {
  return Number(String(s).replaceAll(".", ""));
}
