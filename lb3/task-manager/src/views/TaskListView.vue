<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedPriority = ref('all')
const sortMode = ref('deadline')

const filteredTasks = computed(() => {
  let result = [...taskStore.tasks]

  if (searchQuery.value.trim() !== '') {
    result = result.filter(task =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value !== 'all') {
    result = result.filter(task => task.category === selectedCategory.value)
  }

  if (selectedPriority.value !== 'all') {
    result = result.filter(task => task.priority === selectedPriority.value)
  }

  if (sortMode.value === 'deadline') {
    result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  }

  if (sortMode.value === 'priority') {
    const priorityOrder = {
      'Високий': 1,
      'Середній': 2,
      'Низький': 3
    }

    result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }

  return result
})

function isOverdue(task) {
  const today = new Date().toISOString().split('T')[0]
  return task.deadline < today && !task.completed
}
</script>

<template>
  <section>
    <div class="page-title">
      <div>
        <h2>Список задач</h2>
        <p>Керуйте задачами, пріоритетами та дедлайнами.</p>
      </div>

      <RouterLink class="primary-button" to="/tasks/new">
        + Додати задачу
      </RouterLink>
    </div>

    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Пошук за назвою"
      />

      <select v-model="selectedCategory">
        <option value="all">Усі категорії</option>
        <option value="Робота">Робота</option>
        <option value="Навчання">Навчання</option>
        <option value="Особисте">Особисте</option>
      </select>

      <select v-model="selectedPriority">
        <option value="all">Усі пріоритети</option>
        <option value="Високий">Високий</option>
        <option value="Середній">Середній</option>
        <option value="Низький">Низький</option>
      </select>

      <select v-model="sortMode">
        <option value="deadline">Сортування: дедлайн</option>
        <option value="priority">Сортування: пріоритет</option>
      </select>
    </div>

    <p v-if="filteredTasks.length === 0" class="empty">
      Задачі не знайдено.
    </p>

    <div v-else class="task-list">
      <article
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-card"
        :class="{ completed: task.completed, overdue: isOverdue(task) }"
      >
        <button
          class="status-button"
          @click="taskStore.toggleTaskStatus(task.id)"
        >
          {{ task.completed ? '✓' : '' }}
        </button>

        <div class="task-info">
          <h3>{{ task.title }}</h3>

          <div class="badges">
            <span>{{ task.category }}</span>
            <span>{{ task.priority }}</span>
            <span>до {{ task.deadline }}</span>
          </div>

          <p v-if="isOverdue(task)" class="overdue-text">
            Прострочено
          </p>
        </div>

        <div class="task-actions">
          <RouterLink :to="`/tasks/${task.id}`">
            Перегляд
          </RouterLink>

          <RouterLink :to="`/tasks/${task.id}/edit`">
            Редагувати
          </RouterLink>

          <button @click="taskStore.deleteTask(task.id)">
            Видалити
          </button>
        </div>
      </article>
    </div>
  </section>
</template>