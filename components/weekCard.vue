<template>
  <div class="personWeek">
    <img
      format="webp"
      :src="'/img/' + person.imageSrc"
      alt="client logo"
      class="slider-image"
      width="80"
      height="80"
    />
    <div class="weekWrapper">
      <p>{{ person[1] }} <span>Mandag</span></p>
      <p>{{ person[2] }} <span>Tirsdag</span></p>
      <p>{{ person[3] }} <span>Onsdag</span></p>
      <p>{{ person[4] }} <span>Torsdag</span></p>
      <p>{{ person[5] }} <span>Fredag</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["person"],
};
</script>

<style scoped>
.personWeek {
  height: 85px;
  padding: 35px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.weekWrapper {
  margin-left: 15px;
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
