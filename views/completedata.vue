<template>
  <div id="app">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-col cols="12">
              <v-select
                v-model="gender"
                :items="genderr"
                :label="$t('completedata.gender')"
                shaped
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
              :label="$t('completedata.name')"
              outlined
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
                  :label="$t('completedata.birthday')"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
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
              :label="$t('completedata.qualification')"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="job"
              :label="$t('completedata.job')"
              outlined
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
              :label="$t('completedata.region')"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="phoneNumber"
              :label="$t('completedata.mobileNumber')"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="mobileNumber"
              :label="$t('completedata.telephoneNumber')"
              outlined
              :rules="[rules.numbers]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="fax"
              :label="$t('completedata.fax')"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-text-field
              v-model="email"
              :label="$t('completedata.email')"
              filled
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="facebookAccount"
              :label="$t('completedata.facebook')"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="linkedin"
              label="Linkedin"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="website"
              :label="$t('completedata.website')"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="address"
              :label="$t('completedata.address')"
              outlined
              color="teal"
            >
              <template v-slot::label>
                <div>{{ $t("completedata.address") }}</div>
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
              @click="completedata"
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
              >{{ $t("completedata.cancel") }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "completedata",
  components: {},
  methods: {
    completedata() {
      this.$store.dispatch("completedata", {
        national_number: this.nationalNumber,
        gender: this.gender,
        full_arabic_name: this.fullArabicName,
        full_english_name: this.fullEnglishName,
        birthdate: this.birthDate,
        qualifications: this.qualifications,
        job: this.job,
        governorate: this.governorate,
        village: this.village,
        center: this.center,
        phone_number: this.phoneNumber,
        mobile_number: this.mobileNumber,
        fax: this.fax,
        facebook_account: this.facebookAccount,
        linkedin: this.linkedin,
        website: this.website,
        address: this.address,
        email: this.email,
      });
    },
    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
  },
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    this.$store.dispatch("getGovernorate");
    this.nationalNumber = this.currentUser.national_number;
    this.fullArabicName = this.currentUser.full_arabic_name;
    this.email = this.currentUser.email;
    this.gender = this.currentUser.gender;
    this.fullEnglishName = this.currentUser.fullEnglishName;
    this.birthDate = this.currentUser.birthDate;
    this.qualifications = this.currentUser.qualifications;
    this.job = this.currentUser.job;
    this.governorate = this.currentUser.governorate;
    this.region = this.currentUser.region;
    this.phoneNumber = this.currentUser.phoneNumber;
    this.mobileNumber = this.currentUser.mobileNumber;
    this.fax = this.currentUser.fax;
    this.facebookAccount = this.currentUser.facebookAccount;
    this.linkedin = this.currentUser.linkedin;
    this.website = this.currentUser.website;
    this.address = this.currentUser.address;
    console.log("current user ", this.currentUser);
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
  }),
  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    governorates() {
      return this.$store.state.Home.governorates;
    },
    regions() {
      return this.$store.state.Home.regions;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
        };
      }
    },
  },
};
</script>
<style scoped>
</style>