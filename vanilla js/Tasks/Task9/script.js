const registerForm = document.querySelector("#registerForm");
const logInForm = document.querySelector("#logInForm");
const goToRegisterFormLink = document.querySelector("#goToRegisterFormLink");
const goToLoginFormLink = document.querySelector("#goToLoginFormLink");
const loginAndRegisterCont = document.querySelector("#loginAndRegisterCont");
const logoutBtn = document.querySelector("#logoutBtn");

const dateElement = document.querySelector("#date");
const dayAndTime = document.querySelector("#dayAndTime");
const cityElement = document.querySelector("#cityElement");
const temp = document.querySelector("#temp");
const description = document.querySelector("#description");
const heatIndex = document.querySelector("#heatIndex");
const humidiy = document.querySelector("#humidiy");
const wind = document.querySelector("#wind");
const videoElement = document.querySelector("#videoElement");
const themeBtn = document.querySelector("#themeBtn");
const htmlElement = document.querySelector("html");

const otherFeatures = document.querySelector(".otherFeatures");
const timerDisplay = document.querySelector("#timerDisplay");
const timerStartBtn = document.querySelector("#timerStartBtn");
const timerPauseBtn = document.querySelector("#timerPauseBtn");
const timerResetBtn = document.querySelector("#timerResetBtn");
const timerSection = document.querySelector("#timerSection");
const appsCont = document.querySelector("#appsCont");
const closeOverlay = document.querySelector("#closeOverlay");
const quoteSection = document.querySelector("#quoteSection");
const quoteContent = document.querySelector("#quoteContent");
const quoteAuthor = document.querySelector("#quoteAuthor");
const generateQuoteBtn = document.querySelector("#generateQuoteBtn");
const taskManagerSection = document.querySelector("#taskManagerSection");
const createTaskBtn = document.querySelector("#createTaskBtn");

const createTaskModal = document.querySelector("#createTaskModal");
const closeModalCont = document.querySelector("#closeModalCont");
const taskManagerForm = document.querySelector("#taskManagerForm");
const taskContBody = document.querySelector("#taskContBody");
const dailyPlannerSection = document.querySelector("#dailyPlannerSection");
const dailyGoalsSection = document.querySelector("#dailyGoalsSection");
const dailyPlannerBody = document.querySelector("#dailyPlannerBody");
const goalsCont = document.querySelector("#goalsCont");
const createGoalBtn = document.querySelector("#createGoalBtn");
const dailyGoalsModal = document.querySelector("#dailyGoalsModal");
const goalsCloseModalCont = document.querySelector("#goalsCloseModalCont");

const dailyGoalsForm = document.querySelector("#dailyGoalsForm");

const loader = document.querySelector("#loader");
const bgVideoCont = document.querySelector("#bgVideoCont");
const main = document.querySelector("#main");

let dashboardsLoggedInUser =
  JSON.parse(localStorage.getItem("dashboardsLoggedInUser")) || null;

logoutBtn.addEventListener("click", () => {
  dashboardsLoggedInUser = null;
  localStorage.setItem(
    "dashboardsLoggedInUser",
    JSON.stringify(dashboardsLoggedInUser),
  );
  isLoginFunc();
});

const loadingScreenLogic = () => {
  const dots = document.querySelector("#dots");
  let count = 0;

  const loadingAnimation = setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 300);

  const loadingTimeout = setTimeout(() => {
    clearInterval(loadingAnimation);
    loader.remove();
    bgVideoCont.classList.remove("hidden");
    main.classList.remove("hidden");
    clearTimeout(loadingTimeout);
  }, 2000);
};

const isLoginFunc = () => {
  if (dashboardsLoggedInUser !== null) {
    loginAndRegisterCont.classList.add("hidden");
    loadingScreenLogic();
  }
  if (dashboardsLoggedInUser === null) {
    loginAndRegisterCont.classList.remove("hidden");
    loadingScreenLogic();
  }
};
isLoginFunc();

let productivityDashboardsUsers =
  JSON.parse(localStorage.getItem("productivityDashboardsUsers")) || [];

goToLoginFormLink.addEventListener("click", () => {
  registerForm.classList.toggle("hidden");
  logInForm.classList.toggle("hidden");
});

goToRegisterFormLink.addEventListener("click", () => {
  registerForm.classList.toggle("hidden");
  logInForm.classList.toggle("hidden");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = e.target[0].value.trim();
  let password = e.target[1].value.trim();
  let city = e.target[2].value.trim();

  if (username === "" || password === "" || city === "") {
    alert("Please fill details .");
    return;
  }

  const obj = {
    username,
    password,
    city,
  };

  productivityDashboardsUsers.push(obj);
  localStorage.setItem(
    "productivityDashboardsUsers",
    JSON.stringify(productivityDashboardsUsers),
  );
  console.log(productivityDashboardsUsers);
  alert("Registration successful! Please log in to continue.");
  registerForm.classList.toggle("hidden");
  logInForm.classList.toggle("hidden");

  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
});

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = e.target[0].value.trim();
  let password = e.target[1].value.trim();

  if (username === "" || password === "" || city === "") {
    alert("Please fill details .");
    return;
  }

  productivityDashboardsUsers.map((val) => {
    if (val.username === username && val.password === password) {
      alert("Login successful! Redirecting to your dashboard...");
      dashboardsLoggedInUser = val;
      localStorage.setItem(
        "dashboardsLoggedInUser",
        JSON.stringify(dashboardsLoggedInUser),
      );
      loginAndRegisterCont.classList.add("hidden");
      loadingScreenLogic();
      return;
    }
  });

  if (dashboardsLoggedInUser === null) {
    alert("Incorrect username or password. Please check your credentials.");
  }

  e.target[0].value = "";
  e.target[1].value = "";
});

let theme = JSON.parse(localStorage.getItem("theme")) || "light";

const lightSvg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-sun-icon lucide-sun"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
`;

const darkSvg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-moon-icon lucide-moon"
  >
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </svg>
`;

if (theme === "dark") {
  htmlElement.classList.add("dark");
  themeBtn.innerHTML = darkSvg;
}

themeBtn.addEventListener("click", () => {
  console.log(htmlElement.classList.value);

  if (htmlElement.classList.value.includes("dark")) {
    htmlElement.classList.remove("dark");
    themeBtn.innerHTML = lightSvg;
    theme = "light";
    localStorage.setItem("theme", JSON.stringify(theme));
  } else {
    htmlElement.classList.add("dark");
    themeBtn.innerHTML = darkSvg;
    theme = "dark";
    localStorage.setItem("theme", JSON.stringify(theme));
  }
});

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const sunRiseAndSunSetFunc = () => {
  let now = new Date();

  let time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (time.includes("pm")) {
    videoElement.src = "./resources/sunset.mp4";
  } else {
    videoElement.src = "./resources/sunrise.mp4";
  }
};
sunRiseAndSunSetFunc();

const timeAndWeatherFunc = () => {
  let now = new Date();
  let currentDate = now.getDate();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();
  let currentDay = now.getDay();

  let time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  dateElement.textContent = `${currentDate} ${months[currentMonth]}, ${currentYear}`;
  dayAndTime.textContent = `${[days[currentDay]]}, ${time.toUpperCase()}`;
  // console.log(now.getTimezoneOffset())
};

setInterval(timeAndWeatherFunc, 1000);

const apiKey = "9305f37993314385d067ae38d1bea632";
const city = dashboardsLoggedInUser.city.toLowerCase();
cityElement.textContent = `${dashboardsLoggedInUser.city.toUpperCase()}`;
// console.log(city)

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );

    const data = await response.json();
    console.log(data);

    cityElement.textContent = data.name;
    temp.innerHTML = `${data.main.temp} <span class="font-semibold text-[25px]">°C</span>`; // `${data.main.temp} °C`
    description.textContent = `${data.weather[0].description}`;
    humidiy.textContent = `Humidity : ${data.main.humidity} %`;
    heatIndex.textContent = `Heat Index : ${data.main.feels_like} %`;
    wind.textContent = `Wind : ${data.wind.speed} km/hr`;

    console.log(weatherWidget);
  } catch (error) {
    console.log(error);
  }
}

getWeather();

let currentOverlayApp = null;
closeOverlay.addEventListener("click", () => {
  appsCont.classList.remove("toggle");
  if (currentOverlayApp !== null) {
    currentOverlayApp.classList.remove("toggle");
  }
});

// Pomodoro Timer App
const timerFunc = () => {
  let timerInterval;
  let initialMin = "00";
  let initialSec = "00";

  timerStartBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      initialSec++;
      console.log("interval");
      timerDisplay.textContent = `${initialMin} : ${initialSec}`;

      if (initialSec === 60) {
        initialMin++;
        initialSec = 0;
        timerDisplay.textContent = `${initialMin} : ${initialSec}`;
      }

      if (initialMin === 25) {
        clearInterval(timerInterval);
      }
    }, 1000);
  });

  timerPauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
  });

  timerResetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    initialMin = "00";
    initialSec = "00";
    timerDisplay.textContent = `${initialMin} : ${initialSec}`;
  });
};

// quote App
const api = async () => {
  try {
    let data;

    do {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/quotes/quote/random",
      );
      data = await response.json();
      // console.log((data.data.content).split(" ").length)
    } while (data.data.content.split(" ").length > 25);
    // console.log("DATA :", data);

    quoteContent.textContent = `${data.data.content}`;
    quoteAuthor.textContent = `- ${data.data.author}`;
  } catch (error) {
    console.error(error);
  }
};
api();
generateQuoteBtn.addEventListener("click", () => {
  api();
});

//task manager App
createTaskBtn.addEventListener("click", () => {
  createTaskModal.classList.toggle("toggle");
});

closeModalCont.addEventListener("click", () => {
  createTaskModal.classList.toggle("toggle");
});

let tasksArr = JSON.parse(localStorage.getItem("tasksArr")) || [];

const markAsCompleted = (idx) => {
  tasksArr.splice(idx, 1);
  localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  renderTasks();
};

taskManagerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createTaskModal.classList.toggle("toggle");

  const task = document.createElement("div");
  const classString =
    "w-full flex flex-row justify-between items-center p-2 shadow-xs shadow-yellow-600/30";
  task.classList.add(...classString.split(" "));

  const taskTitle = e.target[0].value.trim();

  if (taskTitle === "") {
    alert("Please enter task title !");
    return;
  }

  task.innerHTML = ` 
            <p class=" text-lg">${taskTitle}</p>
            <button  class="completedBtn bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1 rounded-full">Mark As Completed</button>
  `;

  taskContBody.appendChild(task);
  tasksArr.push(taskTitle);
  console.log("tasksArr :", tasksArr);
  localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  renderTasks();

  e.target[0].value = "";
});

const renderTasks = () => {
  tasksArr = JSON.parse(localStorage.getItem("tasksArr")) || [];

  taskContBody.textContent = "";

  tasksArr.forEach((element, idx) => {
    let task = document.createElement("div");
    let classString =
      "w-full flex flex-row justify-between items-center p-2 shadow-xs shadow-yellow-600/30";
    task.classList.add(...classString.split(" "));

    task.innerHTML = ` 
            <p class="text-black dark:text-white text-lg">${element}</p>
            <button onclick="markAsCompleted(${idx})" class="completedBtn bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1 rounded-full">Mark As Completed</button>
  `;

    taskContBody.appendChild(task);
  });
};
renderTasks();

// Daily Planner App
const dailyPlannerFunc = () => {
  const dailyPlanner = JSON.parse(localStorage.getItem("dailyPlanner")) || [
    { id: 0, time: "00:00 - 01:00", task: "" },
    { id: 1, time: "01:00 - 02:00", task: "" },
    { id: 2, time: "02:00 - 03:00", task: "" },
    { id: 3, time: "03:00 - 04:00", task: "" },
    { id: 4, time: "04:00 - 05:00", task: "" },
    { id: 5, time: "05:00 - 06:00", task: "" },
    { id: 6, time: "06:00 - 07:00", task: "" },
    { id: 7, time: "07:00 - 08:00", task: "" },
    { id: 8, time: "08:00 - 09:00", task: "" },
    { id: 9, time: "09:00 - 10:00", task: "" },
    { id: 10, time: "10:00 - 11:00", task: "" },
    { id: 11, time: "11:00 - 12:00", task: "" },
    { id: 12, time: "12:00 - 13:00", task: "" },
    { id: 13, time: "13:00 - 14:00", task: "" },
    { id: 14, time: "14:00 - 15:00", task: "" },
    { id: 15, time: "15:00 - 16:00", task: "" },
    { id: 16, time: "16:00 - 17:00", task: "" },
    { id: 17, time: "17:00 - 18:00", task: "" },
    { id: 18, time: "18:00 - 19:00", task: "" },
    { id: 19, time: "19:00 - 20:00", task: "" },
    { id: 20, time: "20:00 - 21:00", task: "" },
    { id: 21, time: "21:00 - 22:00", task: "" },
    { id: 22, time: "22:00 - 23:00", task: "" },
    { id: 23, time: "23:00 - 00:00", task: "" },
  ];

  dailyPlanner.map((val) => {
    let cont = document.createElement("div");
    const classString =
      "plans dark:bg-gray-800 bg-slate-400 text-white p-2 h-fit rounded-md";

    cont.classList.add(...classString.split(" "));
    cont.id = `${val.id}`;

    cont.innerHTML = `
            <h3 class="p-3 text-md text-black dark:text-white dark:bg-gray-800 bg-slate-400 w-full ">${val.time}</h3>
            <input 
            onchange = "inputChanged(this,${val.id})"
            value='${val.task}'
            class="p-1 py-1 text-black dark:text-white dark:bg-gray-800 bg-slate-400 text-sm w-full rounded" type="text" placeholder="Add task here...">`;

    dailyPlannerBody.appendChild(cont);
  });

  const inputChanged = (input, id) => {
    console.log(id, "e", input.value);

    dailyPlanner.map((val) => {
      if (val.id === id) {
        dailyPlanner[id].task = input.value;
        console.log(dailyPlanner[id]);
        return;
      }
    });

    localStorage.setItem("dailyPlanner", JSON.stringify(dailyPlanner));
  };
};

// daily Goals App
let pendingGoalsCount = 0;
let completedGoalsCount = 0;
const ctx = document.getElementById("myChart");

const chart = new Chart(ctx, {
  type: "doughnut",

  data: {
    labels: ["Completed", "Pending"],

    datasets: [
      {
        data: [completedGoalsCount, pendingGoalsCount], // Completed, Pending

        backgroundColor: [
          "#22c55e", // Green
          "#f59e0b", // Orange
        ],

        borderWidth: 0,
        borderRadius: 8,
        spacing: 4,
        hoverOffset: 10,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "75%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#ffffff", // Change to "#111827" for light theme
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },

    animation: {
      animateRotate: true,
      animateScale: true,
    },
  },
});

function updateTaskChart() {
  chart.data.datasets[0].data = [completedGoalsCount,pendingGoalsCount];
  chart.update();
}



let dailyGoalsArr = JSON.parse(localStorage.getItem("dailyGoalsArr")) || [];


createGoalBtn.addEventListener("click", () => {
  dailyGoalsModal.classList.toggle("toggle");
});

goalsCloseModalCont.addEventListener("click", () => {
  dailyGoalsModal.classList.toggle("toggle");
});

const goalsInputFunc = (input, id) => {
  console.log("input clicked", input, id);

  if (dailyGoalsArr[id].isCompleted) {
    dailyGoalsArr[id].isCompleted = false;
    pendingGoalsCount++;
    completedGoalsCount--;
    updateTaskChart()
  } else {
    dailyGoalsArr[id].isCompleted = true;
    pendingGoalsCount--;
    completedGoalsCount++;
    updateTaskChart()
  }

  localStorage.setItem("dailyGoalsArr", JSON.stringify(dailyGoalsArr));
  renderGoals();
};

dailyGoalsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let goal = e.target[0].value.trim();

  if (goal === "") {
    alert("Please enter goal details !");
    return;
  }

  const obj = {
    goal,
    isCompleted: false,
  };

  dailyGoalsArr.push(obj);
  localStorage.setItem("dailyGoalsArr", JSON.stringify(dailyGoalsArr));
  renderGoals();
  dailyGoalsModal.classList.toggle("toggle");

  e.target[0].value = "";
});

const renderGoals = () => {
  dailyGoalsArr = JSON.parse(localStorage.getItem("dailyGoalsArr")) || [];
  goalsCont.textContent = "";
  pendingGoalsCount = 0;
  completedGoalsCount = 0;

  const head = document.createElement("div");
  const headClassString =
    "flex justify-between items-center text-black dark:text-white bg-slate-600 dark:bg-gray-950 p-2 rounded";
  head.classList.add(...headClassString.split(" "));

  head.innerHTML = `
  <h3>Today's Goals</h3>
              <h3>Mark as Completed</h3>`;

  goalsCont.appendChild(head);

  dailyGoalsArr.map((val, idx) => {
    let card = document.createElement("div");
    const classString =
      "flex justify-between items-center dark:text-white text-black bg-slate-500 dark:bg-gray-800 p-2 rounded";
    card.classList.add(...classString.split(" "));

    if (val.isCompleted) {
      completedGoalsCount++;
      card.innerHTML = `<p>${val.goal}</p>
              <input id="goalsCheckBox" onclick="goalsInputFunc(this,${idx})" class="bg-black cursor-pointer" type="checkbox" checked/>`;
    } else if (!val.isCompleted) {
      pendingGoalsCount--;
      card.innerHTML = `<p>${val.goal}</p>
              <input id="goalsCheckBox" onclick="goalsInputFunc(this,${idx})" class="bg-black cursor-pointer" type="checkbox"/>`;
    }

    
    goalsCont.appendChild(card);
  });
  console.log(pendingGoalsCount,completedGoalsCount)
  updateTaskChart()
};
renderGoals();



otherFeatures.addEventListener("click", (e) => {
  console.log(e.target.dataset.id);
  if (e.target.dataset.id === "timer") {
    currentOverlayApp = timerSection;
    appsCont.classList.toggle("toggle");
    timerSection.classList.toggle("toggle");
    timerFunc();
  } else if (e.target.dataset.id === "quote") {
    currentOverlayApp = quoteSection;
    appsCont.classList.toggle("toggle");
    quoteSection.classList.toggle("toggle");
  } else if (e.target.dataset.id === "taskManager") {
    currentOverlayApp = taskManagerSection;
    appsCont.classList.toggle("toggle");
    taskManagerSection.classList.toggle("toggle");
  } else if (e.target.dataset.id === "dailyPlanner") {
    currentOverlayApp = dailyPlannerSection;
    appsCont.classList.toggle("toggle");
    dailyPlannerSection.classList.toggle("toggle");
    dailyPlannerFunc();
  } else if (e.target.dataset.id === "dailyGoals") {
    currentOverlayApp = dailyGoalsSection;
    appsCont.classList.toggle("toggle");
    dailyGoalsSection.classList.toggle("toggle");
  }
});
