<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div class="playlist-details" v-if="playlist">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <!-- //you must bind attr using : -->
        <img :src="playlist.coverUrl" >
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>

      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
      
    </div>
    <!-- song-list -->
    <div class="song-list">
        <p>song list here</p>
        <AddSong v-if="ownership" :playlist="playlist"/>
    </div>

  </div>

</template>


<script>
import { computed } from '@vue/runtime-core'
import getDocument from '../../composables/getDocument'
import AddSong from '../../components/AddSong.vue'
import getUser from '../../composables/getUser'
import useDocument from '../../composables/useDocument'
import useStorage from '../../composables/useStorage'
import { useRouter } from 'vue-router'
export default {
    props: ['id'],
    components: { AddSong },
    setup(props){
      //assigning a diff name to document using :
      const { document: playlist, error } = getDocument('playlists', props.id)
      const { user } = getUser()
      const { deleteDoc, isPending } = useDocument('playlists', props.id)
      const { deleteImage } = useStorage()
      const router = useRouter()

      const ownership = computed(() => {
        return playlist.value && user.value && user.value.uid == playlist.value.userId
      })

      const handleDelete = async() => {
        await deleteImage(playlist.value.filePath)
        await deleteDoc()
        router.push({name: 'home'})

      }

      return{ playlist, error, ownership, handleDelete }
    }
    
}
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  overflow: hidden;
  position: relative;
  padding: 160px;
  border-radius: 20px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.playlist-info p {
  margin-bottom: 20px;
}

.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>