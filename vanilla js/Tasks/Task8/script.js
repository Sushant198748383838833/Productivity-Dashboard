const ctx = document.querySelector("#cashFlowChartElement");

const currencies = {
  usd: {
    name: "US Dollar",
    symbol: "$",
  },
  eur: {
    name: "Euro",
    symbol: "€",
  },
  gbp: {
    name: "British Pound",
    symbol: "£",
  },
  inr: {
    name: "Indian Rupee",
    symbol: "₹",
  },
  jpy: {
    name: "Japanese Yen",
    symbol: "¥",
  },
};

const registerAndLogin = document.querySelector(".registerAndLogin");
const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const usernameElement = document.querySelector("#usernameElement");
const logoutBtn = document.querySelector("#logoutBtn");

const featureBtn = document.querySelectorAll(".featureBtn");
const dashboardBtn = document.querySelector("#dashboardBtn");
const settingBtn = document.querySelector("#settingBtn");
const dashboardSection = document.querySelector(".dashboard");
const settingSection = document.querySelector(".setting");
const sidebarBtnsSvg = document.querySelector(".sidebarBtnsSvg");
const dashboardSvg = document.querySelector(".dashboardSvg");
const settingSvg = document.querySelector(".settingSvg");
const downloadCsvBtn = document.querySelector("#downloadCsvBtn");

const closeModal = document.querySelector(".closeModal");
const addTransactionModal = document.querySelector(".addTransactionModal");
const addTransactionBtn = document.querySelector(".addTransactionBtn");
const saveTransactionBtn = document.querySelector("#saveTransactionBtn");
const form = document.querySelector(".addTransactionModal form");
const tbody = document.querySelector("#tbody");
const currentBalance = document.querySelector("#CurrentBalance");
const totalIncome = document.querySelector("#totalIncome");
const totalExpense = document.querySelector("#totalExpense");
const totalTransactions = document.querySelector("#totalTransactions");
const resetAllDataBtn = document.querySelector("#resetAllDataBtn");
const darkModeBtn = document.querySelector("#darkModeBtn");
const inputSearchBar = document.querySelector("#input");
const sortBy = document.querySelector("#sortBy");
const settingsInputField = document.querySelector("#settingsInputField");
const currency = document.querySelector("#currency");
const saveChangesBtn = document.querySelector(".saveChangesBtn");
const menuBtn = document.querySelector(".menuBtn");
const leftSection = document.querySelector(".leftSection");

const light = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 7C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H16C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7H8ZM8 5H16C19.866 5 23 8.13401 23 12C23 15.866 19.866 19 16 19H8C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5ZM8 15C6.34315 15 5 13.6569 5 12C5 10.3431 6.34315 9 8 9C9.65685 9 11 10.3431 11 12C11 13.6569 9.65685 15 8 15Z"></path></svg>`;

const dark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
  <path d="M16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15ZM8 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H8C5.23858 17 3 14.7614 3 12C3 9.23858 5.23858 7 8 7ZM8 5C4.13401 5 1 8.13401 1 12C1 15.866 4.13401 19 8 19H16C19.866 19 23 15.866 23 12C23 8.13401 19.866 5 16 5H8Z"></path>
</svg>`;

let usersArr = JSON.parse(localStorage.getItem("Users")) || [];
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];
// let transactionArr = JSON.parse(localStorage.getItem("transactions")) || [];

let transactionArr = loggedInUser[0]?.transactions || [];
localStorage.setItem("transactions", JSON.stringify(transactionArr));

let isEdit = null;
let isRegisterScreen = false;

featureBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.classList.contains("active"));

    if (!e.target.classList.contains("active")) {
      if (e.target.id == "dashboardBtn") {
        dashboardBtn.classList.add("active");
        dashboardSvg.classList.add("active");
        settingBtn.classList.remove("active");
        settingSvg.classList.remove("active");
      } else if (e.target.id == "settingBtn") {
        settingBtn.classList.add("active");
        settingSvg.classList.add("active");
        dashboardBtn.classList.remove("active");
        dashboardSvg.classList.remove("active");
      }
    }
  });
});

const currentTheme = () => {
  if (loggedInUser[0]?.theme == "light") {
    darkModeBtn.innerHTML = light;
    document.body.classList.remove("darkTheme");
  } else if (loggedInUser[0]?.theme == "dark") {
    darkModeBtn.innerHTML = dark;
    document.body.classList.add("darkTheme");
  }
};
currentTheme();

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("darkTheme");

  if (darkModeBtn.innerHTML == dark) {
    darkModeBtn.innerHTML = light;
    loggedInUser[0].theme = "light";
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  } else if (darkModeBtn.innerHTML == light) {
    darkModeBtn.innerHTML = dark;
    loggedInUser[0].theme = "dark";
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }
});

saveChangesBtn.addEventListener("click", () => {
  alert("changes saved successfully !");
  loggedInUser[0].username = settingsInputField.value;
  loggedInUser[0].currency = currency.value;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  updateStatistics();
});

menuBtn.addEventListener("click", () => {
  leftSection.classList.toggle("hamburgerActive");
  leftSection.style.display = "flex";
});

leftSection.addEventListener("click", () => {
  if (window.innerWidth < 767) {
    leftSection.classList.remove("hamburgerActive");
    leftSection.style.display = "none";
  }
});

const toggleForm = () => {
  if (isRegisterScreen == null || loggedInUser.length == 1) {
    registerAndLogin.style.display = "none";
    usernameElement.textContent = `${loggedInUser[0].username}`;
    settingsInputField.value = loggedInUser[0].username;
    currency.value = loggedInUser[0].currency;
  } else if (isRegisterScreen == true) {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    isRegisterScreen = false;
  } else if (isRegisterScreen == false) {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    isRegisterScreen = true;
  }
};
toggleForm();

logoutBtn.addEventListener("click", () => {
  let index = loggedInUser[0].key;
  loggedInUser[0].statistics = statistics;
  loggedInUser[0].transactions = transactionArr;
  usersArr[index] = loggedInUser[0];
  localStorage.setItem("Users", JSON.stringify(usersArr));

  loggedInUser = [];
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  registerAndLogin.style.display = "flex";
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = e.target[0].value.trim();
  let password = e.target[1].value.trim();

  if (username == "" || password == "") {
    alert("Enter username and password ");
    return;
  }

  let isUserAlreadyExists = usersArr.filter((val) => {
    return username == val.username && password == val.password;
  });

  if (isUserAlreadyExists.length == 1) {
    alert("User already registered ! You can login directly .");
    toggleForm();
    return;
  }

  const obj = {
    key: usersArr.length,
    username,
    password,
    transactions: [],
    statistics: {
      currentBalanceCount: 0,
      totalIncomeCount: 0,
      totalExpenseCount: 0,
      totalTransactionsCount: 0,
    },
    currency: "usd",
    theme: "light",
  };

  usersArr.push(obj);
  localStorage.setItem("Users", JSON.stringify(usersArr));
  isRegisterScreen = false;
  toggleForm();

  e.target[0].value = "";
  e.target[1].value = "";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = e.target[0].value.trim();
  let password = e.target[1].value.trim();

  if (username == "" || password == "") {
    alert("Enter username and password ");
    return;
  }

  loggedInUser = usersArr.filter((val) => {
    return username == val.username && password == val.password;
  });

  if (loggedInUser.length == 1) {
    isRegisterScreen = null;
    transactionArr = loggedInUser[0]?.transactions;
    statistics = loggedInUser[0]?.statistics;
    updateStatistics();
    updateChart();
    renderTransaction();
    currentTheme();
    toggleForm();
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  } else {
    alert("You have not registered yet !");
  }

  e.target[0].value = "";
  e.target[1].value = "";
});

let statistics = loggedInUser[0]?.statistics || {
  currentBalanceCount: 0,
  totalIncomeCount: 0,
  totalExpenseCount: 0,
  totalTransactionsCount: 0,
};

updateStatistics = () => {
  statistics.currentBalanceCount =
    statistics.totalIncomeCount - statistics.totalExpenseCount;

  currentBalance.textContent = `${currencies[loggedInUser[0]?.currency]?.symbol} ${statistics.currentBalanceCount}`;
  totalIncome.textContent = `${currencies[loggedInUser[0]?.currency]?.symbol} ${statistics.totalIncomeCount}`;
  totalExpense.textContent = `${currencies[loggedInUser[0]?.currency]?.symbol} ${statistics.totalExpenseCount}`;
  totalTransactions.textContent = `${statistics.totalTransactionsCount}`;

  localStorage.setItem("statistics", JSON.stringify(statistics));
  if (loggedInUser && loggedInUser.length > 0) {
    loggedInUser[0].statistics = statistics;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
};
updateStatistics();

const updateStatisticsWhenEdit = (oldTransactionData, newTransactionData) => {
  if (
    oldTransactionData.type == "income" &&
    newTransactionData.type == "expense"
  ) {
    statistics.totalIncomeCount -= parseFloat(oldTransactionData.amount);
    statistics.totalExpenseCount += parseFloat(newTransactionData.amount);
  } else if (
    oldTransactionData.type == "expense" &&
    newTransactionData.type == "income"
  ) {
    statistics.totalExpenseCount -= parseFloat(oldTransactionData.amount);
    statistics.totalIncomeCount += parseFloat(newTransactionData.amount);
  } else if (
    oldTransactionData.type == "income" &&
    newTransactionData.type == "income"
  ) {
    statistics.totalIncomeCount -= parseFloat(oldTransactionData.amount);
    statistics.totalIncomeCount += parseFloat(newTransactionData.amount);
  } else if (
    oldTransactionData.type == "expense" &&
    newTransactionData.type == "expense"
  ) {
    statistics.totalExpenseCount -= parseFloat(oldTransactionData.amount);
    statistics.totalExpenseCount += parseFloat(newTransactionData.amount);
  }

  updateStatistics();
};

const updateStatisticsWhenDelete = (transactionData) => {
  statistics.totalTransactionsCount--;

  if (transactionData.type == "income") {
    statistics.totalIncomeCount -= parseFloat(transactionData.amount);
  } else if (transactionData.type == "expense") {
    statistics.totalExpenseCount -= parseFloat(transactionData.amount);
  }

  updateStatistics();
  updateChart();
};

addTransactionBtn.addEventListener("click", () => {
  addTransactionModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  addTransactionModal.style.display = "none";
  isEdit = null;

  form[0].value = "expense";
  form[1].value = "";
  form[2].value = "";
  form[3].value = "";
  form[4].value = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTransactionModal.style.display = "none";

  let type = e.target[0].value.trim();
  let description = e.target[1].value.trim();
  let amount = e.target[2].value.trim();
  let date = e.target[3].value.trim();
  let category = e.target[4].value.trim();

  if (
    type == "" ||
    description == "" ||
    amount == "" ||
    date == "" ||
    category == "none"
  ) {
    alert("Please Enter required fields !");
    return;
  }

  let obj = {
    type,
    description,
    amount,
    date,
    category,
  };

  if (isEdit !== null) {
    updateStatisticsWhenEdit(transactionArr[isEdit], obj);
    transactionArr[isEdit] = obj;
    localStorage.setItem("transactions", JSON.stringify(transactionArr));
    loggedInUser[0].transactions = transactionArr;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    renderTransaction();
    updateChart();
    isEdit = null;
  } else {
    transactionArr.push(obj);
    localStorage.setItem("transactions", JSON.stringify(transactionArr));
    loggedInUser[0].transactions = transactionArr;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    renderTransaction();
    statistics.totalTransactionsCount++;
    obj.type == "income"
      ? (statistics.totalIncomeCount += parseFloat(obj.amount))
      : (statistics.totalExpenseCount += parseFloat(obj.amount));
    updateStatistics();
    updateChart();
    console.log(transactionArr);
  }

  e.target[0].value = "expense";
  e.target[1].value = "";
  e.target[2].value = "";
  e.target[3].value = "";
  e.target[4].value = "none";
});

renderTransaction = () => {
  tbody.textContent = "";

  transactionArr.forEach((transaction, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td key="${idx}">
                                    <span class="date">${transaction.date}</span></td>
                                  <td>
                                    <span class="description">${transaction.description}</span>
                                  </td>
                                  <td>
                                    <span class="category">${transaction.category}</span>
                                  </td>
                                  <td>
                                    <span class="amount">${transaction.amount}</span>
                                  </td>
                                  <td>
                                    <span class="actions">
                                      <button id="editTransactionBtn" onClick="editTransaction(${idx})"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg></button>
                                      <button id="deleteTransactionBtn" onClick="deleteTransaction(${idx})"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7V2H17V4ZM9 9V17H11V9H9ZM13 9V17H15V9H13Z"></path></svg></button>
                                    </span>
                                  </td>`;

    tbody.appendChild(tr);

    const amountElement =
      transaction.type == "income"
        ? tr.querySelector(".amount")
        : tr.querySelector(".amount");
    if (transaction.type == "income") {
      amountElement.style.color = "green";
      amountElement.textContent = `+${currencies[loggedInUser[0]?.currency]?.symbol} ${transaction.amount}`;
    } else if (transaction.type == "expense") {
      amountElement.style.color = "red";
      amountElement.textContent = `-${currencies[loggedInUser[0]?.currency]?.symbol} ${transaction.amount}`;
    }
  });

  transactionArr = JSON.parse(localStorage.getItem("transactions"));
};
renderTransaction();

dashboardBtn.addEventListener("click", (e) => {
  dashboardSection.style.display = "flex";
  settingSection.style.display = "none";
});

settingBtn.addEventListener("click", () => {
  dashboardSection.style.display = "none";
  settingSection.style.display = "flex";
});

editTransaction = (id) => {
  console.log("edit transaction", id);
  isEdit = id;
  addTransactionModal.style.display = "flex";

  form[0].value = transactionArr[id].type;
  form[1].value = transactionArr[id].description;
  form[2].value = transactionArr[id].amount;
  form[3].value = transactionArr[id].date;
  form[4].value = transactionArr[id].category;
};

deleteTransaction = (id) => {
  console.log("delete transaction", id);
  updateStatisticsWhenDelete(transactionArr[id]);
  transactionArr.splice(id, 1);
  localStorage.setItem("transactions", JSON.stringify(transactionArr));
  loggedInUser[0].transactions = transactionArr;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  renderTransaction();
};

resetAllDataBtn.addEventListener("click", () => {
  if (!confirm("Are you sure you want to reset all data?")) {
    return 0;
  }

  transactionArr = [];
  localStorage.setItem("transactions", JSON.stringify(transactionArr));

  statistics = {
    currentBalanceCount: 0,
    totalIncomeCount: 0,
    totalExpenseCount: 0,
    totalTransactionsCount: 0,
  };

  loggedInUser[0].statistics = statistics;
  loggedInUser[0].transactions = transactionArr;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  renderTransaction();
  updateStatistics();
  updateChart();
});

inputSearchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  console.log(searchTerm);

  transactionArr = transactionArr.filter((transaction) => {
    return (
      transaction.description.toLowerCase().includes(searchTerm) ||
      transaction.category.toLowerCase().includes(searchTerm)
    );
  });

  renderTransaction();
});

sortBy.addEventListener("change", (e) => {
  transactionArr.forEach((transaction) => {
    if (e.target.value == "income_only" && transaction.type == "income") {
      transactionArr = transactionArr.filter((val) => val.type == "income");
      renderTransaction();
    } else if (
      e.target.value == "expense_only" &&
      transaction.type == "expense"
    ) {
      transactionArr = transactionArr.filter((val) => val.type == "expense");
      renderTransaction();
    } else if (e.target.value == "all_types") {
      renderTransaction();
    }
  });
});

function convertToCSV(data) {
    if (data.length === 0) return "";

    const headers = Object.keys(data[0]);

    const rows = data.map(transaction =>
        headers.map(header => `"${transaction[header] ?? ""}"`).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
}


const downloadCSV = (data) =>  {
if (data.length === 0) {
        alert("No transactions found.");
        return;
    }

    const csv = convertToCSV(data);

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "FinTrack_Transactions.csv";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}



downloadCsvBtn.addEventListener("click", () => {
  let transactions = transactionArr || [];

  downloadCSV(transactions);
});

const chart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: [""],

    datasets: [
      {
        label: "Income",
        data: [parseFloat(statistics.totalIncomeCount)],
        backgroundColor: "green",
      },
      {
        label: "Expenses",
        data: [parseFloat(statistics.totalExpenseCount)],
        backgroundColor: "red",
      },
    ],
  },

  options: {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Income vs Expenses",
        position: "bottom",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.max(
          parseFloat(statistics.totalIncomeCount),
          parseFloat(statistics.totalExpenseCount),
        ),
        ticks: {
          stepSize:
            Math.max(
              parseFloat(statistics.totalIncomeCount),
              parseFloat(statistics.totalExpenseCount),
            ) / 40,
        },
      },
    },
  },
});


const updateChart = () => {
  chart.data.datasets[0].data = [parseFloat(statistics.totalIncomeCount)];
  chart.data.datasets[1].data = [parseFloat(statistics.totalExpenseCount)];

  chart.options.scales.y.max = Math.max(
    parseFloat(statistics.totalIncomeCount),
    parseFloat(statistics.totalExpenseCount),
  );
  chart.options.scales.y.ticks.stepSize =
    Math.max(
      parseFloat(statistics.totalIncomeCount),
      parseFloat(statistics.totalExpenseCount),
    ) / 10;

  chart.update();
};


