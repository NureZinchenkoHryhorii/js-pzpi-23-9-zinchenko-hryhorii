<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  event: {
    type: Object,
    required: true
  },
  registrationsCount: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <article class="event-card">
    <div class="event-image" :class="event.color">
      <h3>{{ event.title }}</h3>
      <p>{{ event.shortDescription }}</p>
    </div>

    <div class="event-content">
      <span class="category">{{ event.category }}</span>

      <h2>{{ event.title }}</h2>

      <p class="meta">
        {{ event.date }} · {{ event.location }}
      </p>

      <p class="description">
        {{ event.shortDescription }}
      </p>

      <p class="registered-count">
        Зареєстровано: {{ registrationsCount }}
      </p>

      <div class="card-actions">
        <RouterLink :to="`/events/${event.id}`">
          Деталі
        </RouterLink>

        <RouterLink class="primary-link" :to="`/events/${event.id}/register`">
          Реєстрація
        </RouterLink>
      </div>
    </div>
  </article>
</template>