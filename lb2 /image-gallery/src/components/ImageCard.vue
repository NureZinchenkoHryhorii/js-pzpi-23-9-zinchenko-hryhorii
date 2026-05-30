<script setup>
defineProps({
  image: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle-favorite'])

function handleFavoriteClick(imageId) {
  emit('toggle-favorite', imageId)
}
</script>

<template>
  <article class="image-card">
    <img
      :src="image.download_url"
      :alt="image.author"
      class="image"
    />

    <div class="card-content">
      <div>
        <h2>{{ image.author }}</h2>
        <p>ID: {{ image.id }}</p>
      </div>

      <button
        class="favorite-button"
        :class="{ selected: isFavorite }"
        @click="handleFavoriteClick(image.id)"
      >
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </div>
  </article>
</template>