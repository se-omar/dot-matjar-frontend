<template>
  <div class="file is-boxed is-primary">
    <v-row justify="end">
      <label class="file-label">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-paint-roller fa-2x"></i>
            <br />
          </span>
        </span>

        <input
          type="color"
          v-model="colorPicker"
          id="input"
          @change="changeColor"
        />
        <br />
      </label>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    colorPicker: "",
  }),
  methods: {
    changeColor() {
      console.log(this.colorPicker);
      this.$emit("update:color", this.colorPicker);
      this.$store.dispatch("changingSiteColor", this.colorPicker);
      this.$router.go("/");
    },
    changeColorPicker() {
      console.log(this.colorPicker);
    },
  },
  computed: {
    color() {
      return this.$store.state.supplierPageColor;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor;
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
        };
      }
    },
  },
};
</script>
<style scoped>
input {
  opacity: 0;
  z-index: inherit;
}
</style>