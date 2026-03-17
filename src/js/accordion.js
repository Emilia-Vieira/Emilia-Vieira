/**
 * Accordion — acessível com ARIA
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion').forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion__item')

    items.forEach(item => {
      const trigger = item.querySelector('.accordion__trigger')
      const panel = item.querySelector('.accordion__panel')

      if (!trigger || !panel) return

      // IDs para associação ARIA
      const panelId = `accordion-panel-${Math.random().toString(36).substr(2, 9)}`
      const triggerId = `accordion-trigger-${Math.random().toString(36).substr(2, 9)}`

      trigger.id = triggerId
      panel.id = panelId
      trigger.setAttribute('aria-controls', panelId)
      panel.setAttribute('aria-labelledby', triggerId)
      panel.setAttribute('role', 'region')

      const isOpen = item.classList.contains('is-open')
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false')

      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true'

        // Fechar outros (se não for multi-open)
        if (!accordion.dataset.multiOpen) {
          items.forEach(other => {
            if (other !== item) {
              const otherTrigger = other.querySelector('.accordion__trigger')
              const otherPanel = other.querySelector('.accordion__panel')
              other.classList.remove('is-open')
              otherTrigger?.setAttribute('aria-expanded', 'false')
            }
          })
        }

        item.classList.toggle('is-open', !expanded)
        trigger.setAttribute('aria-expanded', !expanded ? 'true' : 'false')
      })
    })
  })
})
