<script setup>
import { GoogleMap, AdvancedMarker } from 'vue3-google-map';

defineProps({
  center: {
    type: Object,
    default: () => ({ lat: -34.902953, lng: -56.134874 }),
  },
});
</script>
<template>
  <GoogleMap
      api-key="AIzaSyBGKyu-OD2tanwB8rFXAN-z1rSyhNg_37o"
      mapId="antel-tower-owasp-appsec-days-2025-uruguay"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="17"
  >
    <AdvancedMarker :options="{ position: center }" />
  </GoogleMap>
</template>
