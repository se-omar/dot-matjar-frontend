<template>
  <v-app class="grey lighten-4">
    <v-row justify="center">
      <v-col lg="9">
        <v-container
          v-if="
            (currentUser && currentUser.user_type == 'business') ||
            currentUser.user_type == 'admin'
          "
        >
          <v-row justify="center">
            <p class="display-1">
              {{ currentUser.full_arabic_name }} {{ $t("myProducts.products") }}
            </p>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>

          <v-row justify="center">
            <v-btn
              large
              @click="
                $router.push(`/${$i18n.locale}/addProduct`).catch((err) => {})
              "
              :color="siteColor.button_color"
            >
              <span :style="`color:${siteColor.button_text_color}`">
                <i class="fa fa-plus fa-2x mt-1"></i
              ></span>
            </v-btn>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>
          <v-row v-if="myProducts.length != 0">
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="6"
              v-for="myProduct in myProducts"
              :key="myProduct.id"
            >
              <product
                class="ml-n2 mr-n2"
                :addToCartButton="false"
                :filteredProduct="myProduct"
              ></product>
            </v-col>
          </v-row>

          <v-row class="mt-16" justify="center" v-else>
            <p class="display-1">No data available</p>
          </v-row>
        </v-container>

        <v-container
          v-else-if="!currentUser || currentUser.user_type != 'business'"
        >
          <v-row justify="center">
            <p class="display-1">You cannot proceed to this page</p>
          </v-row>
        </v-container>

        <v-container v-else>
          <v-row justify="center">
            <p class="display-1">No products available</p>
          </v-row>
        </v-container>
        <v-divider class="mx-15"></v-divider>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
//import Product from "../components/product.vue";

export default {
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getMyProducts", this.currentUser.user_id);
    await this.$store.dispatch("getSiteColor");
  },

  computed: {
    myProducts() {
      return this.$store.state.Dashboard.myProducts;
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

  components: {
    product: () => import("../components/product"),
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");
.arabic {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
span {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
p {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
.smallerText {
  font-size: 20px;
}

.img {
  border-radius: 50%;
}
.size {
  font-size: 20px;
  font-weight: bold;
}
.x {
  margin-right: 20%;
  font-weight: bold;
}
.username {
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: black;
}

.mos {
  color: beige;
}
#profilePhoto {
  opacity: 0;
  z-index: inherit;
}
#picture {
  margin-right: 15%;
  border-radius: 50%;
  text-align: center;
}
#fileUpload {
  text-align: center;
}
.font {
  font-size: 14px;
}
</style>


