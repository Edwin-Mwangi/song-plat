<template>
  <form @submit.prevent="handleSubmit">
      <h4>Create Playlist</h4>
      <input type="text" required placeholder="Playlist Title" v-model="title">
      <textarea required placeholder="Playlist description..." v-model="description"></textarea>

      <!-- upload playlist img -->
      <label>Upload playlist cover img</label>
      <input type="file" @change="handleChange">

      <div class="error">{{fileError}}</div>
      <button>Create</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../../composables/useStorage'
export default {
    setup(){
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const { filePath, url, uploadImage } = useStorage()

        const handleSubmit = async() => {
            if(file.value){
                console.log(file.value)
                await uploadImage(file.value)
                console.log('Image Uploaded Url: ',url.value)
                
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
        return { title, description, handleSubmit, handleChange, fileError}
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