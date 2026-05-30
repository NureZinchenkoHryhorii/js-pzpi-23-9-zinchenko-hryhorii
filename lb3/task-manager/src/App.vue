<template>
  <div class="app">
    <header class="header">
      <h1>Менеджер задач</h1>

      <nav class="nav">
        <RouterLink to="/">Задачі</RouterLink>
        <RouterLink to="/tasks/new">Нова задача</RouterLink>
        <RouterLink to="/stats">Статистика</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>