<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const isEditMode = computed(() => Boolean(route.params.id))
const currentTask = computed(() => taskStore.getTaskById(route.params.id))

const form = reactive({
  title: currentTask.value?.title || '',
  description: currentTask.value?.description || '',
  category: currentTask.value?.category || 'Робота',
  priority: currentTask.value?.priority || 'Середній',
  deadline: currentTask.value?.deadline || '',
  completed: currentTask.value?.completed || false
})

const errors = reactive({
  title: '',
  deadline: ''
})

function validateForm() {
  errors.title = ''
  errors.deadline = ''

  if (form.title.trim() === '') {
    errors.title = 'Назва задачі є обов’язковою'
  }

  if (form.deadline === '') {
    errors.deadline = 'Дедлайн є обов’язковим'
  }

  const today = new Date().toISOString().split('T')[0]

  if (!isEditMode.value && form.deadline && form.deadline < today) {
    errors.deadline = 'Дедлайн не може бути у минулому'
  }

  return !errors.title && !errors.deadline
}

function saveTask() {
  if (!validateForm()) {
    return
  }

  const taskData = {
    title: form.title,
    description: form.description,
    category: form.category,
    priority: form.priority,
    deadline: form.deadline,
    completed: form.completed
  }

  if (isEditMode.value) {
    taskStore.updateTask(route.params.id, taskData)
    router.push(`/tasks/${route.params.id}`)
  } else {
    taskStore.addTask(taskData)
    router.push('/')
  }
}
</script>

<template>
  <section>
    <RouterLink class="back-link" to="/">
      ← Назад до списку
    </RouterLink>

    <div v-if="isEditMode && !currentTask" class="empty">
      <h2>Задачу не знайдено</h2>
    </div>

    <form v-else class="task-form" @submit.prevent="saveTask">
      <h2>
        {{ isEditMode ? 'Редагування задачі' : 'Створення задачі' }}
      </h2>

      <label>
        Назва задачі
        <input
          v-model="form.title"
          type="text"
          placeholder="Введіть назву задачі"
        />
        <span v-if="errors.title" class="error-text">{{ errors.title }}</span>
      </label>

      <label>
        Опис
        <textarea
          v-model="form.description"
          placeholder="Введіть опис задачі"
        ></textarea>
      </label>

      <div class="form-row">
        <label>
          Категорія
          <select v-model="form.category">
            <option value="Робота">Робота</option>
            <option value="Навчання">Навчання</option>
            <option value="Особисте">Особисте</option>
          </select>
        </label>

        <label>
          Пріоритет
          <select v-model="form.priority">
            <option value="Високий">Високий</option>
            <option value="Середній">Середній</option>
            <option value="Низький">Низький</option>
          </select>
        </label>
      </div>

      <div class="form-row">
        <label>
          Дедлайн
          <input v-model="form.deadline" type="date" />
          <span v-if="errors.deadline" class="error-text">
            {{ errors.deadline }}
          </span>
        </label>

        <label v-if="isEditMode">
          Статус
          <select v-model="form.completed">
            <option :value="false">Активна</option>
            <option :value="true">Виконана</option>
          </select>
        </label>
      </div>

      <div class="actions-row">
        <button class="primary-button" type="submit">
          {{ isEditMode ? 'Зберегти зміни' : 'Створити задачу' }}
        </button>

        <RouterLink class="secondary-button" to="/">
          Скасувати
        </RouterLink>
      </div>
    </form>
  </section>
</template>