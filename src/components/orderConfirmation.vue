<template>
  <v-app>
    <div id="app">
      <v-row justify="center">
        <v-btn
          large
          :color="siteColor.button_color"
          @click="generatePDF"
          rounded
          ><span :style="siteColor.button_text_color">{{
            $t("userOrders.generatePDF")
          }}</span></v-btn
        >
      </v-row>
      <div id="BillPDF">
        <v-container style="width: 80%">
          <v-row justify="end">
            <v-col cols="6" lg="3" md="3" sm="6">
              <span class="mb-4">
                <span class="font-weight-black" style="font-size: 20px">
                  BILL FROM:</span
                ><br />Dot-Matjar<br />
                Serag Mall branch <br />Egypt<br />
                Cairo<br />dotmatjarofficial@gmail.com
              </span>
            </v-col>
            <v-col lg="3" sm="1" md="3" cols="1"></v-col>
            <v-col lg="3" sm="1" md="3" cols="1"></v-col>
            <v-col lg="3" cols="4" sm="4" md="3">
              <img
                v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
                src="../assets/images/dotmatjar_logo.png"
                width="180"
                height="100"
              />
              <img
                v-else
                src="../assets/images/dotmatjar_logo.png"
                width="100"
                height="50"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="6" lg="3" md="3" sm="6">
              <span class="mb-4">
                <span class="font-weight-black" style="font-size: 20px">
                  BILL To:</span
                ><br />{{
                  billOrderData.user ? billOrderData.user.full_arabic_name : ""
                }}<br />
                {{ billOrderData.address_line_1 }}<br />
                {{ billOrderData.city }}
                <br />
                {{ billOrderData.country }}<br />
                {{ billOrderData.user ? billOrderData.user.mobile_number : "" }}
                <br />{{ billOrderData.user ? billOrderData.user.email : ""
                }}<br />
              </span>
            </v-col>
            <v-col lg="6" sm="2" cols="1"> </v-col>
            <v-col lg="2" cols="5" md="3" sm="4">
              <v-card
                class="grey lighten-3"
                v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
              >
                <span
                  class="font-weight-black mr-12 ml-1"
                  style="font-size: 20px"
                  >Date:</span
                >
                <span style="font-size: 18px">{{
                  billOrderData.order_date
                }}</span>
              </v-card>
              <v-card class="grey lighten-3" v-else>
                <span
                  class="font-weight-black mr-2 ml-1"
                  style="font-size: 15px"
                  >Date:</span
                >
                <span style="font-size: 15px">{{
                  billOrderData.order_date
                }}</span>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col lg="10" cols="12" sm="12" md="10">
              <v-simple-table
                v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
              >
                <thead class="grey lighten-3">
                  <tr>
                    <th class="text-sm-body-1" style="font-weight: bold">
                      Item
                    </th>

                    <th class="text-sm-body-1" style="font-weight: bold">
                      Quantitiy
                    </th>
                    <th class="text-sm-body-1" style="font-weight: bold">
                      Unit Cost
                    </th>
                    <th class="text-sm-body-1" style="font-weight: bold">
                      Line Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in billOrderProducts"
                    :key="index"
                  >
                    <td class="text-sm-body-1">
                      {{ product.product.product_name }}
                    </td>
                    <td class="text-sm-body-1">{{ product.quantity }}</td>

                    <td class="text-sm-body-1">
                      {{ product.product.unit_price }}
                    </td>
                    <td class="text-sm-body-1">
                      {{ product.product.unit_price * product.quantity }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-simple-table v-else>
                <thead class="grey lighten-3">
                  <tr>
                    <th class="text-sm-body" style="font-weight: bold">Item</th>

                    <th class="text-sm-body" style="font-weight: bold">
                      Quantitiy
                    </th>
                    <th class="text-sm-body" style="font-weight: bold">
                      Unit Cost
                    </th>
                    <th class="text-sm-body" style="font-weight: bold">
                      Line Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in billOrderProducts"
                    :key="index"
                  >
                    <td class="text-sm-body">
                      {{ product.product.product_name }}
                    </td>
                    <td class="text-sm-body">{{ product.quantity }}</td>

                    <td class="text-sm-body">
                      {{ product.product.unit_price }}
                    </td>
                    <td class="text-sm-body">
                      {{ product.product.unit_price * product.quantity }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-divider class="dark"></v-divider>
          <v-row
            justify="end"
            v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
          >
            <v-col lg="4" md="4" sm="6" cols="8">
              <v-row>
                <v-col lg="5">
                  <span class="font-weight-black mr-10" style="font-size: 20px"
                    >SubTotall:</span
                  >
                </v-col>
                <v-col lg="3">
                  <span style="font-size: 20px">{{ subTotal }}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="5">
                  <span class="font-weight-black mr-10" style="font-size: 20px"
                    >Tax(14%):</span
                  >
                </v-col>
                <v-col lg="3">
                  <span style="font-size: 20px">{{ tax }}</span>
                </v-col>
              </v-row>
              <v-col lg="8" cols="12" md="9" sm="7">
                <v-card class="grey lighten-3">
                  <span
                    class="font-weight-black mr-12 ml-1"
                    style="font-size: 20px"
                    >TOTAL:</span
                  >
                  <span style="font-size: 20px">{{ tax + subTotal }}</span>
                </v-card>
              </v-col>
            </v-col>
          </v-row>
          <v-row justify="end" v-else>
            <v-col lg="4" md="4" sm="6" cols="8">
              <v-row>
                <v-col lg="4">
                  <span class="font-weight-black mr-10" style="font-size: 15px"
                    >SubTotal:</span
                  >
                </v-col>
                <v-col lg="4">
                  <span style="font-size: 15px">{{ subTotal }}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="4">
                  <span class="font-weight-black mr-10" style="font-size: 15px"
                    >Tax(14%):</span
                  >
                </v-col>
                <v-col lg="4">
                  <span style="font-size: 15px">{{ tax }}</span>
                </v-col>
              </v-row>
              <v-col lg="6" cols="12" md="9" sm="7">
                <v-card class="grey lighten-3">
                  <span
                    class="font-weight-black mr-12 ml-1"
                    style="font-size: 15px"
                    >TOTAL:</span
                  >
                  <span style="font-size: 15px">{{ tax + subTotal }}</span>
                </v-card>
              </v-col>
            </v-col>
          </v-row>
          <v-divider class="dark"></v-divider>
          <v-row justify="center">
            <h2 style="font-family: Trattatello, fantasy">Thank You</h2>
          </v-row>
          <v-row justify="start">
            <v-col cols="8" lg="4" sm="5" md="5">
              <span class="mb-4">
                <span class="font-weight-black" style="font-size: 15px">
                  TERMS & CONDITIONS</span
                ><br />Payment is due within 15 days<br />
              </span>
            </v-col>
            <v-col lg="6"> </v-col>
            <v-col lg="2"> </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.js"></script>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2PDF from "jspdf-html2canvas";
export default {
  data() {
    return {};
  },
  props: {
    order_id: {
      type: Number,
      default: null,
    },
  },
  async created() {
    await this.$store.dispatch("getOrder", { order_id: this.order_id });
    setTimeout(() => {
      console.log(
        "order and products",
        this.billOrderData,
        this.billOrderProducts
      );
    }, 300);
  },
  methods: {
    generatePDF() {
      const html2PDF = require("jspdf-html2canvas");
      html2PDF(document.getElementById("BillPDF"), {
        onrendered: function (canvas) {
          var doc = new jsPDF();
          var image = canvas.toDataURL("../assets/images/dotmatjar_logo");
          doc.addImage(image, 0, 0, 100, 100);
          doc.setFillColor(20);
          doc.save("Bill.pdf");
        },
      });
    },
  },
  computed: {
    billOrderData() {
      return this.$store.state.Orders.billOrderData;
    },
    billOrderProducts() {
      return this.$store.state.Orders.billOrderProducts;
    },
    subTotal() {
      var total = 0;
      this.$store.state.Orders.billOrderProducts.forEach((element) => {
        total += element.quantity * element.product.unit_price;
      });
      return total;
    },
    tax() {
      var t = (this.subTotal * 14) / 100;
      return t;
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
.bigTxt {
  font-size: 20px;
  font-weight: bold;
}
</style>