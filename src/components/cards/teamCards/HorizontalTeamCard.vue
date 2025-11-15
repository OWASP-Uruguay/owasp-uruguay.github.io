<script setup>
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import {computed} from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  profile: {
    type: Object,
    required: true,
    name: String,
    image: String,
  },
  profile2: {
    type: Object,
    required: false,
    name: String,
    image: String,
    default: { name: "" },
  },
  conference: {
    type: Object,
    level: String,
    title: String,
    color: String,
    description: String,
    required: false,
    default: { title: "" },
  },
  dualSpace: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const informationArray =  computed (() => {
  return t(props.conference.description).split("\n");
});
const classImages = computed(() => {
  if (props.dualSpace) {
    return "col-lg-2 col-md-3 col-12";
  } else {
    return "col-lg-4 col-md-3 col-12";
  }
});
const classConference = computed(() => {
  if (props.dualSpace) {
    return "col-lg-10 col-md-9 col-12 my-auto";
  } else {
    return "col-lg-8 col-md-9 col-12 my-auto";
  }
});
</script>

<template>
  <div class="card card-profile">
    <div class="row">
      <div :class="classImages" style="text-align: center;">
        <div>
          <MaterialAvatar class="p-3" :alt="profile.name" :image="profile.image"/>
          <MaterialAvatar v-if="profile2.name !== ''" class="p-3" :alt="profile2.name" :image="profile2.image"/>
        </div>
      </div>
      <div :class="classConference">
        <div class="card-body ps-lg-0">
          <h5 class="mb-0">{{ conference.title }}</h5>
          <h6 class="mb-0">{{ profile.name }}</h6>
          <h6 v-if="profile2.name !== ''" class="mb-0">{{ profile2.name }}</h6>
          <h6 :class="`text-${conference.color}`">{{ conference.level }}</h6>
          <div v-for="item in informationArray">
            <li v-if="item.startsWith('***')" class="mb-2">{{ item.replace("***", "") }}</li>
            <p v-else class="mb-2">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
