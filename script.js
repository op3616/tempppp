const loanAmount = document.getElementById("loan_amount");
const loanTenure = document.getElementById("loan_tenure");
const loanRate = document.getElementById("loan_interest");

const loanEmi = document.querySelector(".loan_emi");
const loanPrinciple = document.querySelector(".loan_principle");
const loanTotal = document.querySelector(".loan_total");
const loanInterest = document.querySelector(".loan_interest_rate");

const submitBtn = document.querySelector(".calculator-btn");

submitBtn.addEventListener("click", function () {
  if (
    loanAmount.value == "" ||
    loanTenure.validity.value == "" ||
    loanRate.validity.value == ""
  ) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  amount = Number(loanAmount.value);
  tenure = loanTenure.value * 12; // 1Year = 12 months
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
  total = amount + interestTotal;

  loanEmi.innerHTML = Math.floor(emi);
  loanPrinciple.innerHTML = Math.floor(amount);
  loanTotal.innerHTML = Math.floor(total);
  loanInterest.innerHTML = Math.floor(interestTotal);

  //Loanchart
  let xValues = ["Principle", "Interest"];
  let yValues = [amount, Math.floor(interestTotal)];

  let barColors = ["#37989d", "#000000"];

  new Chart("loanChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: false,
      },
    },
  });

  // tableCreate(emiResult, interestResult, tenure);
});

// function tableCreate(emiResult, interestResult, tenure) {
//   const body = document.querySelector(".emi-table"),
//     tbl = document.createElement("table");
//   tbl.style.width = "100px";
//   tbl.style.border = "1px solid black";

//   const header = tbl.createTHead();
//   header.insertRow(4);

//   for (let i = 0; i < tenure; i++) {
//     const tr = tbl.insertRow();
//     for (let j = 0; j < 4; j++) {
//       if (i === 2 && j === 1) {
//         break;
//       } else {
//         const td = tr.insertCell();
//         td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
//         td.style.border = "1px solid black";
//         if (i === 1 && j === 1) {
//           td.setAttribute("rowSpan", "2");
//         }
//       }
//     }
//   }
//   body.appendChild(tbl);
// }
