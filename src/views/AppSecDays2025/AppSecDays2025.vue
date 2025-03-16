<script setup>
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// components
import Navbar from "@/components/navbars/Navbar.vue";
import Header from "@/components/Header.vue";
// import FilledInfoCard from "../../examples/cards/infoCards/FilledInfoCard.vue";
import Footer from "@/components/footers/Footer.vue";

// sections
import Counter from "../../components/Counter.vue";
import OWASPUYLink from "@/components/sections/OWASPUYLink.vue";
import CallFor from "@/components/sections/CallFor.vue";
// import PresentationExample from "../../examples/Sections/PresentationExample.vue";
// import data from "../../examples/Sections/Data/designBlocksData";
// import PresentationInformation from "../../examples/Sections/PresentationInformation.vue";

// images
import headerBackgroundImage from "@/assets/img/owasp-appsec-days-uruguay-2025.png";
import callForPapersImage from "@/assets/img/call-for-papers.jpeg";
import callForTrainersImage from "@/assets/img/call-for-trainers.jpeg";
import MaterialBadge from "@/examples/MaterialBadge.vue";

// hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});

const registerActionButton = {
  color: "bg-gradient-success",
  label: t("register"),
  route: "",
}
const callForPapers = {
  name: t("callForPapers"),
  description: t("callForPapersDescription"),
  logo: callForPapersImage,
  buttonText: t("callForPapersButton")
};
const callForTrainers = {
  name: t("callForTrainers"),
  description: t("callForTrainersDescription"),
  logo: callForTrainersImage,
  buttonText: t("callForTrainersButton")
};
</script>

<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <Navbar
          :sticky="true"
          :dark="true"
          :transparent="true"
          :action="registerActionButton"
        />
      </div>
    </div>
  </div>
  <Header
    class="min-vh-85"
    style="
      background-color: rgb(5, 5, 46);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    "
  >
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${headerBackgroundImage}); background-repeat: no-repeat; background-size: 100% 100%;`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">

          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <CallFor id="cfp" :call-for="callForPapers"/>
    <CallFor id="cft" :call-for="callForTrainers"/>

    <Counter />

    <OWASPUYLink />

    <section class="my-5 py-5">
      <div class="container">
        <div class="row">
          <div class="row justify-content-center text-center my-sm-5">
            <div class="col-lg-6">
              <MaterialBadge color="warning" class="mb-3">
                {{ $t("comingSoon") }}
              </MaterialBadge>

              <p class="lead">
                {{ $t("comingSoonDetails") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--
    <PresentationInformation />
    <PresentationExample :data="data" />
    -->

    <!--
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <FilledInfoCard
            class="p-4"
            :color="{ text: 'white', background: 'bg-gradient-success' }"
            :icon="{ component: 'flag', color: 'white' }"
            title="Getting Started"
            description="Check the possible ways of working with our product and the necessary files for building your own project."
            :action="{
              route:
                'https://www.creative-tim.com/learning-lab/vue/overview/material-kit/',
              label: { text: 'Let\'s start', color: 'white' }
            }"
          />
        </div>
        <div class="col-lg-4">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            height="h-100"
            :icon="{ component: 'precision_manufacturing', color: 'success' }"
            title="Plugins"
            description="Get inspiration and have an overview about the plugins that we
                used to create the Material Kit."
            :action="{
              route:
                'https://www.creative-tim.com/learning-lab/vue/input/material-kit/',
              label: { text: 'Read more' }
            }"
          />
        </div>
        <div class="col-lg-4">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'receipt_long', color: 'success' }"
            title="Utility Classes"
            description="Material Kit is giving you a lot of pre-made elements. For those
                who want flexibility, we included many utility classes."
            :action="{
              route:
                'https://www.creative-tim.com/learning-lab/vue/utilities/material-kit/',
              label: { text: 'Read more' }
            }"
          />
        </div>
      </div>
    </div>
    -->
  </div>

  <Footer />
</template>
