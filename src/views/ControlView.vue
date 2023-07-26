<script setup lang="ts">
import { Server } from "@/Server";
import SimpleKeyboard from "../components/MyKeyboard.vue";
import { HidGadget } from "@/gadget/HidGadget";
</script>

<template>
  <div class="about">
    <SimpleKeyboard @onKeyPress="onKeyPress" />
  </div>
</template>
<script lang="ts">
export default {
  name: "App",
  components: {
    SimpleKeyboard
  },
  data: () => ({
    hidGadget: null as HidGadget | null,
    deviceId: "",
  }),
  mounted() {
    let server = Server.getInstance();
    if (server.getMode() !== "standalone" && server.getDeviceId() === "") {
      this.$router.push({ path: "/config" });
    }
    this.$data.hidGadget = server.getGadget(HidGadget)
    
  },
  methods: {
    onKeyPress(button: any) {
      console.log("Button pressed", button);
      if (this.hidGadget) {
        this.hidGadget.sendKey(button);
      }
    },
  }
};
</script>
<style scoped></style>
  