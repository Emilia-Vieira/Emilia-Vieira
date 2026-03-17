/**
 * Tabs — acessível com ARIA roles
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabs').forEach(tabsComponent => {
    const nav = tabsComponent.querySelector('.tabs__nav')
    const tabButtons = tabsComponent.querySelectorAll('.tabs__tab')
    const panels = tabsComponent.querySelectorAll('.tabs__panel')

    if (!nav || !tabButtons.length) return

    // ARIA setup
    nav.setAttribute('role', 'tablist')

    tabButtons.forEach((tab, i) => {
      const panelId = `tab-panel-${Math.random().toString(36).substr(2, 9)}`
      const tabId = `tab-${Math.random().toString(36).substr(2, 9)}`
      const panel = panels[i]

      tab.setAttribute('role', 'tab')
      tab.setAttribute('id', tabId)
      tab.setAttribute('aria-selected', tab.classList.contains('is-active') ? 'true' : 'false')
      tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1')

      if (panel) {
        panel.setAttribute('role', 'tabpanel')
        panel.setAttribute('id', panelId)
        panel.setAttribute('aria-labelledby', tabId)
        tab.setAttribute('aria-controls', panelId)
      }

      tab.addEventListener('click', () => {
        activateTab(tab, tabButtons, panels)
      })
    })
  })
})

function activateTab(selectedTab, allTabs, allPanels) {
  const targetPanelId = selectedTab.getAttribute('aria-controls')

  allTabs.forEach(tab => {
    const isSelected = tab === selectedTab
    tab.classList.toggle('is-active', isSelected)
    tab.setAttribute('aria-selected', isSelected ? 'true' : 'false')
    tab.setAttribute('tabindex', isSelected ? '0' : '-1')
  })

  allPanels.forEach(panel => {
    panel.classList.toggle('is-active', panel.id === targetPanelId)
  })
}
