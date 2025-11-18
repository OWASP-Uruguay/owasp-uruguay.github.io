<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import HorizontalTeamCard from "@/components/cards/teamCards/HorizontalTeamCard.vue"

import owaspUYLogo from "@/assets/img/owasp-uy.png"
import speakerImg1 from "@/assets/img/speakers/Matias_Ferreira.png"
import speakerImg2 from "@/assets/img/speakers/Andres_Gomez.jpg"
import speakerImg3 from "@/assets/img/speakers/Aram_Hovsepyan.jpg"
import speakerImg4 from "@/assets/img/speakers/Felipe_Zipitria.jpg"
import speakerImg41 from "@/assets/img/speakers/Agustin_DeLeon.jpg"
import speakerImg5 from "@/assets/img/speakers/Axel_Labruna.png"
import speakerImg51 from "@/assets/img/speakers/Matias_Armandola.jpg"
import speakerImg6 from "@/assets/img/speakers/Eva_Ferreira.jpg"
import speakerImg7 from "@/assets/img/speakers/Jose_Sevilla.jpg"

import speakerImg8 from "@/assets/img/speakers/Mauro_Flores.jpg"
import MaterialAvatar from "@/components/MaterialAvatar.vue";

const OWASPUY = "OWASP UY";
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Conferences - 20 Nov
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>09:00 - 09:45</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>{{t("registration")}}</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>09:45 - 10:00</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12 mt-lg-4 mt-4">
          <div class="card card-profile">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-12" style="text-align: center;">
                <div class="p-3 pe-md-0">
                  <MaterialAvatar :alt="OWASPUY" :image="owaspUYLogo"/>
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12 my-auto">
                <div class="card-body ps-lg-0">
                  <h3 class="mb-0">{{t("welcoming")}}</h3>
                  <h4 class="mb-0">OWASP UY</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>10:00 - 10:40</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Axel Labruna', image: `${speakerImg5}` }"
              :profile2="{ name: 'Matias Armandola', image: `${speakerImg51}` }"
              :conference="{ title: 'Desafiando las fronteras del Pentesting - La era de la IA', level: 'Intermediate', color: 'warning',
                description: 'conferenceAxelDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>10:40 - 11:20</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Aram Hovsepyan', image: `${speakerImg3}` }"
              :conference="{ title: 'Your Security Dashboard is Lying to You: The Science of Metrics (English)', level: 'Introductory and overview', color: 'success',
                description: 'conferenceAramDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>11:20 - 11:50</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>Coffee Break</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>11:50 - 12:30</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Jose Angel Sevilla', image: `${speakerImg7}` }"
              :conference="{ title: 'Amenazas y Contramedidas en SDLC para IA: OWASP Top 10 y Más Allá', level: 'Intermediate', color: 'warning',
                description: 'conferenceJoseDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>12:30 - 13:10</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Matias Ferriera', image: `${speakerImg1}` }"
              :conference="{ title: 'Fast and Furious: Reto DevSecOps', level: 'Introductory and overview', color: 'success',
                description: 'conferenceMatoDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>13:10 - 14:10</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>{{t("lunch")}}</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>14:10 - 14:50</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Felipe Zipitria', image: `${speakerImg4}` }"
              :profile2="{ name: 'Agustín De León', image: `${speakerImg41}` }"
              :conference="{ title: 'Towards the next generation OWASP CRS ruleset language', level: 'Intermediate', color: 'warning',
                description: 'conferenceAgustinZDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>14:50 - 15:30</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Eva Ferreira', image: `${speakerImg6}` }"
              :conference="{ title: 'Cryptography for lovers 💘', level: 'Intermediate', color: 'warning',
                description: 'conferenceEvaDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>15:30 - 16:00</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>Coffee Break</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>16:00 - 16:40</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Mauro Flores', image: `${speakerImg8}` }"
              :conference="{ title: 'DevSecOps Real Life Challenges', level: 'Intermediate', color: 'warning',
                description: 'conferenceMauroDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>16:40 - 17:20</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <HorizontalTeamCard
              class="mt-lg-4 mt-4"
              :profile="{ name: 'Andrés Gómez', image: `${speakerImg2}` }"
              :conference="{ title: 'Pentesting like a Ransomware Gang', level: 'Intermediate', color: 'warning',
                description: 'conferenceAndresDescription' }"
              :dualSpace=true
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-12 text-center">
          <div class="card mt-lg-4 mt-4">
            <h3>17:20 - 17:30</h3>
          </div>
        </div>
        <div class="col-lg-9 col-12 mt-lg-4 mt-4">
          <div class="card card-profile">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-12" style="text-align: center;">
                <div class="p-3 pe-md-0">
                  <MaterialAvatar :alt="OWASPUY" :image="owaspUYLogo"/>
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12 my-auto">
                <div class="card-body ps-lg-0">
                  <h3 class="mb-0">{{t("ending")}}</h3>
                  <h4 class="mb-0">OWASP UY</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
