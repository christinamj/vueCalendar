<script setup>
// const props = defineProps({ registrations: Array });
import { onMounted } from "vue";
import { reactive } from "vue";
const addedStatus = useState("addedStatus");
import moment from "moment";
const added = reactive({
  amount: 0,
});
moment("2016-07-02T19:27:28.000+0000").format("MMMM Do YYYY, h:mm:ss a");

onMounted(() => {
  showHideDiv();
});
// console.log("Add status");

function showHideDiv() {
  //   console.log("show hide");
  //setup interface according to start/end rules
  var typeSelector = document.getElementById("type");
  var startDateRow = document.getElementById("startDateRow");
  var endDateRow = document.getElementById("endDateRow");
  if (typeSelector.value == "Working from home") {
    startDateRow.style.display = "flex";
    endDateRow.style.display = "none";
  } else if (typeSelector.value == "Sick") {
    startDateRow.style.display = "none";
    endDateRow.style.display = "none";
  } else if (typeSelector.value == "Vacation") {
    startDateRow.style.display = "flex";
    endDateRow.style.display = "flex";
  } else if (typeSelector.value == "Out of office") {
    startDateRow.style.display = "flex";
    endDateRow.style.display = "flex";
  }
}

async function postData(url = "", data = {}) {
  let loader = document.querySelector(".loadSpan");

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
  //   console.log(JSON.stringify(data));
  //   console.log(response);
  loader.classList.remove("loader");
  //   added.amount = added.amount + 1;

  addedStatus.value++;
  return response.json(); // parses JSON response into native JavaScript objects
}

const clearAmountState = () => {
  //   console.log("Clear amount");
  addedStatus.value = 0;
};

defineExpose({
  clearAmountState,
});

function buildPayload() {
  let loader = document.querySelector(".loadSpan");
  loader.classList.add("loader");
  var typeSelector = document.getElementById("type");
  var email = document.getElementById("email");
  var startDate;
  var endDate;

  if (typeSelector.value == "Working from home") {
    //handle start/end times according to type; ie sick days are always registered on actual day
    startDate = document.getElementById("startDate").value;
    endDate = startDate;
  } else if (typeSelector.value == "Sick") {
    startDate = new Date().toISOString().split(".")[0].slice(0, 14) + "00";
    endDate = startDate;
  } else if (typeSelector.value == "Vacation") {
    // startDate = "2023-05-08T14:48:00";
    // endDate = "2023-05-10T14:48:00";
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;
    // startDate = moment(start.toString()).format("MMMM Do YYYY, h:mm:ss");
    // endDate = moment(end.toString()).format("MMMM Do YYYY, h:mm:ss");
  } else if (typeSelector.value == "Out of office") {
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;
  }
  startDate += ":00"; //we dont want to add seconds when registering, but ISO 8601 specifies ss to be included, so we just lazy add it
  endDate += ":00";

  var payload = {
    assignee: email.value,
    availability: typeSelector.value,
    comment: "",
    start: startDate,
    end: endDate,
  };

  return payload;
}
</script>

<template>
  <h3>Opret status</h3>
  <form class="addForm">
    <table>
      <tr id="emailRow">
        <td><label for="email">Email:</label></td>
        <td><input type="text" id="email" name="email" /></td>
      </tr>
      <tr id="typeRow">
        <td><label for="type">Type:</label></td>
        <td>
          <select name="type" id="type" @input="showHideDiv()">
            <option value="Working from home">Arbejder hjemme</option>
            <option value="Sick">Syg</option>
            <option value="Vacation">Ferie</option>
            <option value="Out of office">Væg fra kontoret</option>
          </select>
        </td>
      </tr>
      <tr id="startDateRow">
        <td><label for="startDate">Start:</label></td>
        <td>
          <input type="datetime-local" id="startDate" name="startDate" />
        </td>
      </tr>
      <tr id="endDateRow">
        <td><label for="endDate">Slut:</label></td>
        <td>
          <input type="datetime-local" id="endDate" name="endDate" />
        </td>
      </tr>
    </table>
  </form>
  <div class="addBtn">
    <a
      @click="
        postData(
          'https://prod-135.westeurope.logic.azure.com:443/workflows/e8750bb847624d5a9ba34d2088445b37/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jAfQEoFXUfoNE6Fxo-n12jhwWfDpSvjBGPm1BqCFp8M',
          buildPayload()
        )
      "
      class="btn"
      >Opret</a
    >
    <span class="loadSpan"></span>
  </div>
  <div class="succesMessage" v-if="addedStatus > 0">
    <img src="/img/check-solid.svg" alt="" />
    <p>{{ addedStatus }} er oprettet</p>
  </div>
</template>

<!-- <style scoped>
.flex {
  color: v-bind(color)
}
</style> -->
