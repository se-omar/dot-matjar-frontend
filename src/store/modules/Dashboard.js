import axios from "axios";
// import router from '../router'

export default {
  state: {
    topProduct: {},
    leastProduct: {},
    notSortedDashboardOrders: [],
    myProducts: [],
  },

  mutations: {
    getTopSellingProduct(state, topProduct) {
      state.topProduct = topProduct;
    },

    getLeastSellingProduct(state, leastProduct) {
      state.leastProduct = leastProduct;
    },

    getMyProducts(state, myProducts) {
      state.myProducts = [];
      var currencies = JSON.parse(localStorage.getItem("rates"));
      var currentCurrency = localStorage.getItem("currentCurrency");

      myProducts.forEach((element) => {
        if (element.currency !== currentCurrency) {
          if (currencies.EGP) {
            var egp = currencies.EGP;
            if (element.currency == "egp") {
              element.unit_price = Math.trunc(element.unit_price / egp);
            } else if (element.currency == "usd") {
              element.unit_price = Math.trunc(element.unit_price * egp);
            }
          }
        }
      });
      state.myProducts.push(...myProducts);
    },

    getMonthlySales(state, orders) {
      state.notSortedDashboardOrders = orders;
    },
    filterSupplierProductsTable(state , products){
      state.myProducts = products
    }
  },

  actions: {
    async getTopSellingProduct(context, id) {
      await axios
        .post(context.rootState.nodeHost + "/api/topSellingProduct", {
          user_id: id,
        })
        .then((response) => {
          context.commit("getTopSellingProduct", response.data.maxProduct);
        });
    },

    async getLeastSellingProduct(context, id) {
      await axios
        .post(context.rootState.nodeHost + "/api/leastSellingProduct", {
          user_id: id,
        })
        .then((response) => {
          context.commit("getLeastSellingProduct", response.data.minProduct);
        });
    },

    async getMyProducts(context, id) {
      await axios
        .post(context.rootState.nodeHost + "/api/myProducts", {
          user_id: id,
        })
        .then((response) => {
          context.commit("getMyProducts", response.data);
        });
    },

    async getMonthlySales(context, id) {
      await axios
        .post(context.rootState.nodeHost + "/api/monthlySales", {
          user_id: id,
        })
        .then((response) => {
          context.commit("getMonthlySales", response.data);
        });
    },
    async filterSupplierProductsTable(context , {productsSearch , searchType , supplier_id}){
      axios
        .put(context.rootState.nodeHost + "/api/filterSupplierProducts", {
          categoryArray:null,
          supplier_id,
          productsSearch,
          searchType,
        })
        .then((products) => {
      
          context.commit("filterSupplierProductsTable", 
           products.data.data
            
          );
        });
    }
  },
};
