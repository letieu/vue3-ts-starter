<template>
  <div class="register w-screen h-screen bg-gray-600">
    <el-card class="box-card">
      <h2 class="text-xl font-bold">Register</h2>
      <div class='text-sm text-left leading-3 text-red-500'>
        <p v-for='(error, key) in authStore.error' :key='error'> {{ key }} {{ error[0] }} </p>
      </div>
      
      <el-form :model="formData" :rules="rules" ref='form'>
        <el-form-item label="Name" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Password confirm" prop="confirm">
          <el-input v-model="formData.confirm" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :loading='loading' type="primary" @click="onSubmit">Register</el-button>
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
import { useRegisterRules } from '@/composables/formRule'


export default defineComponent({
  setup() {
    const form = ref() 
    const loading = ref(false)
    const router = useRouter()
    const authStore = useAuthStore()
    const formData = reactive({
      username: "",
      email: "" ,
      password: "",
      confirm: ""
    });

    const rules = useRegisterRules(formData)
    async function onSubmit() {
      loading.value = true
      const done = await authStore.register(formData)
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
      form,
      rules,
      loading,
      authStore
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
