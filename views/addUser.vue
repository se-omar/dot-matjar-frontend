<template>
  <v-app>
    <v-main class="mx-15">
      <v-row justify="center">
        <p class="text-h4">{{ $t("addUser.addNewUser") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col order-sm="2" lg="9">
          <v-form v-model="valid">
            <v-row>
              <v-col lg="4" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="fullName"
                  :rules="[rules.required]"
                  :label="$t('addUser.fullName')"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-text-field
                  type="email"
                  v-model="email"
                  :rules="[rules.required]"
                  :label="$t('addUser.email')"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="password"
                  type="password"
                  :rules="[rules.required]"
                  :label="$t('addUser.password')"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-text-field
                  type="password"
                  :rules="[rules.required]"
                  :label="$t('addUser.confirmPassword')"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-text-field
                  type="number"
                  v-model="mobileNumber"
                  :rules="[rules.required]"
                  :label="$t('addUser.mobileNumber')"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="facebook"
                  :rules="[rules.required]"
                  :label="$t('addUser.facebook')"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="storeName"
                  :rules="[rules.required]"
                  :label="$t('addUser.storeName')"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-select
                  :rules="[rules.required]"
                  v-model="selectedGender"
                  :items="['male', 'female']"
                  :label="$t('addUser.gender')"
                  outlined
                ></v-select>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-select
                  :items="governorates"
                  v-model="selectedGovernorate"
                  :rules="[rules.required]"
                  @change="getRegions"
                  :label="$t('addUser.governorate')"
                  outlined
                ></v-select>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-select
                  :rules="[rules.required]"
                  v-model="selectedRegion"
                  :items="regions"
                  :label="$t('addUser.region')"
                  outlined
                ></v-select>
              </v-col>

              <v-col lg="4" md="6" sm="12" cols="12">
                <v-select
                  :rules="[rules.required]"
                  v-model="selectedUserType"
                  :label="$t('addUser.userType')"
                  :items="userTypes"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <v-col order-sm="1" order-lg="2" order-md="2" lg="3" md="3" sm="12">
          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>{{ $t("addUser.profilePic") }}</label>
                <v-file-input
                  @change="setProfilePic"
                  accept="image/*"
                ></v-file-input>

                <v-img
                  :src="viewProfilePic"
                  width="300px"
                  height="290px"
                ></v-img>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col lg="2">
          <v-btn
            @click="addUser"
            class="primary"
            :disabled="!valid"
            large
            block
            >{{ $t("addUser.addUser") }}</v-btn
          >
        </v-col>

        <v-col lg="2">
          <v-btn
            @click="$router.push(`/${$i18n.locale}/adminPage`)"
            large
            block
            >{{ $t("addUser.cancel") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("getGovernorate");
  },
  data: () => {
    return {
      viewProfilePic: "",
      profilePic: "",
      valid: false,
      userTypes: ["user", "business"],
      fullName: "",
      email: "",
      password: "",
      mobileNumber: "",
      facebook: "",
      storeName: "",
      selectedGovernorate: "",
      selectedUserType: "",
      selectedRegion: "",
      selectedGender: "",
      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => (v && v.length >= 7) || "Min 7 characters",
      },
    };
  },
  computed: {
    governorates() {
      return this.$store.state.Home.governorates;
    },
    regions() {
      return this.$store.state.Home.regions;
    },
  },
  methods: {
    setProfilePic(image) {
      this.profilePic = image;
      this.viewProfilePic = URL.createObjectURL(image);
    },
    getRegions(gov) {
      this.$store.dispatch("getRegions", gov);
    },
    addUser() {
      var form = new FormData();
      form.set("fullName", this.fullName);
      form.set("email", this.email);
      form.set("password", this.password);
      form.set("mobileNumber", this.mobileNumber);
      form.set("facebook", this.facebook);
      form.set("storeName", this.storeName);
      form.set("governorate", this.selectedGovernorate);
      form.set("userType", this.selectedUserType);
      form.set("region", this.selectedRegion);
      form.set("gender", this.selectedGender);
      form.append("file", this.profilePic);

      this.$store.dispatch("addNewUser", form);
      this.$router.push(`/${this.$i18n.locale}/adminPage`);
    },
  },
};
</script>