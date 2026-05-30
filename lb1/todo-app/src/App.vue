<script setup>
import { ref, computed } from 'vue'

const tasks = ref([])

const newTask = ref('')

const filter = ref('all')

function addTask() {
  if (newTask.value.trim() === '') {
    return
  }

  tasks.value.push({
    id: Date.now(),
    text: newTask.value,
    completed: false
  })

  newTask.value = ''
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return tasks.value.filter(task => !task.completed)
  }

  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed)
  }

  return tasks.value
})
</script>

<template>
  <div class="container">
    <h1>To-Do List</h1>

    <div class="input-group">
      <input
        v-model="newTask"
        type="text"
        placeholder="Введіть задачу"
      />

      <button @click="addTask">
        Додати
      </button>
    </div>

    <div class="filters">
      <button @click="filter = 'all'">
        Усі
      </button>

      <button @click="filter = 'active'">
        Активні
      </button>

      <button @click="filter = 'completed'">
        Виконані
      </button>
    </div>

    <ul>
      <li
        v-for="task in filteredTasks"
        :key="task.id"
      >
        <div class="task-content">
          <input
            type="checkbox"
            v-model="task.completed"
          />

          <span :class="{ completed: task.completed }">
            {{ task.text }}
          </span>
        </div>

        <button
          class="delete-btn"
          @click="deleteTask(task.id)"
        >
          Видалити
        </button>
      </li>
    </ul>
  </div>
</template>