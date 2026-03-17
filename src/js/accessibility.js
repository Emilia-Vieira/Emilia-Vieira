/**
 * Acessibilidade — Melhorias WCAG 2.1 AA / eMAG
 */

document.addEventListener('DOMContentLoaded', () => {
  initSkipLink()
  initFocusTrap()
  initKeyboardNavigation()
  initAriaLiveRegion()
  initReducedMotion()
  initFontSizeControls()
})

/**
 * Skip Link — garantir que funciona corretamente
 */
function initSkipLink() {
  const skipLink = document.querySelector('.skip-link')
  const mainContent = document.getElementById('main-content') || document.querySelector('main')

  if (!skipLink || !mainContent) return

  skipLink.addEventListener('click', (e) => {
    e.preventDefault()
    mainContent.setAttribute('tabindex', '-1')
    mainContent.focus()
    mainContent.addEventListener('blur', () => {
      mainContent.removeAttribute('tabindex')
    }, { once: true })
  })
}

/**
 * Focus Trap — para modais e drawers
 */
export function initFocusTrap(container) {
  if (!container) return

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  const focusableElements = container.querySelectorAll(focusableSelectors)
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable.focus()
      }
    }
  })
}

/**
 * Navegação por teclado em componentes
 */
function initKeyboardNavigation() {
  // Accordion
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('keydown', (e) => {
      const item = trigger.closest('.accordion__item')
      const accordion = trigger.closest('.accordion')
      if (!accordion) return

      const triggers = [...accordion.querySelectorAll('.accordion__trigger')]
      const index = triggers.indexOf(trigger)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        triggers[(index + 1) % triggers.length]?.focus()
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        triggers[(index - 1 + triggers.length) % triggers.length]?.focus()
      }
      if (e.key === 'Home') {
        e.preventDefault()
        triggers[0]?.focus()
      }
      if (e.key === 'End') {
        e.preventDefault()
        triggers[triggers.length - 1]?.focus()
      }
    })
  })

  // Tabs
  document.querySelectorAll('.tabs__tab').forEach(tab => {
    tab.addEventListener('keydown', (e) => {
      const tablist = tab.closest('.tabs__nav')
      if (!tablist) return

      const tabs = [...tablist.querySelectorAll('.tabs__tab')]
      const index = tabs.indexOf(tab)

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        tabs[(index + 1) % tabs.length]?.focus()
        tabs[(index + 1) % tabs.length]?.click()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        tabs[(index - 1 + tabs.length) % tabs.length]?.focus()
        tabs[(index - 1 + tabs.length) % tabs.length]?.click()
      }
      if (e.key === 'Home') {
        e.preventDefault()
        tabs[0]?.focus()
        tabs[0]?.click()
      }
      if (e.key === 'End') {
        e.preventDefault()
        tabs[tabs.length - 1]?.focus()
        tabs[tabs.length - 1]?.click()
      }
    })
  })
}

/**
 * Aria Live Region para notificações dinâmicas
 */
function initAriaLiveRegion() {
  if (!document.getElementById('aria-live-region')) {
    const region = document.createElement('div')
    region.id = 'aria-live-region'
    region.setAttribute('aria-live', 'polite')
    region.setAttribute('aria-atomic', 'true')
    region.className = 'sr-only'
    document.body.appendChild(region)
  }
}

export function announce(message) {
  const region = document.getElementById('aria-live-region')
  if (!region) return
  region.textContent = ''
  setTimeout(() => {
    region.textContent = message
  }, 100)
}

/**
 * Respeitar preferência de movimento reduzido
 */
function initReducedMotion() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  if (prefersReduced.matches) {
    document.documentElement.setAttribute('data-reduced-motion', 'true')
  }

  prefersReduced.addEventListener('change', (e) => {
    document.documentElement.setAttribute(
      'data-reduced-motion',
      e.matches ? 'true' : 'false'
    )
  })
}

/**
 * Controles de tamanho de fonte (acessibilidade)
 */
function initFontSizeControls() {
  const btnIncrease = document.querySelectorAll('[data-font-increase]')
  const btnDecrease = document.querySelectorAll('[data-font-decrease]')
  const btnReset    = document.querySelectorAll('[data-font-reset]')

  let fontSize = parseInt(localStorage.getItem('fontSize') || '100')
  applyFontSize(fontSize)

  btnIncrease.forEach(btn => {
    btn.addEventListener('click', () => {
      if (fontSize < 130) {
        fontSize += 10
        applyFontSize(fontSize)
        localStorage.setItem('fontSize', fontSize)
      }
    })
  })

  btnDecrease.forEach(btn => {
    btn.addEventListener('click', () => {
      if (fontSize > 80) {
        fontSize -= 10
        applyFontSize(fontSize)
        localStorage.setItem('fontSize', fontSize)
      }
    })
  })

  btnReset.forEach(btn => {
    btn.addEventListener('click', () => {
      fontSize = 100
      applyFontSize(fontSize)
      localStorage.setItem('fontSize', fontSize)
    })
  })
}

function applyFontSize(size) {
  document.documentElement.style.fontSize = `${size}%`
}

/**
 * Alto contraste
 */
export function initHighContrast() {
  const btns = document.querySelectorAll('[data-high-contrast]')
  const stored = localStorage.getItem('highContrast') === 'true'

  if (stored) document.documentElement.setAttribute('data-high-contrast', 'true')

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = document.documentElement.hasAttribute('data-high-contrast')
      if (isActive) {
        document.documentElement.removeAttribute('data-high-contrast')
        localStorage.setItem('highContrast', 'false')
      } else {
        document.documentElement.setAttribute('data-high-contrast', 'true')
        localStorage.setItem('highContrast', 'true')
      }
    })
  })
}
