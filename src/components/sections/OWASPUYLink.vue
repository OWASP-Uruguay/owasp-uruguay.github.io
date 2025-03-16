<script setup>
import owaspUYLogo from "@/assets/img/owasp-uy.png";
</script>

<template>
  <section class="pt-3 pb-4" id="count-stats">
    <div
      class="container-fluid mt-sm-5 border-radius-xl"
      :style="{
        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
      }"
    >
      <div class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl">
        <div
          class="container row"
          style="
            display: flex;
            margin-left: auto;
            margin-right: auto;
            position: relative;
          "
        >
          <img :src="owaspUYLogo" class="col-lg-4" alt="title" loading="lazy" />
          <div class="d-flex col-lg-8 justify-content-center p-5 align-items-center">
            <div class="text-center">
              <h4 class="text-white">
                {{ $t("organizer") }} <br />
                {{ $t("organizerFounded") }}
              </h4>
              <a
                href="https://owasp.org/uruguay"
                class="btn btn-lg mb-0 btn-info px-5 py-3 mt-4"
              >
                {{ $t("visitSite") }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
