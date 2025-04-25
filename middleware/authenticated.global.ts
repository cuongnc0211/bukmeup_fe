import { useAuthStore } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // if user AUthenticated, redirect back to dashboard
  if(auth.isAuthenticated && ['/sign_up', '/sign_in'].includes(to.path)) {
    return navigateTo('/dashboard')
  }
});
