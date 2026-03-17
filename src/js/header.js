/**
 * Header — Mega Menu e Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader()
  initMegaMenu()
  initMobileNav()
})

/**
 * Header sticky com sombra ao rolar
 */
function initStickyHeader() {
  const header = document.querySelector('.header')
  if (!header) return

  const handleScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
}

/**
 * Mega Menu — desktop
 */
function initMegaMenu() {
  const items = document.querySelectorAll('.nav-primary__item')

  items.forEach(item => {
    const trigger = item.querySelector('.nav-primary__link')
    const menu = item.querySelector('.mega-menu')

    if (!menu) return

    // Marcar como botão dropdown
    trigger.setAttribute('aria-haspopup', 'true')
    trigger.setAttribute('aria-expanded', 'false')

    function open() {
      // Fechar outros abertos
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open')
          const t = other.querySelector('.nav-primary__link')
          if (t) t.setAttribute('aria-expanded', 'false')
        }
      })
      item.classList.add('is-open')
      trigger.setAttribute('aria-expanded', 'true')
    }

    function close() {
      item.classList.remove('is-open')
      trigger.setAttribute('aria-expanded', 'false')
    }

    // Mouse enter/leave
    item.addEventListener('mouseenter', open)
    item.addEventListener('mouseleave', close)

    // Teclado: Enter/Space para abrir
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        item.classList.contains('is-open') ? close() : open()
      }
      if (e.key === 'Escape') {
        close()
        trigger.focus()
      }
    })

    // Fechar ao pressionar Escape dentro do menu
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close()
        trigger.focus()
      }
    })
  })

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-primary__item')) {
      items.forEach(item => {
        item.classList.remove('is-open')
        const t = item.querySelector('.nav-primary__link')
        if (t) t.setAttribute('aria-expanded', 'false')
      })
    }
  })
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const hamburger = document.querySelector('.header__hamburger')
  const mobileNav = document.querySelector('.mobile-nav')
  const overlay = document.querySelector('.mobile-nav__overlay')
  const closeBtn = document.querySelector('.mobile-nav__close')

  if (!hamburger || !mobileNav) return

  function openNav() {
    mobileNav.classList.add('is-open')
    overlay?.classList.add('is-open')
    hamburger.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'

    // Foco no primeiro elemento focável
    setTimeout(() => {
      const firstFocusable = mobileNav.querySelector('button, a, input')
      firstFocusable?.focus()
    }, 300)
  }

  function closeNav() {
    mobileNav.classList.remove('is-open')
    overlay?.classList.remove('is-open')
    hamburger.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
    hamburger.focus()
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('is-open') ? closeNav() : openNav()
  })

  closeBtn?.addEventListener('click', closeNav)
  overlay?.addEventListener('click', closeNav)

  // Escape para fechar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeNav()
    }
  })

  // Submenus mobile
  const mobileItems = mobileNav.querySelectorAll('.mobile-nav__item')
  mobileItems.forEach(item => {
    const link = item.querySelector('.mobile-nav__link')
    const sub = item.querySelector('.mobile-nav__sub')

    if (!sub) return

    link.addEventListener('click', (e) => {
      e.preventDefault()
      const isOpen = item.classList.contains('is-open')

      // Fechar outros
      mobileItems.forEach(other => other.classList.remove('is-open'))

      if (!isOpen) {
        item.classList.add('is-open')
      }
    })
  })

  // Busca mobile
  const searchInput = mobileNav.querySelector('[data-mobile-search]')
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim()
      if (query) {
        window.location.href = `/busca.html?q=${encodeURIComponent(query)}`
      }
    }
  })
}
