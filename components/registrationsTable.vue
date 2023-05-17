<script setup>
const props = defineProps({ registrations: Array });
// console.log(props.registrations);

// let fields = Object.keys(props.registrations[0]);
let fields = ["Navn", "Email", "Type", "Start", "Slut", "Link"];
let textValues = [];

props.registrations.forEach((one) => {
  console.log(one);

  let object = {
    name: one.name,
    email: one.email,
    type: one.type,
    start: one.start,
    end: one.end,
  };

  //   console.log(object);

  textValues.push(one);
});

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
  //   console.log(JSON.stringify(data));
  //   console.log(response);
  return response.json(); // parses JSON response into native JavaScript objects
}

function deleteEntry(id) {
  postData(
    "https://prod-25.westeurope.logic.azure.com:443/workflows/be90d5882eb74132bb6b274a4dab2dcb/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1mOW5nfAKg3xYvM4oW8o7WEcf74eNvTHyyHjxeuMu60",
    buildPayloadForDelete(id)
  ).then((data) => {
    console.log(data);
  });

  var row = document.getElementById(id);
  var table = row.parentNode;
  while (table && table.tagName != "TABLE") table = table.parentNode;
  if (!table) return;
  table.deleteRow(row.rowIndex);
}

function buildPayloadForDelete(id) {
  var payload = {
    calendarId: id,
  };
  return payload;
}
</script>

<template>
  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
      <tr>
        <!-- loop through each value of the fields to get the table header -->
        <th v-for="field in fields" :key="field">
          {{ field }}
          <i class="bi bi-sort-alpha-down" aria-label="Sort Icon"></i>
        </th>
      </tr>
    </thead>

    <tr v-for="obj in registrations" :id="obj.calendarId">
      <td>{{ obj.name }}</td>
      <td>{{ obj.email }}</td>
      <td>{{ obj.type }}</td>
      <td>{{ obj.start }}</td>
      <td>{{ obj.end }}</td>
      <td>
        <div class="deleteBtn" @click="deleteEntry(obj.calendarId)">SLET</div>
      </td>

      <!-- <td v-for="cell[name] in obj">{{ cell }}</td> -->
    </tr>
    <!-- <tbody>

      <tr v-for="item in filteredList" :key="item">
        <td v-for="field in fields" :key="field">{{ item[field] }}</td>
      </tr>
    </tbody> -->
  </table>
</template>

<!-- <style scoped>
.flex {
  color: v-bind(color)
}
</style> -->
