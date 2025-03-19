<script setup>
const props = defineProps({
  callFor: {
    type: Object,
    class: {
      type: String,
      default: "border-radius-xl",
    },
    dark: {
      type: Boolean,
      default: false,
    },
    title: String,
    subtitle: String,
    description: String,
    logo: {
      type: String,
      default: "",
    },
    buttonText: String,
    route: {
      type: String,
      default: "",
    },
  }
});

const getTextColor = () => {
  if (props.callFor.dark) {
    return "text-white";
  } else {
    return "text-dark";
  }
};

const getStyle = () => {
  if (props.callFor.dark) {
    return { background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))' };
  } else {
    return { background: '' };
  }
};
</script>

<template>
  <section>
    <div
      class="container-fluid"
      :class="callFor.class"
      :style="getStyle()"
    >
      <div class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl">
        <div
          class="container row"
          style="
            display: flex;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            position: relative;
          "
        >
          <img v-if="callFor.logo" :src="callFor.logo" class="col-lg-4" :alt="callFor.title" loading="lazy" />
          <div class="d-flex col-lg-8 justify-content-center p-5 align-items-center">
            <div class="text-center">
              <h3 :class="getTextColor()">{{ callFor.title }}</h3>
              <h4 v-if="callFor.subtitle !== ''" :class="getTextColor()">{{ callFor.subtitle }}</h4>
              <h6 v-if="callFor.description !== ''" :class="getTextColor()">{{ callFor.description }}</h6>
              <a
                v-if="callFor.route !== ''"
                :href="callFor.route"
                class="btn btn-lg mb-0 btn-info px-5 py-3 mt-4"
              >
                {{ callFor.buttonText }}</a
              >
              <p v-else class="btn btn-lg mb-0 btn-info px-5 py-3 mt-4" disabled>
                {{ $t("comingSoon") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
