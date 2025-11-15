<script setup>
import { RouterLink } from "vue-router";
import {onMounted, ref} from "vue";
import { useI18n } from "vue-i18n";

import { useWindowsWidth } from "@/assets/js/useWindowsWidth";

const { locale } = useI18n();

const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "",
      color: "bg-gradient-success",
      label: "",
    })
  },
  transparent: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  darkText: {
    type: Boolean,
    default: false
  }
});

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop
let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value === false) {
  textDark.value = false;
}

function navBarButtonClick(id) {
  if (id === "" && props.action.route === "") {
    document.getElementById("cfr").scrollIntoView({
      behavior: "smooth",
    });
  } else {
    if (document.getElementById(id)) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  }
}

function changeLanguage(lang) {
  if (lang === "en") {
    locale.value = "en";
  } else {
    locale.value = "es";
  }
}

onMounted(() => {
  document.getElementById("translate").click();
});

</script>
<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute':
        props.transparent,
      'blur z-index-3 py-2 shadow py-2 start-0 end-0 position-absolute':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark
    }"
    style="padding: 5px;"
  >
    <div class="container">
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-lg text-dark font-weight-bolder ms-sm-3'
            : 'text-lg text-white font-weight-bolder ms-sm-3'
        ]"
        :to="{ name: 'appsecdays2025' }"
        rel="tooltip"
        title="OWASP AppSec Days Uruguay 2025"
        data-placement="bottom"
      >
        OWASP AppSec Days Uruguay 2025
      </RouterLink>
      <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        to="/"
        rel="tooltip"
        title="OWASP AppSec Days Uruguay 2025"
        data-placement="bottom"
      >
        AppSec Days<br/> Uruguay 2025
      </RouterLink>
      <a
        class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block"
        :class="action.color"
        @click="navBarButtonClick('')"
      >{{ action.label }}</a
      >
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <a
            role="button"
            class="text-lg nav-link ps-2 d-flex cursor-pointer align-items-center"
            :class="getTextColor()"
            style="padding-right: 20px"
            id="nav-cfp"
            aria-expanded="false"
            @click="navBarButtonClick('cfp')"
          >
            CFP
          </a>
          <a
            role="button"
            class="text-lg nav-link ps-2 d-flex cursor-pointer align-items-center"
            :class="getTextColor()"
            style="padding-right: 20px"
            id="nav-cfp"
            aria-expanded="false"
            @click="navBarButtonClick('cft')"
          >
            CFT
          </a>
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <a
                class="btn btn-lg mb-0"
                :class="action.color"
                @click="navBarButtonClick('')"
            >{{ action.label }}</a
            >
          </li>
        </ul>
        <div
          v-if="$i18n.locale === 'en'"
          role="button"
          class="nav-link ps-2 cursor-pointer"
          :class="getTextColor()"
          aria-expanded="false"
          style="display: flex; flex-direction:column; align-items:center"
          @click="changeLanguage('es')"
        >
          <i
            class="fa-solid fa-language"
            :class="getTextColor()"
            style="padding-left: 5px"
          />
          <a class="text-lg" :class="getTextColor()"> [{{ $t("otherLanguage") }}] </a>
        </div>
        <div
          v-else
          role="button"
          class="nav-link ps-2 cursor-pointer"
          :class="getTextColor()"
          aria-expanded="false"
          style="display: flex; flex-direction:column; align-items:center"
          @click="changeLanguage('en')"
          id="translate"
        >
          <i
            class="fa-solid fa-language"
            :class="getTextColor()"
            style="padding-left: 5px"
          />
          <a class="text-lg" :class="getTextColor()"> [{{ $t("otherLanguage") }}] </a>
        </div>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
