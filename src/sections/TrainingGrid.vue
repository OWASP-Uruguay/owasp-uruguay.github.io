<script setup>
import HorizontalTeamCard from "@/components/cards/teamCards/HorizontalTeamCard.vue"

import speakerImg1 from "@/assets/img/speakers/Abraham_Aranguren.png"
import speakerImg2 from "@/assets/img/speakers/Aram_Hovsepyan.jpg"
import speakerImg3 from "@/assets/img/speakers/Fabio_Cerullo.png"
import speakerImg4 from "@/assets/img/speakers/Jose_Luis_Zamora.png"
import speakerImg5 from "@/assets/img/speakers/Angel_Santa_Cruz.jpg"
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Trainings
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-4"
              :profile="{ name: 'Aram Hovsepyan', image: `${speakerImg2}` }"
              :conference="{ title: 'OWASP SAMM in Practice', level: 'Introductory and overview', color: 'success',
                description: 'trainingAramDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-5"
              :profile="{ name: 'Fabio Cerullo', image: `${speakerImg3}` }"
              :conference="{ title: 'Secure Coding for Large Language Model Applications', level: 'Intermediate', color: 'warning',
                description: 'trainingFabioDescription' }"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-4 z-index-2"
              :profile="{ name: 'Jose Luis Zamora', image: `${speakerImg4}` }"
              :conference="{ title: 'Capacitador Experto en Ciberseguridad', level: 'Introductory and overview', color: 'success',
                description: 'trainingJoseDescription' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
