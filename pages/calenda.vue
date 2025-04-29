<!-- /components/WeeklyCalendar.vue -->
<template>
  <div class="h-screen bg-gray-100 p-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 sticky top-0 bg-gray-100 z-10 p-2 rounded">
      <div class="text-2xl font-bold">April 2025</div>
      <div class="flex items-center space-x-2">
        <button class="p-2 rounded-full hover:bg-gray-200">
          <span>&larr;</span>
        </button>
        <button class="px-4 py-2 rounded hover:bg-gray-200">Today</button>
        <button class="p-2 rounded-full hover:bg-gray-200">
          <span>&rarr;</span>
        </button>
        <button class="ml-4 bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500">
          Add Event
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-8 border-t border-l bg-white rounded">
      <!-- Top Header: Empty first cell + days -->
      <div class="border-b border-r h-12"></div>
      <!-- 7 day columns for each hour -->
      <template v-for="(day, dayIndex) in 7">
        <div
          class="border-b border-r h-20 cursor-pointer"
          :class="{
            'bg-blue-100': isCellSelected(dayIndex, hourIndex)
          }"
          @mousedown.prevent="startSelection(dayIndex, hourIndex)"
          @mouseover="continueSelection(dayIndex, hourIndex)"
          @mouseup="endSelection"
        ></div>
      </template>

      <!-- Body: 24 hours -->
      <template v-for="hour in hours">
        <!-- Hour label column -->
        <div class="border-b border-r h-20 flex items-start justify-end pr-2 text-xs pt-1">
          {{ hour }}
        </div>

        <!-- 7 day columns for each hour -->
        <template v-for="day in 7">
          <div class="border-b border-r h-20 hover:bg-gray-100 cursor-pointer"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { format, startOfWeek, addDays } from 'date-fns'

const today = new Date()

// Start from Monday
const weekStart = startOfWeek(today, { weekStartsOn: 1 })

const days = ref(
  Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i)
    return {
      label: format(day, 'EEE, dd MMM'), // Example: "Mon, 28 Apr"
      date: day
    }
  })
)

const hours = Array.from({ length: 24 }, (_, i) =>
  `${i.toString().padStart(2, "0")}:00`
)

const selectedCells = ref([]) // store selected cells (dragging)
const isDragging = ref(false)

function startSelection(dayIndex, hourIndex) {
  isDragging.value = true
  selectedCells.value = [{ dayIndex, hourIndex }]
}

function continueSelection(dayIndex, hourIndex) {
  if (isDragging.value) {
    selectedCells.value.push({ dayIndex, hourIndex })
  }
}

function endSelection() {
  isDragging.value = false
  // Here you can open a modal, or console.log the selected range
  console.log('Selected Cells:', selectedCells.value)
}

function isCellSelected(dayIndex, hourIndex) {
  return selectedCells.value.some(cell => 
    cell.dayIndex === dayIndex && cell.hourIndex === hourIndex
  )
}

onMounted(() => {
  window.addEventListener('mouseup', endSelection)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', endSelection)
})
</script>

