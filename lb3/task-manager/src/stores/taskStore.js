import { defineStore } from 'pinia'

const savedTasks = localStorage.getItem('tasks')

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: 'Підготувати презентацію до захисту',
            description: 'Підготувати слайди для захисту лабораторної роботи №3.',
            category: 'Робота',
            priority: 'Високий',
            deadline: '2026-06-10',
            completed: false,
            createdAt: '2026-05-25'
          },
          {
            id: 2,
            title: 'Прочитати документацію Vue Router',
            description: 'Ознайомитися з маршрутизацією та динамічними параметрами.',
            category: 'Навчання',
            priority: 'Середній',
            deadline: '2026-06-15',
            completed: false,
            createdAt: '2026-05-25'
          },
          {
            id: 3,
            title: 'Купити продукти на тиждень',
            description: 'Скласти список продуктів та зробити покупки.',
            category: 'Особисте',
            priority: 'Низький',
            deadline: '2026-06-05',
            completed: true,
            createdAt: '2026-05-25'
          }
        ]
  }),

  getters: {
    activeTasks: (state) => {
      return state.tasks.filter(task => !task.completed)
    },

    completedTasks: (state) => {
      return state.tasks.filter(task => task.completed)
    },

    overdueTasks: (state) => {
      const today = new Date().toISOString().split('T')[0]

      return state.tasks.filter(task =>
        task.deadline < today && !task.completed
      )
    },

    tasksByCategory: (state) => {
      return state.tasks.reduce((result, task) => {
        result[task.category] = (result[task.category] || 0) + 1
        return result
      }, {})
    },

    nearestDeadlines: (state) => {
      const today = new Date()
      const threeDaysLater = new Date()
      threeDaysLater.setDate(today.getDate() + 3)

      return state.tasks.filter(task => {
        const deadline = new Date(task.deadline)
        return deadline >= today && deadline <= threeDaysLater && !task.completed
      })
    },

    completionPercent: (state) => {
      if (state.tasks.length === 0) {
        return 0
      }

      const completed = state.tasks.filter(task => task.completed).length
      return Math.round((completed / state.tasks.length) * 100)
    }
  },

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },

    addTask(task) {
      this.tasks.push({
        id: Date.now(),
        ...task,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0]
      })

      this.saveToLocalStorage()
    },

    updateTask(id, updatedTask) {
      const index = this.tasks.findIndex(task => task.id === Number(id))

      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          ...updatedTask
        }

        this.saveToLocalStorage()
      }
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== Number(id))
      this.saveToLocalStorage()
    },

    toggleTaskStatus(id) {
      const task = this.tasks.find(task => task.id === Number(id))

      if (task) {
        task.completed = !task.completed
        this.saveToLocalStorage()
      }
    },

    getTaskById(id) {
      return this.tasks.find(task => task.id === Number(id))
    }
  }
})