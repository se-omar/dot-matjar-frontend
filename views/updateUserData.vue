<template>
  <div id="app">
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <v-select
              :placeholder="$t('completedata.userType')"
              rounded
              outlined
              :items="userTypes"
              v-model="userType"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-col cols="12">
              <v-select
                v-model="gender"
                :items="genderr"
                :label="$t('completedata.gender')"
                shaped
                class="arabic"
              ></v-select>
            </v-col>

            <!-- <v-text-field
            v-model="gender"
            :label="النوع"
            
            shaped
            outlined
            ></v-text-field>-->
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="fullArabicName"
              :placeholder="$t('completedata.name')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-x
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="birthDate"
                  :placeholder="$t('completedata.birthday')"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  class="arabic"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="birthDate"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="qualifications"
              :placeholder="$t('completedata.qualification')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="job"
              :placeholder="$t('completedata.job')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              dense
              v-model="governorate"
              :items="governorates"
              :label="$t('completedata.governorate')"
              outlined
              @change="getCountryRegions"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="region"
              :items="regions"
              dense
              :placeholder="$t('completedata.region')"
              outlined
              class="arabic"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="mobileNumber"
              :placeholder="$t('completedata.mobileNumber')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="phoneNumber"
              :placeholder="$t('completedata.telephoneNumber')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="fax"
              :placeholder="$t('completedata.fax')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-text-field
              v-model="email"
              :placeholder="$t('completedata.email')"
              filled
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="facebookAccount"
              :placeholder="$t('completedata.facebook')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="linkedin"
              :placeholder="$t('completedata.linkedin')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="website"
              :placeholder="$t('completedata.website')"
              outlined
              class="arabic"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="address"
              :placeholder="$t('completedata.address')"
              outlined
              color="teal"
              class="arabic"
            >
              <template v-slot::label>
                <div class="arabic">{{ $t("completedata.address") }}</div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="3" xsm="12">
            <v-btn
              x-large
              block
              :color="siteColor.button_color"
              @click="updateUserInfo"
              ><span :style="`color:${siteColor.button_text_color}`">{{
                $t("completedata.save")
              }}</span></v-btn
            >
          </v-col>
          <v-col cols="12" sm="3" xsm="12">
            <v-btn
              x-large
              block
              color="red white--text"
              @click="$router.push('/')"
              ><span>{{ $t("completedata.cancel") }}</span></v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn class="red white--text" @click="dialog = true">
            <span>{{ $t("completedata.removeUserAccount") }}</span>
          </v-btn>
        </v-row>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="headline">{{
              $t("completedata.dialogQuestion")
            }}</v-card-title>

            <v-card-text>{{
              $t("completedata.dialogDescription")
            }}</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="red" text @click="dialog = false"
                ><span>{{
                  $t("updateSupplierPage.dialogDisApprovalButton")
                }}</span></v-btn
              >

              <v-btn text color="green" @click="deleteUser"
                ><span>{{
                  $t("updateSupplierPage.dialogApprovalButton")
                }}</span></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
    updateUserInfo() {
      this.$store.dispatch("updateUserInfo", {
        national_number: this.nationalNumber,
        gender: this.gender,
        full_arabic_name: this.fullArabicName,
        full_english_name: this.fullEnglishName,
        birthdate: this.birthDate,
        qualifications: this.qualifications,
        job: this.job,
        governorate: this.governorate,

        region: this.region,
        center: this.center,
        phone_number: this.phoneNumber,
        mobile_number: this.mobileNumber,
        fax: this.fax,
        facebook_account: this.facebookAccount,
        linkedin: this.linkedin,
        website: this.website,
        address: this.address,
        email: this.email,
        user_id: this.$route.params.user_id,
        user_type: this.userType,
      });
      this.dialog = false;
      this.$router.push(`/${this.$i18n.locale}/allUsers`);
    },
    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    deleteUser() {
      console.log(this.$route.params.user_id);
      this.$store.dispatch("deleteUser", this.$route.params.user_id);
      this.dialog = false;
      this.$router.push(`/${this.$i18n.locale}/allUsers`);
    },
  },
  async created() {
    await this.$store.dispatch("getSiteColor");
    await this.$store.dispatch("getUser", this.$route.params.user_id);
    await this.$store.dispatch("getGovernorate");
    setTimeout(() => {
      this.nationalNumber = this.currentUser.national_number;
      this.fullArabicName = this.currentUser.full_arabic_name;
      this.email = this.currentUser.email;
      this.gender = this.currentUser.gender;
      this.fullEnglishName = this.currentUser.fullEnglishName;
      this.birthDate = this.currentUser.birthdate;
      this.qualifications = this.currentUser.qualifications;
      this.job = this.currentUser.job;
      this.governorate = this.currentUser.governorate;
      this.region = this.currentUser.region;
      this.phoneNumber = this.currentUser.phone_number;
      this.mobileNumber = this.currentUser.mobile_number;
      this.fax = this.currentUser.fax;
      this.facebookAccount = this.currentUser.facebook_account;
      this.linkedin = this.currentUser.linkedin;
      this.website = this.currentUser.website;
      this.address = this.currentUser.address;
      this.userType = this.currentUser.user_type;
    }, 500);

    console.log("current user in update user data ", this.currentUser);
  },
  data: () => ({
    rules: {
      ex: (v) => !!v || "This field is required",
      phonenumber: (v) =>
        (v && v.length >= 8) || "telenumber must be 8 NUMBERS at least",

      must: (v) => (v && v.length == 14) || "ID must be 14 NUMBERS",
      numbers: (v) => /\d+/.test(v) || "Enter numbers",
    },
    genderr: ["male", "female", "other"],

    nationalNumber: "",
    gender: "",
    fullEnglishName: "",
    birthDate: "",
    fullArabicName: "",
    qualifications: "",
    job: "",
    governorate: "",
    village: "",
    center: "",
    phoneNumber: "",
    mobileNumber: "",
    fax: "",
    facebookAccount: "",
    linkedin: "",
    website: "",
    address: "",
    email: "",

    region: "",

    egyptGovernorates: [
      "الإسكندرية",
      "الإسماعيلية",
      "أسوان",
      "أسيوط",
      "الأقصر",
      "البحر الأحمر",
      "البحيرة",
      "بني سويف",
      "بورسعيد",
      "جنوب سيناء",
      "الجيزة",
      "الدقهلية",
      "دمياط",
      "سوهاج",
      "السويس",
      "الشرقية",
      "شمال سيناء",
      "الغربية",
      "الفيوم",
      "القاهرة",
      "القليوبية",
      "قنا",
      "كفر الشيخ",
      "مطروح",
      "المنوفية",
      "المنيا",
      "الوادي الجديد",
    ],
    userTypes: ["admin", "business", "user"],
    userType: "",
    dialog: false,
  }),
  computed: {
    currentUser() {
      return this.$store.state.Home.user;
    },
    governorates() {
      return this.$store.state.Home.governorates;
    },
    regions() {
      return this.$store.state.Home.regions;
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
div {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
</style>