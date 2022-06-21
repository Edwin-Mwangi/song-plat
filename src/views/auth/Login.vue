<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
 
</template>

<script>
// @ means start at src folder
import { useRouter } from 'vue-router';
import useLogin from '@/composables/useLogin'
import { ref } from '@vue/reactivity';
export default {
    setup(){
        const { login, error, isPending } = useLogin();

        const email = ref(null)
        const password = ref(null)

        const handleSubmit = async() => {
            const res = await login(email.value, password.value)
            if(!error.value){
                console.log('login successful')
            }
        }

        return { email, password, handleSubmit, error, isPending}
    }
 


}
</script>

<style>

</style>