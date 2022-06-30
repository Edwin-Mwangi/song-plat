<template>
  <div class="add-song">
      <button v-if="!showForm" @click="showForm = true">Add Songs</button>
      <form v-if="showForm" @submit.prevent="handleSubmit">
          <input type="text" placeholder="song title" v-model="title">
          <input type="text" placeholder="artist" v-model="artist">
          <button>Add Song</button>
      </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)

        const handleSubmit = () => {
            const newSong = {
                title: title,
                artist: artist,
                id: Math.floor(Math.random() * 1000000)
            }
            console.log(newSong)
        }

        return {title, artist, showForm, handleSubmit}
    }
}
</script>

<style>
.add-song {
    margin-top: 40px;
    text-align: center;
}

form {
    max-width: 100%;
    text-align: left;
}

</style>