<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
    });
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      window.history.forward();
    });
  },
});
</script>

<style lang="less" src="./App.less"></style>
