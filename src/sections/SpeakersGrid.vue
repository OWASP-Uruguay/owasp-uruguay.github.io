<script setup>
import HorizontalTeamCard from "@/components/cards/teamCards/HorizontalTeamCard.vue"

import speakerImg1 from "@/assets/img/speakers/Aditya_Singh.jpg"
import speakerImg2 from "@/assets/img/speakers/Andres_Gomez.jpg"
import speakerImg3 from "@/assets/img/speakers/Aram_Hovsepyan.jpg"
import speakerImg4 from "@/assets/img/speakers/August_Joseph.jpg"
import speakerImg5 from "@/assets/img/speakers/Axel_Labruna.jpg"
import speakerImg51 from "@/assets/img/speakers/Matias_Armandola.jpg"
import speakerImg6 from "@/assets/img/speakers/Eva_Ferreira.jpg"
import speakerImg7 from "@/assets/img/speakers/Jose_Sevilla.jpg"
import speakerImg71 from "@/assets/img/speakers/Angel_Santa_Cruz.jpg"

import speakerImg8 from "@/assets/img/speakers/Mauro_Flores.jpg"
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Conferences
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Aditya Singh', image: `${speakerImg1}` }"
              :conference="{ title: 'Ghost in the Machine: Exploiting Hardware & Network Fingerprints for Tracking (English)', level: 'Intermediate', color: 'warning',
                description: 'conferenceAdityaDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Andrés Gómez', image: `${speakerImg2}` }"
              :conference="{ title: 'Pentesting like a Ransomware Gang', level: 'Advanced', color: 'danger',
                description: 'conferenceAndresDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Aram Hovsepyan', image: `${speakerImg3}` }"
              :conference="{ title: 'Your Security Dashboard is Lying to You: The Science of Metrics (English)', level: 'Introductory and overview', color: 'success',
                description: 'conferenceAramDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'August Joseph', image: `${speakerImg4}` }"
              :conference="{ title: 'The Birthplace of Lies: Hacking Analytics SDKs (English)', level: 'Intermediate', color: 'warning',
                description: 'conferenceAugustDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Axel Labruna', image: `${speakerImg5}` }"
              :profile2="{ name: 'Matias_Armandola', image: `${speakerImg51}` }"
              :conference="{ title: 'Desafiando las fronteras del Pentesting - La era de la IA', level: 'Intermediate', color: 'warning',
                description: 'conferenceAxelDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Eva Ferreira', image: `${speakerImg6}` }"
              :conference="{ title: 'Cryptography for lovers 💘', level: 'Intermediate', color: 'warning',
                description: 'conferenceEvaDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Jose Angel Sevilla', image: `${speakerImg7}` }"
              :profile2="{ name: 'Angel Santa Cruz', image: `${speakerImg71}` }"
              :conference="{ title: 'Amenazas y Contramedidas en SDLC para IA: OWASP Top 10 y Más Allá', level: 'Intermediate', color: 'warning',
                description: 'conferenceJoseDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Mauro Flores', image: `${speakerImg8}` }"
              :conference="{ title: 'DevSecOps Real Life Challenges', level: 'Intermediate', color: 'warning',
                description: 'conferenceMauroDescription' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
