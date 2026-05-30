<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistration } from '../composables/useRegistration'

const route = useRoute()
const { getEventById } = useEvents()
const { getRegistrationsByEvent } = useRegistration()

const event = computed(() => getEventById(route.params.id))

const registeredUsers = computed(() => {
  return getRegistrationsByEvent(route.params.id)
})
</script>

<template>
  <section>
    <RouterLink class="back-link" to="/">
      ← Назад до списку
    </RouterLink>

    <div v-if="!event" class="empty-box">
      <h2>Подію не знайдено</h2>
      <p>Можливо, подія була видалена або посилання неправильне.</p>
    </div>

    <div v-else>
      <div class="detail-layout">
        <div class="event-image detail-image" :class="event.color">
          <h2>{{ event.title }}</h2>
          <p>{{ event.shortDescription }}</p>
        </div>

        <div class="detail-info">
          <span class="category">{{ event.category }}</span>
          <h1>{{ event.title }}</h1>

          <p class="meta">
            {{ event.date }} · {{ event.location }}
          </p>

          <p>{{ event.description }}</p>

          <RouterLink class="register-button" :to="`/events/${event.id}/register`">
            Зареєструватися
          </RouterLink>
        </div>
      </div>

      <section class="registered-section">
        <h2>Зареєстровані користувачі</h2>

        <p v-if="registeredUsers.length === 0" class="empty-text">
          На цю подію ще ніхто не зареєструвався.
        </p>

        <ul v-else class="users-list">
          <li
            v-for="user in registeredUsers"
            :key="user.id"
          >
            <div>
              <strong>{{ user.name }}</strong>
              <p>{{ user.email }}</p>
            </div>

            <span>{{ user.registeredAt }}</span>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>