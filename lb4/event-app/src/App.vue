<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/" class="logo">
        Події
      </RouterLink>

      <nav>
        <RouterLink to="/">
          Список подій
        </RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView v-slot="{ Component }">
        <KeepAlive include="EventListView">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
  </div>
</template>