<template>
  <v-app >
    
 <tool-bar></tool-bar>
      <router-view />

  </v-app>
  
</template>

<script>
import ToolBar from "./components/toolbar.vue";

export default {
  name: "App",
  rtl: false,
components:{
ToolBar,
},
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  // methods:{
  //   changeRTL () {
  //     this.$vuetify.rtl = true
  //   }
  // }
};
</script>
