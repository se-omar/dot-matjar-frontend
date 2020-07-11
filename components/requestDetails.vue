<template>
  <v-card href width="700" v-if="requestClicked">
    <v-card-title style="font-size: 30px" class="mr-1">
      <v-row justify="space-between">
        <v-col cols="9">اسم المنتج</v-col>
        <v-col cols="3">
          <span style="font-size: 17px">تحت الاجراء</span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-row justify="space-between" class="mt-n8 mb-n5">
      <v-col cols="6">
        <v-card-text>تاريخ ارسال الطلب</v-card-text>
      </v-col>

      <v-col class="mt-1" cols="3">
        <v-btn class="primary">الرد علي الطلب</v-btn>
      </v-col>

      <v-col class="mt-n9" cols="6">
        <v-card-text>رقم الطلب: 123</v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="mt-n2" justify="space-between">
      <v-col>
        <v-card-text>
          <span style="font-size: 19px">مقدم الطلب: عمرر</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row class="mt-n5">
      <v-col>
        <v-card-text>
          <span style="font-size: 19px">البريد الالكتروني: miroayman639@gmail.com</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row class="mt-n5">
      <v-col>
        <v-card-text>
          <span style="font-size: 19px">رقم الموبايل: 01154378588</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-card-text>
          <span style="font-size: 30px">وصف الطلب</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row class="mt-n9">
      <v-col>
        <v-card-text>
          <span
            style="font-size: 16px"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Et culpa distinctio exercitationem eum. Voluptatum eligendi velit saepe unde eaque at officiis repellat aliquam, modi illo, ipsa enim minima laboriosam officia.</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>


<script>
export default {
  props: {
    request: {
      type: Object,
      default: null
    },
    requestClicked: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log(this.request);
  }
};
</script>