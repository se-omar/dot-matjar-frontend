<template>
  <!-- <v-menu
    transition="fab-transition"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    class="menu"
    max-width="200"
    min-width="200"
    max-height="50"
  >
    <template v-slot:activator="{ on, attrs }">
      
     
      <v-row justify="end">
        <v-col cols="1">
          <v-btn rounded :color="siteColor" dark v-bind="attrs" v-on="on">
            <span class="font">Page color</span>
          </v-btn>
        </v-col>
      </v-row>

    </template>

    <v-card max-height="500" >
     
     
           <v-row justify="center" > 
             <v-col cols="4" >  
<div class="file is-boxed is-primary">
<label class="file-label">





<span class="file-cta">
<span class="file-icon">
    

<i class="fas fa-paint-roller  fa-2x " style="color:blue"></i> <br/>


</span>

</span>

<input type="color" 
v-model="colorPicker"
id="input"
 /> <br/>

</label>
</div>
             </v-col>
             </v-row>
    </v-card>
  </v-menu>-->

  <div class="file is-boxed is-primary">
    <v-row justify="end">
      <label class="file-label">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-paint-roller fa-2x mt-4"></i>
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
      this.$emit("update:color", this.colorPicker);
      this.$store.dispatch("supplierPageColor", this.colorPicker);
    },
    changeColorPicker() {},
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