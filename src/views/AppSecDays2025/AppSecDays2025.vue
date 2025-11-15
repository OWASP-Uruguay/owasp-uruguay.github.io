<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";

// components
import GoogleMaps from "@/components/GoogleMaps.vue";

// sections
import Navbar from "@/sections/navbars/Navbar.vue";
import Header from "@/sections/Header.vue";
import Counter from "@/sections/Counter.vue";
import CallToAction from "@/sections/CallToAction.vue";
import AntelTower from "@/sections/AntelTower.vue";
import GeneralInformation from "@/sections/GeneralInformation.vue";
import Footer from "@/sections/footers/Footer.vue";

// images
import headerBackgroundImageLogo from "@/assets/img/owasp-appsec-days-uruguay-2025-logo.jpeg";
import owaspUYLogo from "@/assets/img/owasp-uy.png";
import TrainingGrid from "@/sections/TrainingGrid.vue";
import SpeakersGrid from "@/sections/SpeakersGrid.vue";
import SponsorGrid from "@/sections/SponsorGrid.vue";

const { t } = useI18n();

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
  document.getElementById("translate").click();
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});

const registerActionButton = computed(() => ({
  color: "bg-gradient-success",
  label: t("register"),
  route: "",
}));
const aboutEvent = computed(() => ({
  title: t("aboutEventTitle"),
  subtitle: t("aboutEventDate"),
  text: "aboutEventText",
}));
const callToRegistration = computed(() => ({
  class: "p-4",
  dark: true,
  title: t("callToRegistration"),
  buttonText: t("callToRegistrationButton"),
  route: "https://www.eventbrite.com/e/owasp-appsec-days-uruguay-2025-tickets-1415284527119?aff=oddtdtcreator",
}));
const callToOWASPUY = computed(() => ({
  class: "",
  dark: true,
  title: t("organizer"),
  subtitle: t("organizerFounded"),
  description: "",
  logo: owaspUYLogo,
  buttonText: t("visitSite"),
  route: "https://owasp.org/www-chapter-uruguay/",
}));
const codeOfConduct = computed(() => ({
  title: t("codeOfConductTitle"),
  subtitle: "",
  text: "codeOfConductText",
}));
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
      background-color: #131329;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    "
  >
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${headerBackgroundImageLogo}); background-repeat: no-repeat; background-size: contain; background-position: center;`"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative"></div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur align-items-center mx-3 mx-md-4 mt-n4 mb-n5">
    <Counter />
    <GeneralInformation :information="aboutEvent"/>
  </div>

  <CallToAction id="cfr" :call-for="callToRegistration" />

  <div class="card card-body blur shadow-blur align-items-center mx-3 mx-md-4 mt-sm-4 border-radius-xl"  style="padding: 0 !important;">
    <SponsorGrid id="sponsorGrid" />
  </div>

  <div class="card card-body blur shadow-blur align-items-center mx-3 mx-md-4 mt-sm-4 border-radius-xl"  style="background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));">
    <TrainingGrid/>
  </div>

  <div class="card card-body blur shadow-blur align-items-center mx-3 mx-md-4 mt-sm-4 border-radius-xl"  style="padding: 0px !important;">
    <SpeakersGrid/>
  </div>

  <div class="card card-body blur shadow-blur align-items-center mx-3 mx-md-4 mt-sm-3 border-radius-xl" style="background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));">
    <AntelTower />
  </div>

  <div class="card card-body blur shadow-blur align-items-center mx-3 mx-md-4 mt-sm-3 border-radius-xl">
    <GoogleMaps/>
  </div>

  <CallToAction id="call2owaspuy" :call-for="callToOWASPUY" />

  <div class="card card-body blur shadow-blur align-items-center mx-3 mx-md-4">
    <GeneralInformation :information="codeOfConduct"/>
  </div>

  <Footer />
</template>
