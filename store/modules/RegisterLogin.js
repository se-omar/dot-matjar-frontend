/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from '../../router'

export default {
    state: {
        loginToken: localStorage.getItem('loginToken'),
        emailSentMessage: ''
    },

    mutations: {
        login(state, token) {
            localStorage.setItem('loginToken', token)
            state.loginToken = localStorage.getItem('loginToken');
        },
        businessOwnerRegistration(state, message) {
            state.emailSentMessage = message
        }
    },

    actions: {
        async login(context, { email, password }) {
            await axios.post(context.rootState.nodeHost + "/api/login",
                { email, password })
                .then((response) => {
                    if (response.data.message === 'please sign up first' || response.data.message === 'Please activate your account' || response.data.message === 'authentication failed') {
                        return alert(response.data.message);
                    }
                    context.commit('login', response.data.token);
                    router.push('/')

                })
                .catch((error) => {

                });
        },

        register(context, {
            email,
            password,
            full_arabic_name,
            mobile_number,
            national_number,
            governorate,
            region,
            siteLanguage
        }) {
            axios.post(context.rootState.nodeHost + '/api/signup', {
                email,
                password,
                full_arabic_name,
                mobile_number,
                national_number,
                governorate,
                region,
                siteLanguage

            })
                .then(response => {
                    if (response.data.message) {
                        alert(response.data.message)
                    }
                })
                .catch(error => {

                })
        },
        businessOwnerRegistration(context, {
            email,
            password,
            full_arabic_name,
            national_number,
            mobile_number,
            governorate,
            region,
            store_name,
            siteLanguage
        }) {
            console.log(siteLanguage)
            axios.post(context.rootState.nodeHost + '/api/businessOwnerRegistration',
                {
                    email,
                    password,
                    full_arabic_name,
                    national_number,
                    mobile_number,
                    governorate,
                    region,
                    store_name,
                    siteLanguage
                }).then(res => {

                    alert(res.data.message)
                    context.commit('businessOwnerRegistration', res.data.mesasge)
                })
        },
        async activateUserAccount(context, token) {
            await axios.put(context.rootState.nodeHost + '/api/activateUserAccount', token)
                .then(res => {
                    alert(res.data)

                })
        }
      

    }
}