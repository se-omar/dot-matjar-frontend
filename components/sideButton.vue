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
          <v-btn rounded :color="color" dark v-bind="attrs" v-on="on">
            <span class="font">Page color</span>
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <v-card>
      <v-card-text>
        <v-row justify="center">
          <span class="black--text" style="font-weight:bold;">Choose your page color</span>
        </v-row>
      </v-card-text>

      <v-row justify="center" v-for="item in items" :key="item.color">
        <v-btn small icon :class="item.color" @click="changeColor(item)"></v-btn>
      </v-row>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data: () => ({
    items: [
      { color: "green" },
      { color: "red" },
      { color: "blue" },
      { color: "yellow" },
      { color: "blue darken-4" },

      { color: "red darken-4" },
    ],
  }),
  methods: {
    changeColor(item) {
      this.color = item.color;
      console.log(item.color);
      this.$emit("update:color", item.color);
      this.$store.dispatch("supplierPageColor", item.color);
    },
  },
  computed: {
    color() {
      return this.$store.state.supplierPageColor;
    },
  },
};
</script>