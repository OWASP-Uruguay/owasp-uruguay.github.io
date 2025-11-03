<script setup>
import ImageCard from "@/components/cards/imageCard/ImageCard.vue"

import sponsorImage1 from "@/assets/img/sponsors/Grant_Thornton-logo.png"
import sponsorImage2 from "@/assets/img/sponsors/Lugapel-logo.jpeg"
import sponsorImage3 from "@/assets/img/sponsors/Tilsor-logo.svg"
import sponsorImage4 from "@/assets/img/sponsors/Xygeni-logo.png"
import communitySponsorImage1 from "@/assets/img/sponsors/InfoSecMap-logo.png"
import venueSponsorImage1 from "@/assets/img/sponsors/Antel-Logo.png"
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Sponsors
          </h3>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 text-start mt-5">
          <h4 class="text-white z-index-1 position-relative">
            Silver
          </h4>
        </div>
      </div>
      <div class="row">
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12 mr-1`"
            :sponsor="{ name: 'Grant Thornton', image: `${sponsorImage1}`, link: 'https://www.grantthornton.com.uy/' }"
        />
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12 mr-1`"
            :sponsor="{ name: 'Lugapel', image: `${sponsorImage2}`, link: 'https://lugapel.com/' }"
        />
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12 mr-1`"
            :sponsor="{ name: 'Tilsor', image: `${sponsorImage3}`, link: 'https://www.tilsor.com.uy/' }"
        />
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12 mr-1`"
            :sponsor="{ name: 'Xygeni', image: `${sponsorImage4}`, link: 'https://xygeni.io/es/' }"
        />
      </div>

      <div class="row">
        <div class="col-md-8 text-start mt-6">
          <h5 class="text-white z-index-1 position-relative">
            Community
          </h5>
        </div>
      </div>
      <div class="row">
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12`"
            :sponsor="{ name: 'InfoSecMap', image: `${communitySponsorImage1}`, link: 'https://infosecmap.com/' }"
        />
      </div>

      <div class="row">
        <div class="col-md-8 text-start mt-6">
          <h5 class="text-white z-index-1 position-relative">
            Venue
          </h5>
        </div>
      </div>
      <div class="row">
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12`"
            :sponsor="{ name: 'ANTEL', image: `${venueSponsorImage1}`, link: 'https://www.antel.com.uy/' }"
        />
      </div>
    </div>
  </section>
</template>
