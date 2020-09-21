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
            await axios.post("http://localhost:3000/api/login",
                { email, password, })
                .then((response) => {
                    if (response.data.message === 'please sign up first' || response.data.message === 'Please activate your account' || response.data.message === 'authentication failed') {
                        return alert(response.data.message);
                    }
                    context.commit('login', response.data.token);
                    router.push('/')

                })
                .catch((error) => {
                    console.log(error);
                });
        },

        register(context, {
            email,
            password,
            full_arabic_name,
            mobile_number,
            national_number,
            governorate,
            region
        }) {
            axios.post('http://localhost:3000/api/signup', {
                email,
                password,
                full_arabic_name,
                mobile_number,
                national_number,
                governorate,
                region
            })
                .then(response => {
                    if (response.data.message) {
                        alert(response.data.message)
                    } else {
                        console.log("Error in database")
                    }
                })
                .catch(error => {
                    console.log(error)
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
            store_name
        }) {
            axios.post('http://localhost:3000/api/businessOwnerRegistration',
                {
                    email,
                    password,
                    full_arabic_name,
                    national_number,
                    mobile_number,
                    governorate,
                    region,
                    store_name
                }).then(res => {
                    console.log(res.data.message)
                    alert(res.data.message)
                    context.commit('businessOwnerRegistration', res.data.mesasge)
                })
        },
        activateUserAccount() {
            axios.put('http://localhost:3000/api/activateUserAccount')
                .then(res => {
                    alert(res.data)

                })
        }

    }
}