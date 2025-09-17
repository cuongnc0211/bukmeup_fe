<template>
  <div class="dashboard-container">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="logo">
        <h1>Bukmeup</h1>
      </div>
      <div class="user-menu">
        <div class="dropdown" @click="toggleDropdown" ref="dropdownRef">
          <div class="user-email">{{ userEmail }}</div>
          <div class="dropdown-content" v-show="isDropdownOpen">
            <div class="dropdown-item" @click="goToProfile">Profile</div>
            <div class="dropdown-item" @click="handleLogout">Logout</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <h2>Dashboard</h2>
      <!-- Your dashboard content here -->
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()
  
  const isDropdownOpen = ref(false)
  const dropdownRef = ref(null)
  
  // Get user email from auth store
  const userEmail = computed(() => {
    return auth.user?.email || 'User'
  })
  
  // Toggle dropdown menu
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isDropdownOpen.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  
  // Navigate to profile page
  const goToProfile = () => {
    // Replace with actual profile route
    router.push('/profile')
    isDropdownOpen.value = false
  }
  
  // Handle logout
  const handleLogout = () => {
    auth.logout()
    router.push('/sign_in')
  }
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 64px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4ade80;
  margin: 0;
}

.user-menu {
  position: relative;
}

.dropdown {
  cursor: pointer;
  position: relative;
}

.user-email {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  
  &:hover {
    background-color: #f9fafb;
  }
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  width: 180px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.5rem;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.content {
  padding: 1.5rem;
  flex: 1;
}
</style>