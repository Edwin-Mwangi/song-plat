<template>
 <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <input type="text" placeholder="display name" v-model="displayName">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Sign Up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
  
</template>

<script>
import { ref } from '@vue/reactivity';
import useSignup from '@/composables/useSignup';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const { signup, error, isPending } = useSignup();
        const router = useRouter()

        const email = ref(null)
        const password = ref(null)
        const displayName  = ref(null)

        const handleSubmit = async() => {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                console.log('sign up successful')
                router.push({ name: 'home' })
            }
        }

        return { email, password, displayName, handleSubmit, error, isPending}
    }

}
</script>

<style>

</style>