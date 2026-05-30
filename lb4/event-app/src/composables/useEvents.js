const events = [
  {
    id: 1,
    title: 'Vue Meetup',
    date: '2026-06-01',
    category: 'Мітап',
    location: 'Online',
    shortDescription: 'Зустріч для розробників, які працюють з Vue.',
    description:
      'На події учасники ознайомляться з новими можливостями Vue 3, Composition API та сучасними підходами до створення SPA-застосунків.',
    color: 'purple'
  },
  {
    id: 2,
    title: 'Frontend Conf',
    date: '2026-06-12',
    category: 'Конференція',
    location: 'Харків',
    shortDescription: 'Конференція про сучасну frontend-розробку.',
    description:
      'Frontend Conf присвячена JavaScript, Vue, React, UI/UX, роботі з API та побудові масштабованих вебзастосунків.',
    color: 'green'
  },
  {
    id: 3,
    title: 'Hackathon',
    date: '2026-06-20',
    category: 'Хакатон',
    location: 'Київ',
    shortDescription: 'Командне змагання зі створення вебпроєктів.',
    description:
      'Учасники працюють у командах, створюють прототип застосунку та презентують готове рішення журі.',
    color: 'orange'
  }
]

export function useEvents() {
  function getEvents() {
    return events
  }

  function getEventById(id) {
    return events.find(event => event.id === Number(id))
  }

  return {
    getEvents,
    getEventById
  }
}