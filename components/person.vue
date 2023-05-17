<template>
  <div class="person" :class="status">
    <img
      format="webp"
      :src="'/img/' + imageSrc"
      alt="client logo"
      class="slider-image"
      width="80"
      height="80"
    />
  </div>
</template>

<script>
export default {
  props: ["imageSrc", "status"],
};
</script>

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
