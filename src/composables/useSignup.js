import { ref } from '@vue/reactivity'
import { projectAuth } from "@/firebase/config"

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
    error.value = null
    isPending.value = true
    try{
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        isPending.value = false
        if(!res){
            throw new Error('Could not complete Signup')
        }
        await res.user.updateProfile({ displayName })
        error.value = null
        return res
        // console.log(res.user)
    }catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}
//useSignup is not async...will have err if umake it async..the err (signup not a method)
const useSignup = () => {
    return{ error, signup }
}

export default useSignup