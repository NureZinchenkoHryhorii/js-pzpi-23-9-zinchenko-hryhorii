<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <section>
    <div class="page-title">
      <div>
        <h2>Статистика</h2>
        <p>Загальна інформація про стан задач.</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span>Всього задач</span>
        <strong>{{ taskStore.tasks.length }}</strong>
      </div>

      <div class="stat-card">
        <span>Активних</span>
        <strong>{{ taskStore.activeTasks.length }}</strong>
      </div>

      <div class="stat-card">
        <span>Виконано</span>
        <strong>{{ taskStore.completedTasks.length }}</strong>
      </div>

      <div class="stat-card">
        <span>Прострочено</span>
        <strong>{{ taskStore.overdueTasks.length }}</strong>
      </div>
    </div>

    <div class="progress-box">
      <h3>Прогрес виконання</h3>

      <div class="progress-line">
        <div
          class="progress-fill"
          :style="{ width: `${taskStore.completionPercent}%` }"
        ></div>
      </div>

      <p>{{ taskStore.completionPercent }}% задач виконано</p>
    </div>

    <div class="stats-section">
      <h3>Найближчі дедлайни</h3>

      <p v-if="taskStore.nearestDeadlines.length === 0" class="empty">
        Немає задач із дедлайном протягом 3 днів.
      </p>

      <ul v-else class="deadline-list">
        <li
          v-for="task in taskStore.nearestDeadlines"
          :key="task.id"
        >
          <span>{{ task.title }}</span>
          <strong>{{ task.deadline }}</strong>
        </li>
      </ul>
    </div>

    <div class="stats-section">
      <h3>Кількість задач по категоріях</h3>

      <ul class="deadline-list">
        <li
          v-for="(count, category) in taskStore.tasksByCategory"
          :key="category"
        >
          <span>{{ category }}</span>
          <strong>{{ count }}</strong>
        </li>
      </ul>
    </div>
  </section>
</template>