<script setup>
import EventCard from '../components/EventCard.vue'
import { useEvents } from '../composables/useEvents'
import { useRegistration } from '../composables/useRegistration'

defineOptions({
  name: 'EventListView'
})

const { getEvents } = useEvents()
const { getRegistrationsByEvent } = useRegistration()

const events = getEvents()
</script>

<template>
  <section>
    <div class="page-title">
      <h1>Список подій</h1>
      <p>Оберіть подію, перегляньте деталі та зареєструйтесь.</p>
    </div>

    <div class="events-grid">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        :registrations-count="getRegistrationsByEvent(event.id).length"
      />
    </div>
  </section>
</template>