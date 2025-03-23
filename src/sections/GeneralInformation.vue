<script setup>
import {computed} from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  information: {
    type: Object,
    title: String,
    subtitle: String,
    description: String,
    text: String,
  }
});

const informationArray =  computed (() => {
  return t(props.information.text).split("\n");
});
</script>

<template>
  <div class="flex-row align-content-center p-5 card-text">
    <div class="flex-column mb-5">
      <h3 class="h2 text-center" style="color: darkblue;" >{{ information.title }}</h3>
      <h3 v-if="information.subtitle !== ''" class="h2 text-center" style="color: royalblue;">{{ information.subtitle }}</h3>
    </div>
    <div v-for="item in informationArray">
      <p v-if="item.type === 'paragraph'">{{ item.content }}</p>
      <h4 v-if="item.startsWith('*b*')" class="mb-3">{{ item.replace("*b*", "") }}</h4>
      <li v-else-if="item.startsWith('***')" class="mb-3 h5">{{ item.replace("***", "") }}</li>
      <h5 v-else class="mb-3">{{ item }}</h5>
    </div>
  </div>
</template>
