import axios from 'axios'
// import router from '../router'

export default {
    state: {
        recievedRequests: JSON.parse(localStorage.getItem('recievedRequests')),
        sentRequests: JSON.parse(localStorage.getItem('sentRequests')),
        viewRequestDetails: false,
        currentRequest: {},
        responseDialog: false,
    },

    mutations: {
        getRecievedRequests(state, payload) {
            localStorage.setItem('recievedRequests', JSON.stringify(payload))
            state.recievedRequests = JSON.parse(localStorage.getItem('recievedRequests'));
        },

        getSentRequests(state, payload) {
            localStorage.setItem('sentRequests', JSON.stringify(payload))
            state.sentRequests = JSON.parse(localStorage.getItem('sentRequests'));
        },

        viewRequestCard(state) {
            state.viewRequestDetails = false
        },

        getCurrentRequest(state, payload) {
            state.currentRequest = payload;
        },

        viewRequestDetails(state) {
            state.viewRequestDetails = true
        },

        toggleResponse(state) {
            state.responseDialog = !state.responseDialog;
        },

    },

    actions: {
        getRecievedRequests(context) {
            axios.post(context.rootState.nodeHost + "/api/recievedRequests", {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then(response => {
                    context.commit('getRecievedRequests', response.data);
                });
        },

        getSentRequests(context) {
            axios.post(context.rootState.nodeHost + "/api/sentRequests", {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then(response => {
                    console.log(response.data);
                    context.commit('getSentRequests', response.data);
                });
        },

        getCurrentRequest(context, request) {
            context.commit('getCurrentRequest', request)
        },

        sendRequest(context, requestDetails) {
            if (context.rootState.Home.currentUser.user_id === context.rootState.ProductDetails.currentProduct.user_id) {
                alert('لا يمكن ارسال طلب لنفسك');
                return

            }
            axios.post(context.rootState.nodeHost + '/api/sendRequest', {
                by_user_id: context.rootState.Home.currentUser.user_id,
                to_user_id: context.rootState.ProductDetails.currentProduct.user_id,
                request_details: requestDetails,
                request_date: new Date(),
                product_id: context.rootState.ProductDetails.currentProduct.product_id,
                //to: context.state.currentProduct.bussiness.user.email
            }).then(response => {
                console.log(response)
                alert('تم ارسال الطلب بنجاح')
            })
        },

        sendRequestResponse(context, responseDetails) {
            axios.post(context.rootState.nodeHost + '/api/sendRequestResponse', {
                requests_id: context.state.currentRequest.requests_id,
                request_response: responseDetails
            }).then(response => {
                if (response.data === 'response added successfully')
                    alert('تم ارسال الرد بنجاح')
                console.log(response)
            })
        },
    }
}