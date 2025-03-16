<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import DefaultCounterCard from "../examples/cards/counterCards/DefaultCounterCard.vue";

</script>

<template>
  <section class="pt-3 pb-4" id="count-stats">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 z-index-2 border-radius-xl mx-auto py-3">
          <div class="row">
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
                color="success"
                :title='$t("participants")'
                :description='$t("participantsDescription")'
                :count="700"
                suffix="+"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
                color="success"
                :title='$t("speakers")'
                :description='$t("speakersDescription")'
                :count="12"
                suffix="+"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4">
              <DefaultCounterCard
                color="success"
                :title='$t("days")'
                :description='$t("daysDescription")'
                :count="2"
                :duration="3000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
