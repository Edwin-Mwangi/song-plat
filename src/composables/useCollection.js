import { projectFirestore } from "@/firebase/config"
import { ref } from '@vue/reactivity'

const useCollection = (collection) => {
    const error = ref(null) 
    const isPending = ref(false)

    //adding a document
    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true
        try {
            await projectFirestore.collection(collection).add(doc)
            isPending.value = false
        } catch (error) {
            console.log(error.message)
            error.value = 'Could not send message'
            isPending.value = false
        }
    }
    return { addDoc, error }
}

export default useCollection