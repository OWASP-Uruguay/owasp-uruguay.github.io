<script setup>
import owaspUYLogo from "@/assets/img/owasp-uy.png";

defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "OWASP Uruguay Chapter",
      logo: owaspUYLogo,
      route: "https://owasp.org/uruguay"
    })
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fa-solid fa-envelopes-bulk text-lg opacity-8"></i>',
        link: "https://groups.google.com/a/owasp.org/forum/#!forum/uruguay-chapter"
      },
      {
        icon: '<i class="fa-brands fa-meetup text-lg opacity-8"></i>',
        link: "https://www.meetup.com/OWASP-Uruguay-Chapter"
      },
      {
        icon: '<i class="fa-brands fa-x-twitter text-lg opacity-8"></i>',
        link: "https://twitter.com/owasp_uy"
      },
      {
        icon: '<i class="fa-brands fa-github text-lg opacity-8"></i>',
        link: "https://github.com/OWASP-Uruguay"
      },
      {
        icon: '<i class="fa-brands fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/@owasp_uy"
      },
      {
        icon: '<i class="fa-brands fa-linkedin text-lg opacity-8"></i>',
        link: "https://www.linkedin.com/groups/3673287/"
      },
    ]
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String
    },
    default: () => [
      {
        name: "company",
        items: [
          {
            name: "about us",
            href: "https://www.creative-tim.com/presentation"
          },
          {
            name: "freebies",
            href: "https://www.creative-tim.com/templates/free"
          },
          {
            name: "premium tools",
            href: "https://www.creative-tim.com/templates/premium"
          },
          { name: "blog", href: "https://www.creative-tim.com/blog" }
        ]
      },
      {
        name: "resources",
        items: [
          { name: "illustrations", href: "https://iradesign.io/" },
          {
            name: "bits & snippets",
            href: "https://www.creative-tim.com/bits"
          },
          {
            name: "affiliate program",
            href: "https://www.creative-tim.com/affiliates/new"
          }
        ]
      },
      {
        name: "help & support",
        items: [
          {
            name: "contact us",
            href: "https://www.creative-tim.com/contact-us"
          },
          {
            name: "knowledge center",
            href: "https://www.creative-tim.com/knowledge-center"
          },
          {
            name: "custom development",
            href: "https://services.creative-tim.com/"
          },
          {
            name: "sponsorships",
            href: "https://www.creative-tim.com/sponsorships"
          }
        ]
      },
      {
        name: "legal",
        items: [
          {
            name: "terms & conditions",
            href: "https://www.creative-tim.com/terms"
          },
          {
            name: "privacy policy",
            href: "https://www.creative-tim.com/privacy"
          },
          {
            name: "licenses (EULA)",
            href: "https://www.creative-tim.com/license"
          }
        ]
      }
    ]
  }
});
</script>
<template>
  <footer class="footer pt-5 mt-5">
    <div class="container">

      <div class="row" style="display: flex; flex-direction: row; justify-content: center;">
        <div class="col-md-3" style="display: flex; flex-direction: column;align-items: center;">
          <div>
            <a :href="brand.route">
              <img :src="brand.logo" alt="main_logo" style="max-width: 5rem;"/>
            </a>
          </div>
          <div>
            <div style="display: flex; justify-content: center; align-items: center;">
              <h6 class="font-weight-bolder mb-2">{{ brand.name }}</h6>
            </div>
            <div>
              <ul class="d-flex flex-row ms-n3 nav">
                <li
                  class="nav-item"
                  v-for="{ icon, link } of socials"
                  :key="link"
                >
                  <a
                    class="nav-link pe-1"
                    :href="link"
                    target="_blank"
                    v-html="icon"
                  >
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--
        <div
          class="col-md-2 col-sm-6 col-6"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link" :href="item.href" target="_blank">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
        -->

      </div>
      <div class="row">
        <div class="text-center">
          <p class="text-dark my-4 text-sm font-weight-normal">
            Copyright ©
            {{ new Date().getFullYear() }}
            <a href="https://owasp.org/uruguay">OWASP Uruguay </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
