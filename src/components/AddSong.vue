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
import useDocument from '../composables/useDocument'
export default {
    props: ['playlist'],
    setup(props) {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const { updateDoc } = useDocument('playlists', props.playlist.id)

        const handleSubmit = async() => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 1000000)
            }

            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })

            title.value = ''
            artist.value = ''
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