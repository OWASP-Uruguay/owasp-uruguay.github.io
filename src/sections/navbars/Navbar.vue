<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
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
<!--      <button-->
<!--        class="navbar-toggler shadow-none ms-2"-->
<!--        type="button"-->
<!--        data-bs-toggle="collapse"-->
<!--        data-bs-target="#navigation"-->
<!--        aria-controls="navigation"-->
<!--        aria-expanded="false"-->
<!--        aria-label="Toggle navigation"-->
<!--      >-->
<!--        <span class="navbar-toggler-icon mt-2">-->
<!--          <span class="navbar-toggler-bar bar1"></span>-->
<!--          <span class="navbar-toggler-bar bar2"></span>-->
<!--          <span class="navbar-toggler-bar bar3"></span>-->
<!--        </span>-->
<!--      </button>-->
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
          <!--
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >dashboard</i
              >
              Pages
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <div
                        class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                      >
                        Landing Pages
                      </div>
                      <RouterLink
                        :to="{ name: 'about' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>About Us</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'contactus' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Contact Us</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'author' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Author</span>
                      </RouterLink>
                      <div
                        class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0 mt-3"
                      >
                        Account
                      </div>
                      <RouterLink
                        :to="{ name: 'signin-basic' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Sign In</span>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <div
                  class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0"
                >
                  Landing Pages
                </div>
                <RouterLink
                  :to="{ name: 'about' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>About Us</span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'contactus' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Contact Us</span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'author' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Author</span>
                </RouterLink>
                <div
                  class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0 mt-3"
                >
                  Account
                </div>
                <RouterLink
                  :to="{ name: 'signin-basic' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Sign In</span>
                </RouterLink>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuBlocks"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >view_day</i
              >
              Sections
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md dropdown-md-responsive p-3 border-radius-lg mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuBlocks"
            >
              <div class="d-none d-lg-block">
                <ul class="list-group">
                  <li
                    class="nav-item dropdown dropdown-hover dropdown-subitem list-group-item border-0 p-0"
                  >
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="javascript:;"
                    >
                      <div class="d-flex">
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <h6
                              class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                            >
                              Page Sections
                            </h6>
                            <span class="text-sm">See all sections</span>
                          </div>
                          <img
                            :src="downArrow"
                            alt="down-arrow"
                            class="arrow"
                          />
                        </div>
                      </div>
                    </a>
                    <div class="dropdown-menu mt-0 py-3 px-2 mt-3">
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'page-headers' }"
                      >
                        Page Headers
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'page-features' }"
                      >
                        Features
                      </RouterLink>
                    </div>
                  </li>
                  <li
                    class="nav-item dropdown dropdown-hover dropdown-subitem list-group-item border-0 p-0"
                  >
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="javascript:;"
                    >
                      <div class="d-flex">
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <h6
                              class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                            >
                              Navigation
                            </h6>
                            <span class="text-sm">See all navigations</span>
                          </div>
                          <img
                            :src="downArrow"
                            alt="down-arrow"
                            class="arrow"
                          />
                        </div>
                      </div>
                    </a>
                    <div class="dropdown-menu mt-0 py-3 px-2 mt-3">
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'navigation-navbars' }"
                      >
                        Navbars
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'navigation-navtabs' }"
                      >
                        Nav Tabs
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'navigation-pagination' }"
                      >
                        Pagination
                      </RouterLink>
                    </div>
                  </li>
                  <li
                    class="nav-item dropdown dropdown-hover dropdown-subitem list-group-item border-0 p-0"
                  >
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="javascript:;"
                    >
                      <div class="d-flex">
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <h6
                              class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                            >
                              Input Areas
                            </h6>
                            <span class="text-sm">See all input areas</span>
                          </div>
                          <img
                            :src="downArrow"
                            alt="down-arrow"
                            class="arrow"
                          />
                        </div>
                      </div>
                    </a>
                    <div class="dropdown-menu mt-0 py-3 px-2 mt-3">
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'inputareas-inputs' }"
                      >
                        Inputs
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'inputareas-forms' }"
                      >
                        Forms
                      </RouterLink>
                    </div>
                  </li>
                  <li
                    class="nav-item dropdown dropdown-hover dropdown-subitem list-group-item border-0 p-0"
                  >
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="javascript:;"
                    >
                      <div class="d-flex">
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <h6
                              class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                            >
                              Attention Catchers
                            </h6>
                            <span class="text-sm">See all examples</span>
                          </div>
                          <img
                            :src="downArrow"
                            alt="down-arrow"
                            class="arrow"
                          />
                        </div>
                      </div>
                    </a>
                    <div class="dropdown-menu mt-0 py-3 px-2 mt-3">
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'ac-alerts' }"
                      >
                        Alerts
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'ac-modals' }"
                      >
                        Modals
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'ac-tooltips-popovers' }"
                      >
                        Tooltips & Popovers
                      </RouterLink>
                    </div>
                  </li>
                  <li
                    class="nav-item dropdown dropdown-hover dropdown-subitem list-group-item border-0 p-0"
                  >
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="javascript:;"
                    >
                      <div class="d-flex">
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <h6
                              class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                            >
                              Elements
                            </h6>
                            <span class="text-sm">See all elements</span>
                          </div>
                          <img
                            :src="downArrow"
                            alt="down-arrow"
                            class="arrow"
                          />
                        </div>
                      </div>
                    </a>
                    <div class="dropdown-menu mt-0 py-3 px-2 mt-3">
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-avatars' }"
                      >
                        Avatars
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-badges' }"
                      >
                        Badges
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-breadcrumbs' }"
                      >
                        Breadcrumbs
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-buttons' }"
                      >
                        Buttons
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-button-groups' }"
                      >
                        Button Groups
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-dropdowns' }"
                      >
                        Dropdowns
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-progress-bars' }"
                      >
                        Progress Bars
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-toggles' }"
                      >
                        Toggles
                      </RouterLink>
                      <RouterLink
                        class="dropdown-item ps-3 border-radius-md mb-1"
                        :to="{ name: 'el-typography' }"
                      >
                        Typography
                      </RouterLink>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="row d-lg-none">
                <div class="col-md-12">
                  <div class="d-flex mb-2">
                    <div
                      class="w-100 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          Page Sections
                        </h6>
                      </div>
                    </div>
                  </div>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'page-headers' }"
                  >
                    Page Headers
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'page-features' }"
                  >
                    Features
                  </RouterLink>
                  <div class="d-flex mb-2 mt-3">
                    <div
                      class="w-100 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          Navigation
                        </h6>
                      </div>
                    </div>
                  </div>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'navigation-navbars' }"
                  >
                    Navbars
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'navigation-navtabs' }"
                  >
                    Nav Tabs
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'navigation-pagination' }"
                  >
                    Pagination
                  </RouterLink>
                  <div class="d-flex mb-2 mt-3">
                    <div
                      class="w-100 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          Input Areas
                        </h6>
                      </div>
                    </div>
                  </div>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'inputareas-inputs' }"
                  >
                    Inputs
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'inputareas-forms' }"
                  >
                    Forms
                  </RouterLink>
                  <div class="d-flex mb-2 mt-3">
                    <div
                      class="w-100 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          Attention Catchers
                        </h6>
                      </div>
                    </div>
                  </div>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'ac-alerts' }"
                  >
                    Alerts
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'ac-modals' }"
                  >
                    Modals
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'ac-tooltips-popovers' }"
                  >
                    Tooltips & Popovers
                  </RouterLink>
                  <div class="d-flex mb-2 mt-3">
                    <div
                      class="w-100 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <h6
                          class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                        >
                          Elements
                        </h6>
                      </div>
                    </div>
                  </div>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-avatars' }"
                  >
                    Avatars
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-badges' }"
                  >
                    Badges
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-breadcrumbs' }"
                  >
                    Breadcrumbs
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-buttons' }"
                  >
                    Buttons
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-button-groups' }"
                  >
                    Button Groups
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-dropdowns' }"
                  >
                    Dropdowns
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-progress-bars' }"
                  >
                    Progress Bars
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-toggles' }"
                  >
                    Toggles
                  </RouterLink>
                  <RouterLink
                    class="dropdown-item ps-3 border-radius-md mb-1"
                    :to="{ name: 'el-typography' }"
                  >
                    Typography
                  </RouterLink>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuDocs"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >article</i
              >
              Docs
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md mt-0 mt-lg-3 p-3 border-radius-lg"
              aria-labelledby="dropdownMenuDocs"
            >
              <div class="d-none d-lg-block">
                <ul class="list-group">
                  <li class="nav-item list-group-item border-0 p-0">
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href=" https://www.creative-tim.com/learning-lab/vue/overview/material-kit/"
                    >
                      <h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        Getting Started
                      </h6>
                      <span class="text-sm"
                        >All about overview, quick start, license and
                        contents</span
                      >
                    </a>
                  </li>
                  <li class="nav-item list-group-item border-0 p-0">
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href=" https://www.creative-tim.com/learning-lab/vue/colors/material-kit/"
                    >
                      <h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        Foundation
                      </h6>
                      <span class="text-sm"
                        >See our colors, icons and typography</span
                      >
                    </a>
                  </li>
                  <li class="nav-item list-group-item border-0 p-0">
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href=" https://www.creative-tim.com/learning-lab/vue/alerts/material-kit/"
                    >
                      <h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        Components
                      </h6>
                      <span class="text-sm"
                        >Explore our collection of fully designed
                        components</span
                      >
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row d-lg-none">
                <div class="col-md-12 g-0">
                  <a
                    class="dropdown-item py-2 ps-3 border-radius-md"
                    href="./pages/about-us.html"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      Getting Started
                    </h6>
                    <span class="text-sm"
                      >All about overview, quick start, license and
                      contents</span
                    >
                  </a>
                  <a
                    class="dropdown-item py-2 ps-3 border-radius-md"
                    href="./pages/about-us.html"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      Foundation
                    </h6>
                    <span class="text-sm"
                      >See our colors, icons and typography</span
                    >
                  </a>
                  <a
                    class="dropdown-item py-2 ps-3 border-radius-md"
                    href="./pages/about-us.html"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      Components
                    </h6>
                    <span class="text-sm"
                      >Explore our collection of fully designed components</span
                    >
                  </a>
                  <a
                    class="dropdown-item py-2 ps-3 border-radius-md"
                    href="./pages/about-us.html"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      Plugins
                    </h6>
                    <span class="text-sm"
                      >Check how you can integrate our plugins</span
                    >
                  </a>
                  <a
                    class="dropdown-item py-2 ps-3 border-radius-md"
                    href="./pages/about-us.html"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      Utility Classes
                    </h6>
                    <span class="text-sm"
                      >For those who want flexibility, use our utility
                      classes</span
                    >
                  </a>
                </div>
              </div>
            </div>
          </li>
          -->
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
