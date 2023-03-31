<template>
  <div class="navbar">
      <nav>
        <img src="@/assets/jockey.png" alt="">
        <h3>
         <router-link :to="{name: 'home'}">Song Plat</router-link>
        </h3>
        <div class="links">
            <div v-if="user">
                <router-link :to="{name: 'createPlaylist'}">Create Playlist</router-link>
                <router-link :to="{name: 'UserPlaylists'}">My Playlist</router-link>
                <span>Hi there, {{ user.displayName }}</span>
                <button @click="handleLogout">Logout</button>
            </div>
            <div v-else>
                 <router-link :to="{name: 'login'}" class="btn" >Login</router-link>
                <router-link :to="{name: 'signup'}" class="btn" >Sign Up</router-link>
            </div>
        
        </div>
      </nav>
    
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '@/composables/getUser'
export default {
    setup() {
        const router = useRouter()

        const { error, logout, isPending } = useLogout()
        const { user } = getUser()

        const handleLogout = () => {
            logout()
            if(!error.value){
                console.log('logout successful')
                router.push({name: 'login'})
            }else{
                console.log('error')
            }
        }

        return{ logout, error, isPending, handleLogout, user }
    }

}
</script>

<style scoped>
 .navbar {
     padding: 16px 10px;
     margin-bottom: 60px;
     background: white;
 }
 nav {
     display: flex;
     align-items: center;
     max-width: 1200px;
     margin: 0 auto;
 }
 nav h1 {
     margin-left: 20px;
 }

 nav .links {
     /* this pushes the flexitem to the far right */
     margin-left: auto;
 }

 nav .links a, button {
     margin-left: 16px;
     font-size: 14px;
 }
 nav img {
     max-height: 60px;
 }
 span {
     font-size: 14px;
     display: inline-block;
     margin-left: 16px;
     padding-left: 16px;
     border-left: 1px solid #eee;
 }


</style>
