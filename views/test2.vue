<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="3">
        <input type="text" v-model="color" />
        <v-btn @click="update(color)">update</v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
export default {
  components: {},
  data: () => ({
    sidebarBackground: "red",
    nameUpdate: "mada",
    color: "",
  }),
  methods: {
    update(color) {
      console.log(color);
      this.$emit("update:color", color);
    },
  },
};
</script>