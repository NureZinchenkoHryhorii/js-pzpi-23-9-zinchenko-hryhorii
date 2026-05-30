<script setup>
import { reactive, computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistration } from '../composables/useRegistration'

const route = useRoute()
const router = useRouter()

const { getEventById } = useEvents()
const { registerUser, isLoading, error } = useRegistration()

const event = computed(() => getEventById(route.params.id))

const form = reactive({
  name: '',
  email: ''
})

const errors = reactive({
  name: '',
  email: ''
})

const successMessage = ref('')

function validateForm() {
  errors.name = ''
  errors.email = ''

  if (form.name.trim() === '') {
    errors.name = 'Ім’я є обов’язковим'
  }

  if (form.email.trim() === '') {
    errors.email = 'Email є обов’язковим'
  } else if (!form.email.includes('@')) {
    errors.email = 'Введіть коректний email'
  }

  return !errors.name && !errors.email
}

async function submitForm() {
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  const result = await registerUser(route.params.id, {
    name: form.name,
    email: form.email
  })

  if (result) {
    successMessage.value = 'Реєстрацію успішно виконано'

    setTimeout(() => {
      router.push(`/events/${route.params.id}`)
    }, 800)
  }
}
</script>

<template>
  <section>
    <RouterLink class="back-link" :to="event ? `/events/${event.id}` : '/'">
      ← Назад
    </RouterLink>

    <div v-if="!event" class="empty-box">
      <h2>Подію не знайдено</h2>
    </div>

    <div v-else class="register-layout">
      <div>
        <h1>{{ event.title }}</h1>
        <p class="meta">{{ event.date }} · {{ event.location }}</p>
        <p>{{ event.shortDescription }}</p>
      </div>

      <form class="register-form" @submit.prevent="submitForm">
        <h2>Реєстрація</h2>
        <p>Заповніть форму для реєстрації на подію.</p>

        <label>
          Ім’я
          <input
            v-model="form.name"
            type="text"
            placeholder="Ваше ім’я"
          />
          <span v-if="errors.name" class="error-text">
            {{ errors.name }}
          </span>
        </label>

        <label>
          Email
          <input
            v-model="form.email"
            type="email"
            placeholder="example@mail.com"
          />
          <span v-if="errors.email" class="error-text">
            {{ errors.email }}
          </span>
        </label>

        <button class="register-button" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Реєстрація...' : 'Зареєструватися' }}
        </button>

        <p v-if="successMessage" class="success-text">
          {{ successMessage }}
        </p>

        <p v-if="error" class="error-text">
          {{ error }}
        </p>
      </form>
    </div>

    <Teleport to="body">
      <div v-if="successMessage" class="toast">
        {{ successMessage }}
      </div>
    </Teleport>
  </section>
</template>