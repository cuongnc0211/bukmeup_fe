<script setup>
  import { useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const errors = ref([])
  const isLoading = ref(false)

  // Form validation
  const isValidEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !email.value || emailRegex.test(email.value)
  })

  const isValidPassword = computed(() => {
    return !password.value || password.value.length >= 6
  })

  const isFormValid = computed(() => {
    return email.value && password.value && isValidEmail.value && isValidPassword.value
  })

  const auth = useAuthStore()

  const handleSignin = async () => {
    // Don't proceed if form is invalid
    if (!isFormValid.value) {
      return
    }
    
    errors.value = []
    isLoading.value = true

    try {
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
        errors.value = [signinError.value.data?.error_description || 'Sign in failed']
        isLoading.value = false
        return
      }

      const token = data.value.token
      const user = data.value.resource_owner

      // Store authentication data
      auth.setToken(token)
      auth.setUser(user)
      
      // Set auth header for future requests
      const nuxtApp = useNuxtApp()
      nuxtApp.$fetch.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (e) {
      errors.value = ['An unexpected error occurred. Please try again.']
      console.error('Sign in error:', e)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Sign In</h1>

    <form @submit.prevent="handleSignin" class="space-y-4">
      <div>
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          class="w-full p-2 border rounded" 
          :class="{'border-red-500': !isValidEmail && email}" 
          required 
        />
        <p v-if="!isValidEmail && email" class="text-red-500 text-sm mt-1">Please enter a valid email address</p>
      </div>
      
      <div>
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          class="w-full p-2 border rounded" 
          :class="{'border-red-500': !isValidPassword && password}" 
          required 
        />
        <p v-if="!isValidPassword && password" class="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
      </div>

      <button 
        type="submit" 
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex justify-center items-center"
        :disabled="isLoading || !isFormValid"
        :class="{'opacity-50 cursor-not-allowed': isLoading || !isFormValid}"
      >
        <span v-if="isLoading" class="mr-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        {{ isLoading ? 'Signing In...' : 'Sign In' }}
      </button>

      <ul v-if="errors.length > 0" class="text-red-500 mt-2 bg-red-50 p-2 rounded">
        <li v-for="(e, index) in errors" :key="index" class="mb-1">{{ e }}</li>
      </ul>
      
      <div class="text-center mt-4">
        <p>Don't have an account? <NuxtLink to="/sign_up" class="text-green-600 hover:underline">Sign Up</NuxtLink></p>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.max-w-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  margin-top: 2rem;
  padding: 2rem !important;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem !important;
}

input:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
}

button {
  transition: all 0.2s ease;
  font-weight: 600;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
}
</style>