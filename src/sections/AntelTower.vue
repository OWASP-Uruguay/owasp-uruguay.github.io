<script setup>
import antelTowerImage from "@/assets/img/antel-tower.png";
import antelAuditoriumImage from "@/assets/img/antel-auditorium.jpg";
</script>

<template>
  <div class="flex-row align-content-center flexp-medium">
    <div class="flex-column col-lg-6" style="display: flex; justify-content: center; align-items: center;">
      <img class="img-fluid p-3" style="width: 100%" alt="Torre de las telecomunicaciones de ANTEL"  :src="antelTowerImage" loading="lazy" />
      <img class="img-fluid p-3" alt="Auditorio de la Torre de las Comunicaciones de ANTEL" :src="antelAuditoriumImage" loading="lazy" />
    </div>
    <div class="flex-column col-lg-6" style="display: flex; justify-content: center; align-items: center;">
      <h2 class="h0 text-center" style="color: #9c8cfb;" >Auditorio de la Torre de las Comunicaciones de ANTEL</h2>
      <h3 class="h0 text-center" style="color: #F7F7F7;">Guatemala 1075, Montevideo, Uruguay</h3>
    </div>
  </div>
  <div class="text-white pt-4 card-text">
    <h5 class="text-white">{{ $t("venueDescription1") }}</h5>
    <h5 class="text-white">{{ $t("venueDescription2") }}</h5>
    <h5 class="text-white">{{ $t("venueDescription3") }}</h5>
    <h5 class="text-white">{{ $t("venueDescription4") }}</h5>
    <ul class="text-lg">
      <li><h5 class="text-white">{{ $t("venueDescription5") }}</h5></li>
      <li><h5 class="text-white">{{ $t("venueDescription6") }}</h5></li>
      <li><h5 class="text-white">{{ $t("venueDescription7") }}</h5></li>
      <li><h5 class="text-white">{{ $t("venueDescription8") }}</h5></li>
      <li><h5 class="text-white">{{ $t("venueDescription9") }}</h5></li>
      <li><h5 class="text-white">{{ $t("venueDescription10") }}</h5></li>
    </ul>
    <h5 class="text-white">{{ $t("venueDescription11") }}</h5>
  </div>
</template>

<style>
@media (max-width: 990px) {
  .h0 {
    font-size: 2rem !important;
  }
}
@media (min-width: 990px) {
  .flexp-medium {
    display: flex;
  }
  .h0 {
    font-size: calc(2.25rem + 3vw);
  }
}
@media (min-width: 2100px) {
  .h0 {
    font-size: calc(3rem + 4vw);
  }
}
</style>
