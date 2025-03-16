<script setup>
// example components
import Navbar from "../../../components/navbars/Navbar.vue";
import Header from "../../../components/Header.vue";

// sections
import Footer from "../../../examples/Sections/AuthorFooter.vue";
import Profile from "../../../examples/Sections/AuthorProfile.vue";
import Posts from "../../../examples/Sections/AuthorPosts.vue";
import Contact from "../../../examples/Sections/AuthorContact.vue";

// image
import image from "@/assets/img/city-profile.jpg";
</script>
<template>
  <Navbar transparent />
  <Header>
    <div
      class="page-header min-height-400"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <Profile />
    <Posts />
  </div>
  <Contact />
  <Footer />
</template>
