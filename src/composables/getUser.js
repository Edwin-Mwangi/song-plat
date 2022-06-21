import { projectAuth } from "@/firebase/config";
import { ref } from '@vue/reactivity'

const user = ref(projectAuth.currentUser)

projectAuth.onAuthStateChanged(_user => {
    console.log('User state change \n Current User: ',_user )
    user.value = _user

})

const getUser = () => {
    return { user }
}

export default getUser; 