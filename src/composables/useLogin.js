import { ref } from '@vue/reactivity'
import { projectAuth } from "@/firebase/config"

const error = ref(null)
//adding a pending state (moment before he is signed in)
//false when signed in or bfore clicking signin btn
const isPending = ref(false)

const login = async(email, password) => {
    error.value = null
    isPending.value = true

    try{
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false//when response is there
        return res

    }catch{
        console.log(error.value)
        error.value = 'incomplete signup'
        isPending.value = false //when err is returned
    }

}
const useLogin = () => {
    return{ error, login, isPending }
}

export default useLogin