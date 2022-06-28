import { projectFirestore } from '@/firebase/config'
import { ref } from '@vue/reactivity'

const useDocument = (collection, id) =>{
    const error = ref(null)
    const isPending = ref(false)

    const deleteDoc = async() =>{
        isPending.value = true
        error.value = null

        let docRef = projectFirestore.collection(collection).doc(id)
        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message) 
            isPending.value = false
            error.value = "could not delete doc"  
        }
    }


    return { isPending, deleteDoc}
}

export default useDocument