<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const task = computed(() => {
  return taskStore.getTaskById(route.params.id)
})

function deleteTask() {
  taskStore.deleteTask(route.params.id)
  router.push('/')
}
</script>

<template>
  <section>
    <RouterLink class="back-link" to="/">
      ← Назад до списку
    </RouterLink>

    <div v-if="!task" class="empty">
      <h2>Задачу не знайдено</h2>
      <p>Можливо, вона була видалена.</p>
    </div>

    <div v-else>
      <div class="page-title">
        <div>
          <h2>{{ task.title }}</h2>
          <p>{{ task.category }} · {{ task.priority }} · до {{ task.deadline }}</p>
        </div>
      </div>

      <div class="details-grid">
        <div class="detail-box">
          <span>Статус</span>
          <strong>{{ task.completed ? 'Виконана' : 'Активна' }}</strong>
        </div>

        <div class="detail-box">
          <span>Категорія</span>
          <strong>{{ task.category }}</strong>
        </div>

        <div class="detail-box">
          <span>Пріоритет</span>
          <strong>{{ task.priority }}</strong>
        </div>

        <div class="detail-box">
          <span>Дедлайн</span>
          <strong>{{ task.deadline }}</strong>
        </div>

        <div class="detail-box">
          <span>Дата створення</span>
          <strong>{{ task.createdAt }}</strong>
        </div>
      </div>

      <div class="description-box">
        <h3>Опис</h3>
        <p>{{ task.description || 'Опис відсутній.' }}</p>
      </div>

      <div class="actions-row">
        <RouterLink class="primary-button" :to="`/tasks/${task.id}/edit`">
          Редагувати
        </RouterLink>

        <button class="danger-button" @click="deleteTask">
          Видалити
        </button>
      </div>
    </div>
  </section>
</template>