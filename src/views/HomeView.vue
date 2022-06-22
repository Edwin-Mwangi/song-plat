<template>
  <div class="home">
    <p>Homepage</p>
    <div v-if="error" class="error">Could not fetch data {{ error }}</div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id">{{doc.title}}</div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'

export default {
  name: 'HomeView',
  setup() {
    const { documents, error } = getCollection('playlists')

  return { documents, error }
  }
}
</script>
