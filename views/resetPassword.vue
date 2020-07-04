<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <p class="display-1">هل نسيت كلمة المرور</p>
      </v-row>
      <br />
      <v-row justify="center">
        <p style="font-size: 30px;">ادخال البريد الالكتروني و الرقم القومي لاعادة تعيين كلمة المرور</p>
      </v-row>
      <v-row justify="center">
        <v-col cols="7">
          <v-text-field label="البريد الالكتروني"></v-text-field>
        </v-col>
        <v-col cols="7">
          <v-text-field label="الرقم القومي"></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="7">
          <v-btn class="primary" dense block>
            <span style="font-size: 18">ارسال</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>