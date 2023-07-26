<template>

  </template>
  <script lang="ts">
import { storeDeviceId } from '@/LocalStorage';

    export default {
  name: "App",

  mounted() {
    // get deviceId from #/set/:deviceId
    let deviceId = this.$route.params.deviceId as string;
    storeDeviceId(deviceId);
    this.$router.push({ path: "/control" });
  },
};
</script>
  <style>

  </style>
  