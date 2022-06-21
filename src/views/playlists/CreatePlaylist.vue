<template>
  <form @submit.prevent="handleSubmit">
      <h4>Create Playlist</h4>
      <input type="text" required placeholder="Playlist Title" v-model="title">
      <textarea required placeholder="Playlist description..." v-model="description"></textarea>

      <!-- upload playlist img -->
      <label>Upload playlist cover img</label>
      <input type="file">

      <div class="error"></div>
      <button>Create</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(){
        const title = ref('')
        const description = ref('')

        const handleSubmit = () =>{
            console.log(title.value, description.value)
        }
        return { title, description, handleSubmit}
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