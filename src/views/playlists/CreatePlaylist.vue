<template>
  <form @submit.prevent="handleSubmit">
      <h4>Create Playlist</h4>
      <input type="text" required placeholder="Playlist Title" v-model="title">
      <textarea required placeholder="Playlist description..." v-model="description"></textarea>

      <!-- upload playlist img -->
      <label>Upload playlist cover img</label>
      <input type="file" @change="handleChange">

      <div class="error">{{fileError}}</div>
      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../../composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    
    setup(){
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)
        const router = useRouter()

        const { filePath, url, uploadImage } = useStorage()
        const { addDoc, error } = useCollection('playlists')
        const { user } = getUser()

        const handleSubmit = async() => {
            if(file.value){
                //local ispending used
                isPending.value = true
                await uploadImage(file.value)
                await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })
                console.log('Image Uploaded Url: ',url.value)
                isPending.value = false
                if(!error.value){
                    //add params property coz last bit of url is variable
                    router.push({ name: 'PlaylistDetails', params: {} })
                }  
            }
        }

        //allowed file types
        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected)

            //only give val if file is selected
            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null
            }else{
                file.value = null
                fileError.value = 'Please select an img file(png or jpeg)'
            }           
        }
        return { title, description, handleSubmit, handleChange, fileError, isPending }
    }
}
</script>

<style>
input[type="file"] {
    border: 0;
    outline: 0;
}
label{
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button{
    margin-top: 20px;
}
</style>