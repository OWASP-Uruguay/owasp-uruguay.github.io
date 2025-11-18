<script setup>
import ImageCard from "@/components/cards/imageCard/ImageCard.vue"

import sponsorImage1 from "@/assets/img/sponsors/Lugapel-logo.jpeg"
import sponsorImage2 from "@/assets/img/sponsors/Nextfense-logo.svg"
import sponsorImage3 from "@/assets/img/sponsors/Tilsor-logo.svg"
import sponsorImage4 from "@/assets/img/sponsors/Xygeni-logo.png"
import otherSponsorImage1 from "@/assets/img/sponsors/Grant_Thornton-logo.png"
import otherSponsorImage2 from "@/assets/img/sponsors/UCU-logo.jpeg"
import lunchSponsorImage from "@/assets/img/sponsors/Nexa-logo.png"
import communitySponsorImage1 from "@/assets/img/sponsors/InfoSecMap-logo.png"
import venueSponsorImage1 from "@/assets/img/sponsors/Antel-logo.png"
</script>

<template>
  <section class="pb-5 position-relative mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mt-5">
          <h3 class="z-index-1 position-relative">
            Sponsors
          </h3>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 text-start mt-5">
          <h4 class="z-index-1 position-relative">
            Silver
          </h4>
        </div>
      </div>
      <div class="row">
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12 mr-1`"
            :sponsor="{ name: 'Lugapel', image: `${sponsorImage1}`, link: 'https://lugapel.com/' }"
        />
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12`"
            :sponsor="{ name: 'Nextfense', image: `${sponsorImage2}`, link: 'https://nextfense.com/' }"
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
          <h5 class="z-index-1 position-relative">
            Lunch Sponsor
          </h5>
        </div>
      </div>
      <div class="row">
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12`"
            :sponsor="{ name: 'Nexa', image: `${lunchSponsorImage}`, link: 'https://wearenexa.com/' }"
        />
      </div>

      <div class="row">
        <div class="col-md-8 text-start mt-5">
          <h4 class="z-index-1 position-relative">
            Track
          </h4>
        </div>
      </div>
      <div class="row">
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12 mr-1`"
            :sponsor="{ name: 'Grant Thornton', image: `${otherSponsorImage1}`, link: 'https://www.grantthornton.com.uy/' }"
        />
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12`"
            :sponsor="{ name: 'Universidad Católica del Uruguay', image: `${otherSponsorImage2}`, link: 'https://www.ucu.edu.uy/' }"
        />
      </div>

      <div class="row">
        <div class="col-md-8 text-start mt-6">
          <h5 class="z-index-1 position-relative">
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
          <h5 class="z-index-1 position-relative">
            Conference Venue
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

      <div class="row">
        <div class="col-md-8 text-start mt-6">
          <h5 class="z-index-1 position-relative">
            Trainings Venue
          </h5>
        </div>
      </div>
      <div class="row">
        <ImageCard
            class="mt-lg-4 mt-5"
            :class="`card card-profile col-lg-4 col-md-3 col-12`"
            :sponsor="{ name: 'Lugapel', image: `${sponsorImage1}`, link: 'https://lugapel.com/' }"
        />
      </div>
    </div>
  </section>
</template>
