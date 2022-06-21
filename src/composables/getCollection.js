import { projectFirestore } from "@/firebase/config"
import { ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"

const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection).orderBy('createdAt') 

    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        console.log('snapshot')
        snap.docs.forEach(doc => {
            //must wait for serve to create timestamp and send it back 
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value  = null
        
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'unable to fetch data'
    })

    watchEffect(onInvalidate => {
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection