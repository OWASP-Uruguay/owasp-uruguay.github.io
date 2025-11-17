<script setup>
import HorizontalTeamCard from "@/components/cards/teamCards/HorizontalTeamCard.vue"

import speakerImg1 from "@/assets/img/speakers/Aram_Hovsepyan.jpg"
import speakerImg2 from "@/assets/img/speakers/Nariman_Aga_Tagiyev.jpg"
import speakerImg4 from "@/assets/img/speakers/Jose_Luis_Zamora.png"

import GoogleMapsTraining from "@/components/GoogleMapsTraining.vue";
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-4">
          <h3 class="text-white z-index-1 position-relative">
            Trainings - 19 Nov
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>09:00 - 13:00</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Jose Luis Zamora', image: `${speakerImg4}` }"
              :conference="{ title: 'Capacitador Experto en Ciberseguridad', level: 'Introductory and overview', color: 'success',
                description: 'trainingJoseDescription' }"
              :dualSpace=true
          />
        </div>
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>09:00 - 17:00</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
        <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Aram Hovsepyan', image: `${speakerImg1}` }"
              :profile2="{ name: 'Nariman Aga-Tagiyev', image: `${speakerImg2}` }"
              :conference="{ title: 'OWASP SAMM in Practice (English)', level: 'Introductory and overview', color: 'success',
                description: 'trainingAramDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
    </div>

    <h5 class="text-white z-index-1 position-relative mt-lg-5">Training Venue: Sala Dakar, Planta Baja, WTC Free Zone, Torre 1 (Luis Bonavita 1294)</h5>

    <GoogleMapsTraining/>
  </section>
</template>
