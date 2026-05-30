import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const registrations = useLocalStorage('event-registrations', [])

export function useRegistration() {
  const isLoading = ref(false)
  const error = ref('')

  function getRegistrationsByEvent(eventId) {
    return registrations.value.filter(
      registration => registration.eventId === Number(eventId)
    )
  }

  async function registerUser(eventId, userData) {
    isLoading.value = true
    error.value = ''

    const newRegistration = {
      id: Date.now(),
      eventId: Number(eventId),
      name: userData.name,
      email: userData.email,
      registeredAt: new Date().toLocaleString()
    }

    registrations.value.push(newRegistration)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.2

          if (isSuccess) {
            resolve()
          } else {
            reject(new Error('Помилка сервера'))
          }
        }, 1000)
      })

      return true
    } catch (err) {
      registrations.value = registrations.value.filter(
        registration => registration.id !== newRegistration.id
      )

      error.value = 'Не вдалося виконати реєстрацію. Спробуйте ще раз.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    registrations,
    isLoading,
    error,
    getRegistrationsByEvent,
    registerUser
  }
}