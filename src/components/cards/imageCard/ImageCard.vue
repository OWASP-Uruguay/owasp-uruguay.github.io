<script setup>
defineProps({
  sponsor: {
    type: Object,
    required: true,
    name: String,
    image: String,
    link: String,
  },
  class: String,
});
</script>

<template>
  <div :class="class" style="text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 230px;" >
    <a :href="sponsor.link">
      <img :alt="sponsor.name" :src="sponsor.image" style="max-width: 100%; height: 200px; object-fit: contain;"/>
      <h5 class="mb-0">{{ sponsor.name }}</h5>
    </a>
  </div>
</template>
