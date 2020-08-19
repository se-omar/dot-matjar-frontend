<template>
  <v-app>
    <v-card :class="changeColor">
      <test2 :color.sync="changeColor"></test2>
      <p>change please</p>
    </v-card>
  </v-app>
</template>

<script>
import test2 from "./test2.vue";
export default {
  components: {
    test2,
  },
  data() {
    return {
      documentationLink:
        "https://creativetimofficial.github.io/vue-material-dashboard/documentation",
      shareUrl: "https://www.creative-tim.com/product/vue-material-dashboard",
      buyUrl: "",
      freeUrl: "https://www.creative-tim.com/product/vue-material-dashboard",
      isOpen: false,
      sidebarColors: [
        { color: "purple", active: false },
        { color: "blue", active: false },
        { color: "green", active: true },
        { color: "orange", active: false },
        { color: "red", active: false },
        { color: "yellow", active: false },
      ],
      sidebarImages: [],
      changeColor: "red",
      color: "blue",
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    },
    toggleList(list, itemToActivate) {
      list.forEach((listItem) => {
        listItem.active = false;
      });
      itemToActivate.active = true;
    },
    updateValue(name, val) {
      console.log(name);
      this.$emit(`update:${name}`, val);
    },
    changeSidebarBackground(item) {
      console.log(item);
      this.$emit("update:color", item.color);
      this.toggleList(this.sidebarColors, item);
    },
    changeSidebarImage(item) {
      this.$emit("update:image", item.image);
      this.toggleList(this.sidebarImages, item);
    },
  },
  computed: {},
};
</script>