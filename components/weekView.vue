<script setup>
import { reactive } from "vue";
import moment from "moment";

const props = defineProps({ data: Array });
const weekArray = reactive([]);
watch(
  () => props.data,
  (first, second) => {
    console.log(
      "Watch props.selected function called with args:",
      first,
      second
    );
    weekArray.splice(0);
    formatData();
  }
);

let everyone = [
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
  { name: "Kristian Thrane", imageSrc: "KristianThrane.jpg" },
  { name: "Kristoffer Jonsson", imageSrc: "KristofferJonsson.jpg" },
  { name: "Lars Jacobsen", imageSrc: "LarsJacobsen.jpg" },
  { name: "Lasse Pedersen", imageSrc: "LassePedersen.jpg" },
  { name: "Line Norgaard", imageSrc: "LineNorgaard.jpg" },
  { name: "Martin Hintzmann", imageSrc: "MartinHintzmann.jpg" },
  { name: "Mikkel Hansen", imageSrc: "MikkelHansen.jpg" },
  { name: "Morten", imageSrc: "Morten.jpg" },
  { name: "Ricky Andersen", imageSrc: "RickyAndersen.jpg" },
];
// const data = ref([]);
// const pending = ref(false);

// var curr = new Date(); // get current date
// var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
// var last = first + 4; // last day is the first day + 6

// var firstday = new Date(curr.setDate(first));
// var lastday = new Date(curr.setDate(last));
// var formattedFirstDay = formatDate(firstday);
// var formattedLastDay = formatDate(lastday);

// // console.log({ formattedFirstDay });
// // console.log({ formattedLastDay });
// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   start: formattedFirstDay.toString(),
//   end: formattedLastDay.toString(),
// });
// let requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
// };

// const { pending, data, error, refresh } = await useFetch(
//   "https://prod-67.westeurope.logic.azure.com:443/workflows/d4b2e94b32c047b794d22acb60dc253e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xfQn5bCTCeDVKzROj5O9jCW0_wl3KhHStjsCRgCQxYc",
//   requestOptions
// );

// const refreshData = () => {
//   refresh();
//   //   weekArray.pop();
//   weekArray.splice(0, weekArray.length);
//   formatData();
//   console.log("refreshed");
// };

formatData();
// const getData = () => {
//   pending.value = true;
//   $fetch(
//     `https://prod-67.westeurope.logic.azure.com:443/workflows/d4b2e94b32c047b794d22acb60dc253e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xfQn5bCTCeDVKzROj5O9jCW0_wl3KhHStjsCRgCQxYc`,
//     requestOptions
//   ).then(function (data) {
//     console.log(data);
//     appendCompanies(data);
//     pending.value = false;
//   });
// };

// const appendCompanies = (newData) => {
//   newData.forEach((one) => {
//     data.value.push(one);
//   });

//   formatData();
// };
// getData();

console.log(props.data);
// let { data } = await useLazyAsyncData(() =>
//   $fetch(
//     "https://prod-67.westeurope.logic.azure.com:443/workflows/d4b2e94b32c047b794d22acb60dc253e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xfQn5bCTCeDVKzROj5O9jCW0_wl3KhHStjsCRgCQxYc",
//     requestOptions
//   )
// );

// console.log(data);

function formatData() {
  everyone.forEach((one) => {
    let obj = {
      name: one.name,
      imageSrc: one.imageSrc,
      1: "kontor",
      2: "kontor",
      3: "kontor",
      4: "kontor",
      5: "kontor",
    };
    toRaw(props.data).forEach((elm) => {
      if (one.name == elm.name) {
        if (elm.type == "Vacation") {
          let startDate = new Date(elm.start.toString());
          let end = moment(elm.end.toString()).utc().format("llll");
          let endDate = new Date(end.toString());
          let startWeekDay = startDate.getDay().toString();
          let endWeekDay = endDate.getDay().toString();
          // console.log(startWeekDay);
          // console.log(endWeekDay);
          // console.log(endDate);
          for (const property in obj) {
            //   console.log(`${property}: ${object[property]}`);
            if (property >= startWeekDay && property <= endWeekDay) {
              console.log(property, obj[property]);
              obj[property] = elm.type;
            }
          }

          // console.log(elm);
        } else {
          // console.log(one);
          // console.log(elm);
          let date = new Date(elm.start.toString());
          let weekDay = date.getDay();
          obj[weekDay] = elm.type;
          // console.log(date.getDay());
        }
      }
    });
    weekArray.push(obj);
  });

  weekArray.forEach((one) => {
    for (var propt in one) {
      // console.log(propt);
      if (one[propt] === "kontor") {
        one[propt] = "🏢";
      }
      if (one[propt] === "Working from home") {
        one[propt] = "🏡";
      }
      if (one[propt] === "Vacation") {
        one[propt] = "🌴";
      }
      if (one[propt] === "Sick") {
        one[propt] = "🤒";
      }
      if (one[propt] === "Out of office") {
        one[propt] = "👻";
      }
    }
  });
}

console.log(weekArray);

function formatDate(date) {
  //   console.log(date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) {
    console.log("yes");
    month = `0${month}`;
  }

  if (day < 10) {
    console.log("yes");
    day = `0${day}`;
  }
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
</script>
<template>
  <div class="weekComponent">
    <span v-if="pending" class="loader"></span>
    <div class="weekGrid">
      <div v-for="(item, index) in weekArray" :key="index">
        <WeekCard :person="item"></WeekCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.person {
  height: 80px;
  width: 80px;
}
.person.active img {
  border: 3px solid #73b783;
}

.person.offline img {
  border: 3px solid #bd4b4b;
}

.person img {
  border-radius: 50%;
}
</style>
