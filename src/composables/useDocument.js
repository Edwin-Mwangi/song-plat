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
    const updateDoc = async(updates) =>{
        isPending.value = true
        error.value = null

        let docRef = projectFirestore.collection(collection).doc(id)
        try {
            const res = await docRef.update(updates)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message) 
            isPending.value = false
            error.value = "could not update doc"  
        }
    }

    return { isPending, deleteDoc, updateDoc}
}

export default useDocument