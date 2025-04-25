<script setup>
  const route = useRoute();

  const error = ref(null)

  const email = ref('')
  const first_name = ref('')
  const last_name = ref('')
  const phone_number = ref('')
  const password = ref('')
  const passwordConfirmation = ref('')

  const handleSignup = async () => {
    error.value = null

    const { data, error: signupError } = await useFetch('http://localhost:3000/users/tokens/sign_up', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value,
        first_name: first_name.value,
        last_name: last_name.value,
        phone_number: phone_number.value,
      }
    })

    debugger
    if (signupError.value) {
      error.value = signupError.value.data.error_description || 'Signup failed'
      return
    }

    const token = data.value.token
    localStorage.setItem('auth_token', token)
  }
</script>

<template>
  <div>
    <div class="max-w-md mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Sign Up</h1>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
        <input v-model="first_name" type="first_name" placeholder="First Name" class="w-full p-2 border rounded" required />
        <input v-model="last_name" type="last_name" placeholder="Last Name" class="w-full p-2 border rounded" required />
        <input v-model="phone_number" type="phone_number" placeholder="Phone Number" class="w-full p-2 border rounded" required />
        
        <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" required />
        <input v-model="passwordConfirmation" type="password" placeholder="Confirm Password" class="w-full p-2 border rounded" required />

        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign Up</button>

        <ul v-if="error" class="text-red-500 mt-2">
          <li v-for="e in error">{{ e }}</li>
        </ul>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>