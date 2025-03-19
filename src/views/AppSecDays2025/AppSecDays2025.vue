<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";

// components
import MaterialBadge from "@/components/MaterialBadge.vue";
import GoogleMaps from "@/components/GoogleMaps.vue";

// sections
import Navbar from "@/sections/navbars/Navbar.vue";
import Header from "@/sections/Header.vue";
import Counter from "@/sections/Counter.vue";
import CallToAction from "@/sections/CallToAction.vue";
import AntelTower from "@/sections/AntelTower.vue";
import Footer from "@/sections/footers/Footer.vue";

// images
import headerBackgroundImage from "@/assets/img/owasp-appsec-days-uruguay-2025.png";
import callForPresentationsImage from "@/assets/img/call-for-papers.jpeg";
import callForTrainersImage from "@/assets/img/call-for-trainers.jpeg";
import callForSponsorsImage from "@/assets/img/call-for-sponsors.jpeg";
import owaspUYLogo from "@/assets/img/owasp-uy.png";

const { t } = useI18n();

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
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
const callToRegistration = computed(() => ({
  class: "p-4",
  dark: true,
  title: t("callToRegistration"),
  buttonText: t("callToRegistrationButton"),
  route: "",
}));
const callForPresentations = computed(() => ({
  title: t("callForPresentations"),
  description: t("callForPresentationsDescription"),
  logo: callForPresentationsImage,
  buttonText: t("callForPresentationsButton"),
  route: "",
}));
const callForTrainers = computed(() => ({
  dark: true,
  title: t("callForTrainers"),
  description: t("callForTrainersDescription"),
  logo: callForTrainersImage,
  buttonText: t("callForTrainersButton"),
  route: "",
}));
const callForSponsors = computed(() => ({
  title: t("callForSponsors"),
  logo: callForSponsorsImage,
  buttonText: t("callForSponsorsButton"),
  route:
    "https://drive.google.com/file/d/1LMugRj522_1X1q8St5RURl_I2ja5oxci/view?usp=drive_link",
}));
const callToOWASPUY = computed(() => ({
  class: "",
  dark: true,
  title: t("organizer"),
  subtitle: t("organizerFounded"),
  description: "",
  logo: owaspUYLogo,
  buttonText: t("visitSite"),
  route: "https://owasp.org/uruguay",
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
          <div class="col-lg-7 text-center mx-auto position-relative"></div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n5 mb-n5">
    <Counter />
  </div>

  <CallToAction id="cfr" :call-for="callToRegistration" />

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-sm-4 border-radius-xl"  style="padding: 0 !important;">
    <CallToAction id="cfp" :call-for="callForPresentations" />
    <CallToAction id="cft" :call-for="callForTrainers" />
    <CallToAction id="call4sponsors" :call-for="callForSponsors" />
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-sm-3 border-radius-xl" style="background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));">
    <AntelTower />
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-sm-3 border-radius-xl">
    <GoogleMaps/>
  </div>

  <CallToAction id="call2owaspuy" :call-for="callToOWASPUY" />

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-sm-5 border-radius-xl">
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
  </div>

  <Footer />
</template>
