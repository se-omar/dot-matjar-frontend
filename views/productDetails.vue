<template>
  <v-app>
    <v-content>
      <v-row>
        <v-col class="mr-10" cols="6">
          <br />
          <v-row>
            <p
              class="display-1 font-weight-medium"
            >اسم المنتج اسم المنتج اسم المنتج اسم المنتج اسم المنتج</p>
          </v-row>

          <v-row>
            <v-col>كود المنتج: 1212121</v-col>
            <v-col>كود التصدير (HS Code): 1212</v-col>
          </v-row>
          <br />
          <v-row>
            <v-col>
              <span style="font-size: 22px">سعر المنتج: 12312</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <span style="font-size: 22px">الحد الادني للطلب: 12312</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <span style="font-size: 22px">المشروع: اسم المشروع</span>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="mt-3" cols="5">
          <v-img style="height: 370px;" src="https://bulma.io/images/placeholders/480x480.png"></v-img>
        </v-col>
      </v-row>

      <v-row>
        <p class="display-1 mr-10">وصف المنتج \الخدمة</p>
      </v-row>

      <v-row>
        <v-col class="mr-5 ml-13">
          <p style="font-size: 19px">
            ر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن
            تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات
            أو عبارات محرجة أو غير لائقة مخبأة في هذا النص. بينما تعمل جميع
            مولّدات نصوص لوريم إيبسوم على الإنترنت على إعادة تكرار مقاطع من نص
            لوريم إيبسوم نفسه عدة مرات بما تتطلبه الحاجة، يقوم مولّدنا هذا
            باستخدام كلمات من قاموس يحوي على أكثر من 200 كلمة لا تينية، مضاف
            إليها مجموعة من الجمل النموذجية، لتكوين نص لوريم إيبسوم ذو شكل منطقي
            قريب إلى النص الحقيقي. وبالتالي يكون النص الناتح خالي من التكرار، أو
            أي كلمات أو عبارات غير لائقة أو ما شابه. وهذا ما يجعله أول مولّد نص
            لوريم إيبسوم حقيقي على الإنترنت.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="mr-10">
          <v-btn @click="viewPopup" color="secondary" block>
            <span style="font-size: 18px">اظهار بيانات صاحب المشروع</span>
          </v-btn>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="4">
          <v-btn color="secondary" block>
            <span style="font-size: 18px">طلب صاحب المشروع</span>
          </v-btn>
        </v-col>
      </v-row>
      <business-info-popup :dialog="dialog"></business-info-popup>
    </v-content>
  </v-app>
</template>

<script>
import businessInfoPopup from "../components/businessInfoPopup.vue";
export default {
  components: {
    businessInfoPopup
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    viewPopup() {
      this.dialog = true;
      console.log(this.dialog);
    }
  }
};
</script>
