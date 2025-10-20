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
  conference: {
    type: Object,
    level: String,
    title: String,
    color: String,
    description: String,
    required: true,
  },
});

const informationArray =  computed (() => {
  return t(props.conference.description).split("\n");
});
</script>
<template>
  <div class="card card-profile">
    <div class="row">
      <div class="col-lg-4 col-md-3 col-12">
          <div class="p-3 pe-md-0">
            <MaterialAvatar :alt="profile.name" :image="profile.image"/>
          </div>
      </div>
      <div class="col-lg-8 col-md-9 col-12 my-auto">
        <div class="card-body ps-lg-0">
          <h5 class="mb-0">{{ conference.title }}</h5>
          <h6 class="mb-0">{{ profile.name }}</h6>
          <h6 :class="`text-${conference.color}`">{{ conference.level }}</h6>
          <div v-for="item in informationArray">
            <li v-if="item.startsWith('***')" class="mb-2">{{ item.replace("***", "") }}</li>
            <p class="mb-2" v-else>{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
