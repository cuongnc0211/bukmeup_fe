<script setup>
  import { useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const errors = ref()

  const auth = useAuthStore()

  const handleSignin = async () => {
    errors.value = null

    const { data, error: signinError } = await useFetch('http://localhost:3000/users/tokens/sign_in',
      {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value
        }
      }
    )

    if (signinError.value) {
      error.value = signinError.value.data.error_description || 'Signup failed'
      return
    }

    const token = data.value.token
    const user = data.value.resource_owner

    auth.setToken(token)
    auth.setUser(user)

    router.push('/dashboard')
  }
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Sign In</h1>

    <form @submit.prevent="handleSignin" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" required />

      <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign In</button>

      <ul v-if="errors" class="text-red-500 mt-2">
        <li v-for="e in error">{{ e }}</li>
      </ul>
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>