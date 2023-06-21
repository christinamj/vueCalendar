<script setup>
import { isProxy, toRaw } from "vue";
import { ref } from "vue";
let isApiRespond = ref(false);
import { reactive } from "vue";
const addComponent = ref();
const nuxtApp = useNuxtApp();
const dayData = useState("dayData");
const weekStateData = useWeekData();
const deletedStatus = useDeletedStatus();
const addedStatus = useAddedStatus();
const userNew = useUser();
// console.log(removed);

// console.log(dayData.value);
// console.log(addComponent);
nuxtApp.$getAccounts();

const state = reactive([]);
const pending = ref(false);
// const view = reactive({
//   chosen: "week",
// });
onBeforeMount(() => {
  const accounts = nuxtApp.$getAccounts();
  if (accounts.length) {
    const user = {
      isUserSignedIn: true,
      name: accounts[0].name,
      id: accounts[0].localAccountId,
      homeId: accounts[0].homeAccountId,
      country: accounts[0].idTokenClaims.country,
    };
    userNew.value = user;
  }
});
function formatDate(date) {
  //   console.log(date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

async function getDayData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  let formattedDate = `${year}-${month}-${day}`;

  var raw = JSON.stringify({
    start: formattedDate.toString(),
    end: formattedDate.toString(),
  });
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await useFetch(
    `https://prod-67.westeurope.logic.azure.com:443/workflows/d4b2e94b32c047b794d22acb60dc253e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xfQn5bCTCeDVKzROj5O9jCW0_wl3KhHStjsCRgCQxYc`,
    requestOptions
  ).then(function (data) {
    dayData.value = data.data.value;
    formatDayData();
  });
}

async function getWeekData() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  var last = first + 4; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));
  var formattedFirstDay = formatDate(firstday);
  var formattedLastDay = formatDate(lastday);

  // console.log({ formattedFirstDay });
  // console.log({ formattedLastDay });
  var myHeaders2 = new Headers();
  myHeaders2.append("Content-Type", "application/json");

  const now = new Date();
  const earlyStart = new Date(
    firstday.getFullYear(),
    firstday.getMonth(),
    firstday.getDate() - 28
  );
  const lateEnd = new Date(
    lastday.getFullYear(),
    lastday.getMonth(),
    lastday.getDate() + 28
  );
  const earlyStartFormatted = formatDate(earlyStart);
  const lateEndFormatted = formatDate(lateEnd);

  var raw2 = JSON.stringify({
    start: earlyStartFormatted.toString(),
    end: lateEndFormatted.toString(),
  });
  let requestOptions2 = {
    method: "POST",
    headers: myHeaders2,
    body: raw2,
    redirect: "follow",
  };

  pending.value = true;

  await useFetch(
    `https://prod-67.westeurope.logic.azure.com:443/workflows/d4b2e94b32c047b794d22acb60dc253e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xfQn5bCTCeDVKzROj5O9jCW0_wl3KhHStjsCRgCQxYc`,
    requestOptions2
  ).then(function (data) {
    console.log("data", data);
    // weekStateData.value = data.data.value;
    pending.value = false;

    data.data.value.forEach((one) => {
      if (
        (one.start >= formattedFirstDay && one.start <= formattedLastDay) ||
        (one.end >= formattedFirstDay && one.end <= formattedLastDay)
      ) {
        console.log(one);
        weekStateData.value.push(one);
      }
    });
  });
}

// getWeekData();
getDayData();

let initialEveryone = [
  { name: "Adam", imageSrc: "Adam.jpg" },
  { name: "Ane Courage", imageSrc: "AneCourage.jpg" },
  { name: "Anja", imageSrc: "Anja.jpg" },
  { name: "Benjamin Burnett", imageSrc: "BenjaminBurnett.jpg" },
  { name: "Christina Jørgensen", imageSrc: "ChristinaJørgensen.jpg" },
  { name: "Hanne", imageSrc: "Hanne.jpg" },
  { name: "Ida", imageSrc: "Ida.jpg" },
  { name: "Jan Johansen", imageSrc: "JanJohansen.jpg" },
  { name: "Jesper Halliday", imageSrc: "JesperHalliday.jpg" },
  { name: "Jonas Palm", imageSrc: "JonasPalm.jpg" },
  { name: "Jonas", imageSrc: "Jonas.jpg" },
  { name: "Gansted", imageSrc: "Gansted.jpg" },
  { name: "Kristian", imageSrc: "KristianThrane.jpg" },
  { name: "Kristoffer Jonsson", imageSrc: "KristofferJonsson.jpg" },
  { name: "Lars Jacobsen", imageSrc: "LarsJacobsen.jpg" },
  { name: "Lasse Pedersen", imageSrc: "LassePedersen.jpg" },
  { name: "Line Norgaard", imageSrc: "LineNorgaard.jpg" },
  { name: "Martin Hintzmann", imageSrc: "MartinHintzmann.jpg" },
  { name: "Mikkel Hansen", imageSrc: "MikkelHansen.jpg" },
  { name: "Morten", imageSrc: "Morten.jpg" },
  { name: "Ricky Andersen", imageSrc: "RickyAndersen.jpg" },
];

let everyone = reactive(initialEveryone);
let home = [];
let sick = [];
let vacation = [];
let away = [];
const registered = reactive([]);
// let registrered = [];

// console.log(toRaw(data.value));
// console.log(data.value);

const formatDayData = () => {
  toRaw(dayData.value).forEach((one) => {
    if (one.type == "Working from home") {
      let str = one.name.replace(/\s+/g, "");
      one.imageSrc = `${str}.jpg`;
      home.push(one);
      everyone = everyone.filter((person) => person.name != one.name);
    } else if (one.type == "Out of office") {
      let str = one.name.replace(/\s+/g, "");
      one.imageSrc = `${str}.jpg`;
      // console.log("Out of office");
      away.push(one);

      everyone = everyone.filter((person) => person.name != one.name);
    } else if (one.type == "Sick") {
      let str = one.name.replace(/\s+/g, "");
      one.imageSrc = `${str}.jpg`;
      // console.log("sick");
      sick.push(one);

      everyone = everyone.filter((person) => person.name != one.name);
    } else if (one.type == "Vacation") {
      let str = one.name.replace(/\s+/g, "");
      one.imageSrc = `${str}.jpg`;
      // console.log("Vacation");
      vacation.push(one);

      everyone = everyone.filter((person) => person.name != one.name);
    }
  });
};

const add = () => {
  // console.log("clicked");
  document.querySelector(".addStatus").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");

  document.querySelector(".overlay").addEventListener("click", () => {
    document.querySelector(".addStatus").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    if (addedStatus.value > 0) {
      // getWeekData();
      getDayData();
      addedStatus.value = 0;
    }

    // this.$refs.weekRef.refreshData();
  });
};

// const refreshData = () => {
//   console.log("refreshed");
//   refresh();
//   weekStateData.value = weekData.value;
//   // console.log(weekData);
// };

// const refreshDayData = () => {
//   // console.log("refreshed");
//   console.log("refreshing day");
//   refreshDay();
//   dayData.value = data.value;

//   // console.log(weekData);
// };

function signIn() {
  this.$msal.signIn();
}

const deleteStatus = () => {
  document.querySelector(".deleteStatus").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");

  document.querySelector(".overlay").addEventListener("click", () => {
    document.querySelector(".deleteStatus").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    if (deletedStatus.value == true) {
      everyone = initialEveryone;
      home = [];
      sick = [];
      vacation = [];
      away = [];
      // getWeekData();
      getDayData();
    }
    deletedStatus.value = false;
    state.splice(0);
  });
};

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    //mode: "no-cors", // cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    //redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // console.log(JSON.stringify(data));
  // console.log(response);
  return response.json(); // parses JSON response into native JavaScript objects
}

function loadEntries() {
  document.querySelector(".loaderSpan").classList.add("loader");
  // let table = document.querySelector("table#results");
  // table.innerHTML = "";
  postData(
    "https://prod-239.westeurope.logic.azure.com:443/workflows/795a62e8bd5847c9b4659aae53e09190/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OBT7p19kePGkzXtOioxwPjIY9dgvGJla_z54nZoZRsg",
    buildPayloadForEntries()
  ).then((data) => {
    // console.log(data);
    buildResults(data.results);
  });
}

function buildPayloadForEntries() {
  var email = document.getElementById("deleteEmail");
  // console.log(email);
  var payload = {
    email: email.value,
  };
  return payload;
}

function buildResults(json) {
  // console.log(json);

  json.forEach((one) => {
    one.start = new Date(one.start).toLocaleDateString("da-DK");
    one.end = new Date(one.end).toLocaleDateString("da-DK");
    if (one.type == "Working from home") {
      one.type = "Arbejder hjemme";
    } else if (one.type == "Sick") {
      one.type = "Syg";
    } else if (one.type == "Vacation") {
      one.type = "Ferie";
    } else if (one.type == "Out of office") {
      one.type = "Væk fra kontoret";
    }
    state.push(one);
    // console.log(one);
  });
  document.querySelector(".loaderSpan").classList.remove("loader");
}

function weekView() {
  document.querySelector(".week").classList.add("active");
  document.querySelector(".day").classList.remove("active");
  // view.chosen = "week";
}

function dayView() {
  document.querySelector(".week").classList.remove("active");
  document.querySelector(".day").classList.add("active");
  // view.chosen = "day";
}
</script>

<template>
  <div v-if="!userNew.isUserSignedIn" class="signin">
    <div class="signInContent">
      <div class="headerLogo">
        <img class="logo" src="/img/ApplyLogotypeBlackLarge.svg" alt="" />
        <h1>Status</h1>
      </div>
      <p>Login for at tilgå overbliksværktøjet</p>
      <button class="btn" @click="nuxtApp.$signIn">Log in</button>
    </div>
  </div>
  <div class="overlay hidden"></div>
  <div v-if="userNew.isUserSignedIn" class="loggedInView">
    <div class="bodyTop">
      <!-- <p>{{ userNew }} user</p> -->

      <!-- <button @click="nuxtApp.$getAccounts">Get accounts</button> -->

      <div class="addDelete">
        <div class="add" @click="add">
          <img src="/img/square-plus-solid.svg" alt="" />
          <p>Opret status</p>
        </div>
        <div class="delete" @click="deleteStatus">
          <img src="/img/square-minus-solid.svg" alt="" />
          <p>Slet status</p>
        </div>
      </div>
      <div class="signOutBtn">
        <button @click="nuxtApp.$signOut" class="btn">Log ud</button>
      </div>
    </div>
    <div class="main">
      <div class="headerLogo">
        <img class="logo" src="/img/ApplyLogotypeBlackLarge.svg" alt="" />
        <h1>Status</h1>
      </div>
      <!-- <p>Visning:</p> -->
      <!-- <div class="view">
        <p @click="weekView" class="viewOption week active">Uge</p>
        <p>|</p>
        <p @click="dayView" class="viewOption day">Dag</p>
      </div> -->
      <!-- <div>{{ state }}</div> -->
      <div class="dayContainer">
        <div v-if="home.length > 0">
          <div class="emojiLabel">
            <p class="emoji">🏡</p>
            <p>Hjemme</p>
          </div>
          <div class="dayGrid">
            <div v-for="(item, index) in home" :key="index">
              <Person :imageSrc="item.imageSrc" status="active"></Person>
            </div>
          </div>
        </div>

        <div v-if="sick.length > 0">
          <div class="emojiLabel">
            <p class="emoji">🤒</p>
            <p>Syg</p>
          </div>
          <div class="dayGrid">
            <div v-for="(item, index) in sick" :key="index">
              <Person :imageSrc="item.imageSrc" status="active"></Person>
            </div>
          </div>
        </div>

        <div v-if="away.length > 0">
          <div class="emojiLabel">
            <p class="emoji">👻</p>
            <p>Væk fra kontoret</p>
          </div>
          <div class="dayGrid">
            <div v-for="(item, index) in away" :key="index">
              <Person :imageSrc="item.imageSrc" status="offline"></Person>
            </div>
          </div>
        </div>
        <div v-if="vacation.length > 0">
          <div class="emojiLabel">
            <p class="emoji">🌴</p>
            <p>Væk fra kontoret</p>
          </div>
          <div class="dayGrid">
            <div v-for="(item, index) in vacation" :key="index">
              <Person :imageSrc="item.imageSrc" status="offline"></Person>
            </div>
          </div>
        </div>
        <div v-if="everyone.length > 0">
          <div class="emojiLabel">
            <p class="emoji">🏢</p>
            <p>På kontoret</p>
          </div>
          <div class="dayGrid">
            <div v-for="(item, index) in everyone" :key="index">
              <Person :imageSrc="item.imageSrc" status="active"></Person>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="weekContainer" v-if="view.chosen == 'week'">
        <span v-if="pending" class="loader pendingLoader"></span>
        <WeekView :data="weekStateData" ref="weekRef"></WeekView>
      </div> -->
      <div class="addStatus hidden">
        <AddStatus ref="addComponent"></AddStatus>
      </div>
      <div class="deleteContainer">
        <div class="deleteStatus hidden">
          <h3>Slet status</h3>
          <form class="deleteForm">
            <table>
              <tr id="emailRow">
                <td><label for="email">Email:</label></td>
                <td><input type="text" id="deleteEmail" name="email" /></td>
              </tr>
            </table>
          </form>
          <a class="btn" @click="loadEntries">Hent værdier</a>
          <span class="loaderSpan"></span>
          <div id="status"></div>
          <!-- <table id="results"></table> -->

          <div class="tableDiv" v-if="state.length > 0">
            <RegistrationsTable :registrations="state"></RegistrationsTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emojiLabel {
  margin-bottom: 30px;
}
.emoji {
  width: fit-content;
  font-size: 32px;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
</style>

<style src="/assets/styles/global.css">
@import "/assets/styles/global.css";
</style>
