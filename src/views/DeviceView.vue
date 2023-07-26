<template>
  <div class="about">
    <input v-model="exec" placeholder="system()" />
    <button @click="clickExec">exec</button>
    <br/>
    <button @click="clickReboot">reboot</button>
    <button @click="clickDeactivateAp">Deactivate AP</button>
    <button @click="clickActivateAp">Activate AP</button>
  </div>
</template>
<script lang="ts">
import { Server } from '@/Server';
import { DeviceGadget } from '@/gadget/DeviceGadget';

export default {
  name: "App",
  data: () => ({
    deviceGadget: null as DeviceGadget | null,
    exec: ""
  }),
  methods: {
    clickExec() {
      console.log("clickExec", this.exec);
      this.$data.deviceGadget?.sendExec(this.exec);
    },
    clickReboot() {
      console.log("clickReboot");
      this.$data.deviceGadget?.sendExec("reboot");
    },
    clickDeactivateAp() {
      console.log("clickDeactivateAp");
      this.$data.deviceGadget?.sendExec("nmcli connection down openducky-ap");
    },
    clickActivateAp() {
      console.log("clickActivateAp");
      this.$data.deviceGadget?.sendExec("nmcli connection up openducky-ap");
    }
  },
  mounted() {
    let server = Server.getInstance();
    if (server.getMode() !== "standalone" && server.getDeviceId() === "") {
      this.$router.push({ path: "/config" });
    }
    this.$data.deviceGadget = server.getGadget(DeviceGadget)
  }
};
</script>

<style></style>
