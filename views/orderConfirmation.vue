<template>
  <v-app>
    <div id="app">
      <v-app>
        <v-container>
          <v-row>
            <v-col>
              <h1>{{ heading }}</h1>
              <v-btn color="black" class="white--text" @click="generatePDF"
                >Generate PDF</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ul>
                <li v-for="(item, index) in items" :key="index">
                  {{ item.title }} - {{ item.body }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-container>
        <div id="test">
          <v-container class="mt-16" style="width: 80%">
            <v-row justify="end" class="mr-6">
              <v-col cols="3">
                <span class="mb-4">
                  <span class="font-weight-black" style="font-size: 20px">
                    BILL FROM:</span
                  ><br />Dot-Matjar<br />
                  Serag Mall branch <br />Canada
                </span>
              </v-col>
              <v-col lg="3"></v-col>
              <v-col lg="3"></v-col>
              <v-col lg="3">
                <img
                  src="../assets/images/dotmatjar_logo.png"
                  width="180"
                  height="100"
                />
              </v-col>
            </v-row>
            <v-divider class="dark mx-16 mt-16 mb-16"></v-divider>
            <v-row>
              <v-col cols="3">
                <span class="mb-4">
                  <span class="font-weight-black" style="font-size: 20px">
                    BILL To:</span
                  ><br />Dot-Matjar<br />
                  Serag Mall branch <br />Canada
                </span>
              </v-col>
              <v-col lg="6"> </v-col>
              <v-col lg="3">
                <span class="font-weight-black mr-10" style="font-size: 20px"
                  >Date:</span
                >
                <span style="font-size: 20px">11/2/2020</span>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col lg="10">
                <v-simple-table>
                  <thead class="grey lighten-3">
                    <tr>
                      <th class="text-h6" style="font-weight: bold">Item</th>
                      <th class="text-h6" style="font-weight: bold">
                        Description
                      </th>
                      <th class="text-h6" style="font-weight: bold">
                        Quantitiy
                      </th>
                      <th class="text-h6" style="font-weight: bold">
                        Unit Cost
                      </th>
                      <th class="text-h6" style="font-weight: bold">
                        Line Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-h6">TEST</td>
                      <td class="text-h6">1</td>
                      <td class="text-h6">1</td>
                      <td class="text-h6">TEST</td>
                      <td class="text-h6">1</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-divider class="dark mx-16 mt-16 mb-16"></v-divider>
            <v-row justify="end">
              <v-col lg="4">
                <v-row>
                  <v-col lg="4">
                    <span
                      class="font-weight-black mr-10"
                      style="font-size: 20px"
                      >SubTotal:</span
                    >
                  </v-col>
                  <v-col lg="4">
                    <span style="font-size: 20px">200</span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col lg="4">
                    <span
                      class="font-weight-black mr-10"
                      style="font-size: 20px"
                      >Tax(14%):</span
                    >
                  </v-col>
                  <v-col lg="4">
                    <span style="font-size: 20px">200</span>
                  </v-col>
                </v-row>
                <v-card max-width="190" color="grey lighten-1">
                  <v-row>
                    <v-col lg="6">
                      <span
                        class="font-weight-black mr-10"
                        style="font-size: 20px"
                        >Total:</span
                      >
                    </v-col>
                    <v-col lg="6">
                      <span style="font-size: 20px">$200</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-app>
    </div>
  </v-app>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.12/vue.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.3.10/vuetify.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.js"></script>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2PDF from "jspdf-html2canvas";
export default {
  data() {
    return {
      heading: "Sample PDF Generator",
      moreText: [
        "This is another few sentences of text to look at it.",
        "Just testing the paragraphs to see how they format.",
        "jsPDF likes arrays for sentences.",
        "Do paragraphs wrap properly?",
        "Yes, they do!",
        "What does it look like?",
        "Not bad at all.",
      ],
      items: [
        { title: "Item 1", body: "I am item 1 body text" },
        { title: "Item 2", body: "I am item 2 body text" },
        { title: "Item 3", body: "I am item 3 body text" },
        { title: "Item 4", body: "I am item 4 body text" },
      ],
      bill: "testind PDF",
    };
  },
  methods: {
    generatePDF() {
      //   const columns = [
      //     { title: "Title", dataKey: "title" },
      //     { title: "Body", dataKey: "body" },
      //   ];
      //   const doc = new jsPDF({
      //     orientation: "portrait",
      //     unit: "in",
      //     format: "letter",
      //   });
      //   // text is placed using x, y coordinates
      //   doc.setFontSize(16).text(this.heading, 0.5, 1.0);
      //   // create a line under heading
      //   doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      //   // Using autoTable plugin
      //   doc.autoTable({
      //     columns,
      //     body: this.items,
      //     margin: { left: 0.5, top: 1.25 },
      //   });
      //   // Using array of sentences
      //   doc
      //     .setFont("helvetica")
      //     .setFontSize(12)
      //     .text(this.moreText, 0.5, 3.5, { align: "left", maxWidth: "7.5" });

      //   // Creating footer and saving file
      //   doc
      //     .setFont("times")
      //     .setFontSize(11)
      //     .setFontStyle("italic")
      //     .setTextColor(0, 0, 255)
      //     .text(
      //       "This is a simple footer located .5 inches from page bottom",
      //       0.5,
      //       doc.internal.pageSize.height - 0.5
      //     )
      //     .save(`${this.heading}.pdf`);
      //   const doc = new jsPDF({
      //     orientation: "portrait",
      //   });
      var imageData =
        "data:image/png;base64,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";

      //   doc.text("test", 50, 50);
      //   doc.addImage(imageData, "JPEG", 0, 0, 50, 20);
      //   //     doc.text(this.bill, 20, 10);

      //   doc.save("a4WS.pdf");

      // Or use javascript directly:
      // doc.autoPrint

      //   doc.autoTable({
      //     styles: { overflow: "hidden" },
      //     head: [["Name", "Email", "Country"]],
      //     body: [
      //       ["David", "david@example.com", "Sweden"],
      //       ["Castille", "castille@example.com", "Spain"],
      //       // ...
      //     ],
      //   });
      //   doc.autoTable({
      //     styles: { overflow: "linebreak" },

      //     head: [["Name", "Email", "Country"]],
      //     body: [
      //       ["David", "david@example.com", "Sweden"],
      //       ["Castille", "castille@example.com", "Spain"],
      //       // ...
      //     ],
      //   });
      //   doc.autoTable(movimientos.columns, movimientos.rows, {
      //     styles: { overflow: "linebreak" },
      //     columnStyles: {
      //       fechaMovimiento: { columnWidth: 120 },
      //       descripcionMovimiento: { columnWidth: 200 },
      //     },
      //     margin: { top: 210 },
      //     addPageContent: function (data) {
      //       pdf.setTextColor(255, 255, 255);
      //       pdf.text(
      //         "Tabla " +
      //           datos.fecha +
      //           " " +
      //           datos.fecha +
      //           " N° " +
      //           datos.numeroCuenta
      //       );
      //     },
      //   });
      const html2PDF = require("jspdf-html2canvas");
      html2PDF(document.getElementById("test"), {
        onrendered: function (canvas) {
          var doc = new jsPDF();
          var image = canvas.toDataURL("../assets/images/dotmatjar_logo");
          doc.addImage(image, 0, 0, 100, 100);
          doc.setFillColor(20);
          doc.save("test.pdf");
        },
      });
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