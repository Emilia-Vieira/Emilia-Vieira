/**
 * Main JS — Tesouro Estadual MG
 * Ponto de entrada: importa todos os módulos
 */

import './header.js'
import './accessibility.js'
import './accordion.js'
import './tabs.js'

// Inicializar componentes ao carregar DOM
document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner()
  initAnimations()
  initCountUp()
})

/**
 * Cookie Banner (LGPD)
 */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner')
  if (!banner) return

  const accepted = localStorage.getItem('cookiesAccepted')
  if (!accepted) {
    setTimeout(() => banner.classList.add('is-visible'), 1000)
  }

  const btnAccept = banner.querySelector('[data-accept-cookies]')
  const btnDecline = banner.querySelector('[data-decline-cookies]')

  btnAccept?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true')
    banner.classList.remove('is-visible')
  })

  btnDecline?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'declined')
    banner.classList.remove('is-visible')
  })
}

/**
 * Animações ao scroll (intersection observer)
 */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  })

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el)
  })
}

/**
 * Animação de contagem para números (KPIs)
 */
function initCountUp() {
  const counters = document.querySelectorAll('[data-countup]')
  if (!counters.length) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  counters.forEach(el => observer.observe(el))
}

function animateCountUp(el) {
  const target = parseFloat(el.dataset.countup.replace(/[^0-9.]/g, ''))
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0
  const duration = 1500
  const start = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
    const current = target * eased

    el.textContent = prefix + formatNumber(current, decimals) + suffix

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

function formatNumber(num, decimals) {
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Utilitário: debounce
 */
export function debounce(fn, delay = 200) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
