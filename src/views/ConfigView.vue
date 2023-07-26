<template>
    <div class="about">
        <input v-model="deviceId" placeholder="deviceId" />
        <button @click="clickSetDeviceId">set</button>
    </div>
</template>
  

<script lang="ts">
import { readDeviceId, storeDeviceId } from '@/LocalStorage';
import { Server } from '@/Server';

export default{
    name: "App",
    data: () => ({
        deviceId: ""
    }),
    methods: {
        clickSetDeviceId() {
            storeDeviceId(this.deviceId);
            this.$router.push("/control");
        }
    },
    mounted() {
        if(Server.getInstance().getMode() === "standalone"){
            this.deviceId = Server.getInstance().getDeviceId();
            this.$router.push("/control");
        }else{            
            this.deviceId = readDeviceId();
        }
    },
}


</script>
<style scoped></style>
  