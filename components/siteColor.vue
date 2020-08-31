<template>
  <v-menu
    transition="fab-transition"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    class="menu"
    max-width="200"
    min-width="200"
  >
    <template v-slot:activator="{ on, attrs }">
      
     
      <v-row justify="end">
        <v-col cols="1">
          <v-btn rounded :color="siteColor" dark v-bind="attrs" v-on="on">
            <span class="font">Site color</span>
          </v-btn>
        </v-col>
      </v-row>

    </template>

    <v-card>
      <v-card-text>
        <v-row justify="center">
          <span class="black--text" style="font-weight:bold;">Choose your Site color form Here :</span>
        </v-row>
      </v-card-text>

      <!-- <v-row justify="center" v-for="item in items" :key="item.color">
        <v-btn small icon :class="item.color" @click="changeColor(item)"></v-btn>
      </v-row> -->
      <input type="color" v-model="colorPicker"> <v-btn :color="siteColor" @click="changeColor">X</v-btn>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data: () => ({
   
   colorPicker:''
  }),
  methods: {
    changeColor() {
     
      console.log(this.colorPicker);
      this.$emit("update:color", this.colorPicker);
      this.$store.dispatch("changingSiteColor", this.colorPicker );
      this.$router.go('/')
    },
    changeColorPicker(){
      console.log(this.colorPicker)
    },
  
   
  },
  computed: {
    color() {
      return this.$store.state.supplierPageColor;
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    siteColor(){
        return this.$store.state.siteColor
    }
  },
};
</script>