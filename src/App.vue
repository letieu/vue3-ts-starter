<template>
  <div id="app">
    <header> {{ authStore.user?.username }} </header>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/auth'

export default defineComponent({
  name: "App",
  setup() {
    const authStore = useAuthStore()
    return {
      authStore
    }
  }
});
</script>
