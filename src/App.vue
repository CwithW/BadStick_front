<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Server } from './Server';
</script>

<template>
  <header>
      <nav>
        <RouterLink class="nav-button" to="/control">Control</RouterLink>
        <RouterLink class="nav-button" to="/script">Script</RouterLink>
        <RouterLink class="nav-button" to="/device">Device</RouterLink>
        <RouterLink class="nav-button" to="/config">Config</RouterLink>
      </nav>
      <div>
        {{ lastSeen }}
      </div>
  </header>
  <RouterView />
</template>

<script lang="ts">
export default {
  computed: {
    lastSeen() {
      if(Server.getInstance().getMode() === "standalone"){
        return "@"+Server.getInstance().getDeviceId();
      }else{
        // todo
        return "Last Seen: N/A"
      }
    }
  },
}
</script>

<style scoped>
header {
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.nav-button{
  padding: 10px;
}

</style>
