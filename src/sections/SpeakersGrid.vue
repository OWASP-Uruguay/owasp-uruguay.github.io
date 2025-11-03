<script setup>
import HorizontalTeamCard from "@/components/cards/teamCards/HorizontalTeamCard.vue"

import speakerImg1 from "@/assets/img/speakers/Aditya_Singh.jpg"
import speakerImg2 from "@/assets/img/speakers/Aram_Hovsepyan.jpg"
import speakerImg3 from "@/assets/img/speakers/August_Joseph.jpg"
import speakerImg4 from "@/assets/img/speakers/Axel_Labruna.jpg"
import speakerImg5 from "@/assets/img/speakers/Danish_Tariq.jpeg"
import speakerImg6 from "@/assets/img/speakers/Eva_Ferreira.jpg"
import speakerImg7 from "@/assets/img/speakers/Jose_Sevilla.jpg"
import speakerImg8 from "@/assets/img/speakers/Miguel_Alonso_Lopez_Abarca.jpg"
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
              :conference="{ title: 'Ghost in the Machine: Exploiting Hardware & Network Fingerprints for Tracking', level: 'Intermediate', color: 'warning',
                description: 'conferenceAdityaDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Aram Hovsepyan', image: `${speakerImg2}` }"
              :conference="{ title: 'Your Security Dashboard is Lying to You: The Science of Metrics', level: 'Introductory and overview', color: 'success',
                description: 'conferenceAramDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'August Joseph', image: `${speakerImg3}` }"
              :conference="{ title: 'The Birthplace of Lies: Hacking Analytics SDKs', level: 'Intermediate', color: 'warning',
                description: 'conferenceAugustDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Axel Labruna', image: `${speakerImg4}` }"
              :conference="{ title: 'Desafiando las fronteras del Pentesting - La era de la IA', level: 'Intermediate', color: 'warning',
                description: 'conferenceAxelDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Danish Tariq', image: `${speakerImg5}` }"
              :conference="{ title: 'Zero to Owned: Mapping the Lifecycle of a Credential Stealer to Corporate Breach', level: 'Introductory and overview', color: 'success',
                description: 'conferenceDanishDescription' }"
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
              :conference="{ title: 'Amenazas y Contramedidas en SDLC para IA: OWASP Top 10 y Más Allá', level: 'Intermediate', color: 'warning',
                description: 'conferenceJoseDescription' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Miguel Alonso Lopez Abarca', image: `${speakerImg8}` }"
              :conference="{ title: '¿Seguro que tu app es segura? Lecciones desde el lado ofensivo', level: 'Intermediate', color: 'warning',
                description: 'conferenceMiguelDescription' }"
          />
        </div>
      </div>
<!--      <div class="row mt-4">-->
<!--        <div class="col-lg-6 col-12">-->
<!--          <HorizontalTeamCard-->
class="mt-lg-4 mt-4"
<!--              :profile="{ name: 'Angel Santa Cruz', image: `${speakerImg5}` }"-->
<!--              :conference="{ title: 'Security Threat Modeling Workshop', level: 'Advanced', color: 'danger',-->
<!--                description: 'conferenceAngelDescription' }"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </section>
</template>
