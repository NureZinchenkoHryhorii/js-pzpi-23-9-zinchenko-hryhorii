<script setup>
import { ref, computed, onMounted } from 'vue'
import ImageCard from './components/ImageCard.vue'

const images = ref([])
const favorites = ref([])
const isLoading = ref(false)
const error = ref('')
const searchQuery = ref('')
const currentMode = ref('all')

const API_URL = 'https://picsum.photos/v2/list?page=1&limit=20'

async function loadImages() {
  isLoading.value = true
  error.value = ''

  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('Помилка завантаження')
    }

    images.value = await response.json()
  } catch (err) {
    error.value = 'Не вдалося завантажити зображення. Спробуйте ще раз.'
  } finally {
    isLoading.value = false
  }
}

function toggleFavorite(imageId) {
  if (favorites.value.includes(imageId)) {
    favorites.value = favorites.value.filter(id => id !== imageId)
  } else {
    favorites.value.push(imageId)
  }
}

function isFavorite(imageId) {
  return favorites.value.includes(imageId)
}

const filteredImages = computed(() => {
  let result = images.value

  if (currentMode.value === 'favorites') {
    result = result.filter(image =>
      favorites.value.includes(image.id)
    )
  }

  if (searchQuery.value.trim() !== '') {
    result = result.filter(image =>
      image.author
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

onMounted(() => {
  loadImages()
})
</script>

<template>
  <main class="app">
    <section class="gallery-container">
      <h1>Галерея зображень</h1>

      <div class="controls">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Пошук за автором"
          class="search-input"
        />

        <div class="filter-buttons">
          <button
            :class="{ active: currentMode === 'all' }"
            @click="currentMode = 'all'"
          >
            Усі
          </button>

          <button
            :class="{ active: currentMode === 'favorites' }"
            @click="currentMode = 'favorites'"
          >
            Обрані
          </button>
        </div>
      </div>

      <p v-if="isLoading" class="loading">
        Завантаження...
      </p>

      <div v-else-if="error" class="error-box">
        <p>{{ error }}</p>

        <button @click="loadImages">
          Спробувати ще раз
        </button>
      </div>

      <div v-else class="gallery-grid">
        <ImageCard
          v-for="image in filteredImages"
          :key="image.id"
          :image="image"
          :is-favorite="isFavorite(image.id)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>
  </main>
</template>