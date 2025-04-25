import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth',
  () => {
    const token = ref<string | null>(null)
    const user = ref<any>(null)

    const isAuthenticated = computed(() => !!token.value)

    const setToken = (newToken: string) => {
      token.value = newToken
    }

    const setUser = (newUser: any) => {
      user.value = newUser;
    }

    const logout = () => {
      token.value = null;
      user.value = null;
    }

    return {
      token,
      user,
      isAuthenticated,
      setToken,
      setUser,
      logout,
    }
  },
  {
    persist: true,
  },
);
