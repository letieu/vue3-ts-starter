<template>
  <div class="register w-screen h-screen bg-gray-600">
    <el-card class="box-card">
      <h2 class="text-xl font-bold">Login</h2>
      <div class='text-sm text-left leading-3 text-red-500'>
        <p v-for='error in authStore.getError' :key='error'> {{ error[0] }} </p>
      </div>
      
      <el-form :model="formData" :rules="rules" ref='form'>
        <el-form-item label="Email" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :loading='loading' type="primary" @click="onSubmit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, ref, unref, onMounted } from "vue";
import axios from '@/plugins/axios'
import { useAuthStore } from "@/store/auth"
import { useRouter } from 'vue-router'
import { useLoginRules } from '@/composables/formRule'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const router = useRouter()
    const authStore = useAuthStore()
    const formData = reactive({
      email: "" ,
      password: ""
    });
    const rules = useLoginRules(formData)

    async function onSubmit() {
      loading.value = true
      const done = await authStore.login(formData)
      loading.value = false

      if (done) {
        window.setTimeout(() => {
          router.push('/')
        }, 500)
      }
    }

    return {
      formData,
      onSubmit,
      loading,
      authStore,
      rules   
    };
  }
})
</script>

<style>
.register .el-card {
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
