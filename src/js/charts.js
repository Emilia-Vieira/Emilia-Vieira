/**
 * Gráficos Fiscais — Chart.js
 * Dados simulados para demonstração do design system
 */

import Chart from 'chart.js/auto'

// Paleta de cores do design system
const COLORS = {
  azul:      '#0057A8',
  azulClaro: '#1A73C5',
  azulXClaro:'#E8F0FC',
  verde:     '#1B7A40',
  ouro:      '#C8960C',
  erro:      '#B91C1C',
  cinza:     '#9CA3AF',
  cinzaClaro:'#F3F4F6',
}

// Configuração global Chart.js
Chart.defaults.font.family = 'Inter, system-ui, sans-serif'
Chart.defaults.font.size = 12
Chart.defaults.color = '#4B5563'
Chart.defaults.plugins.legend.position = 'bottom'
Chart.defaults.plugins.legend.labels.boxWidth = 12
Chart.defaults.plugins.legend.labels.padding = 20
Chart.defaults.plugins.tooltip.backgroundColor = '#111827'
Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold', size: 13 }
Chart.defaults.plugins.tooltip.padding = 12
Chart.defaults.plugins.tooltip.cornerRadius = 8
Chart.defaults.responsive = true
Chart.defaults.maintainAspectRatio = false

/**
 * Gráfico de Receitas Mensais (linha)
 */
export function criarGraficoReceitas(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  const receitasPrevistas = [
    8.2, 7.8, 9.1, 8.9, 9.4, 10.2,
    9.8, 10.5, 11.2, 10.8, 11.5, 13.2
  ]

  const receitasRealizadas = [
    8.5, 8.1, 9.4, 9.1, 9.8, 10.6,
    10.2, 10.9, 11.5, 11.1, null, null
  ]

  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: meses,
      datasets: [
        {
          label: 'Previstas (R$ bi)',
          data: receitasPrevistas,
          borderColor: COLORS.cinza,
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: COLORS.cinza,
          tension: 0.3,
        },
        {
          label: 'Realizadas (R$ bi)',
          data: receitasRealizadas,
          borderColor: COLORS.azul,
          backgroundColor: `${COLORS.azul}18`,
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: COLORS.azul,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.3,
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: R$ ${ctx.parsed.y.toFixed(1)} bi`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          grid: {
            color: '#F3F4F6',
            drawBorder: false,
          },
          border: { display: false },
          ticks: {
            callback: val => `R$ ${val}bi`
          }
        }
      }
    }
  })
}

/**
 * Gráfico de Despesas por Categoria (barras)
 */
export function criarGraficoDespesas(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: [
        'Pessoal e\nEncargos',
        'Previdência\nSocial',
        'Saúde',
        'Educação',
        'Segurança\nPública',
        'Transporte e\nInfraestrutura',
        'Assistência\nSocial',
        'Outros'
      ],
      datasets: [{
        label: 'Despesa (R$ bi)',
        data: [42.3, 28.7, 18.2, 15.4, 8.9, 6.3, 5.1, 9.8],
        backgroundColor: [
          COLORS.azul,
          COLORS.azulClaro,
          COLORS.verde,
          '#34C474',
          COLORS.ouro,
          '#D48C1A',
          '#9CA3AF',
          '#D1D5DB',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` R$ ${ctx.parsed.y.toFixed(1)} bi`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { size: 11 }
          }
        },
        y: {
          grid: { color: '#F3F4F6' },
          border: { display: false },
          ticks: {
            callback: val => `R$ ${val}bi`
          }
        }
      }
    }
  })
}

/**
 * Gráfico de Resultado Fiscal (linha com área)
 */
export function criarGraficoResultadoFiscal(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  const anos = ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
  const resultado = [-8.4, -5.2, -12.1, -2.3, 1.8, 3.4, 4.1]

  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: anos,
      datasets: [{
        label: 'Resultado Fiscal (R$ bi)',
        data: resultado,
        borderColor: resultado.map(v => v >= 0 ? COLORS.verde : COLORS.erro),
        backgroundColor: resultado.map(v => v >= 0 ? `${COLORS.verde}20` : `${COLORS.erro}15`),
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: resultado.map(v => v >= 0 ? COLORS.verde : COLORS.erro),
        fill: 'origin',
        tension: 0.4,
        segment: {
          borderColor: ctx => resultado[ctx.p0DataIndex] >= 0 ? COLORS.verde : COLORS.erro,
        }
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const val = ctx.parsed.y
              return ` ${val >= 0 ? 'Superávit' : 'Déficit'}: R$ ${Math.abs(val).toFixed(1)} bi`
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          grid: { color: '#F3F4F6' },
          border: { display: false },
          ticks: {
            callback: val => `R$ ${val}bi`
          }
        }
      }
    }
  })
}

/**
 * Gráfico de Dívida Consolidada (barras empilhadas)
 */
export function criarGraficoDivida(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Dívida Interna',
          data: [95.2, 102.4, 98.1, 94.3, 91.8, 88.6],
          backgroundColor: COLORS.azul,
          borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 6, bottomRight: 6 },
        },
        {
          label: 'Dívida Externa',
          data: [12.3, 14.2, 13.8, 12.1, 10.9, 9.4],
          backgroundColor: COLORS.azulClaro,
          borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: R$ ${ctx.parsed.y.toFixed(1)} bi`
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          border: { display: false },
        },
        y: {
          stacked: true,
          grid: { color: '#F3F4F6' },
          border: { display: false },
          ticks: {
            callback: val => `R$ ${val}bi`
          }
        }
      }
    }
  })
}

/**
 * Gráfico de composição de receitas (donut)
 */
export function criarGraficoComposicaoReceitas(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  return new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: [
        'ICMS',
        'IPVA',
        'ITCD',
        'Transferências Federais',
        'Royalties',
        'Outros'
      ],
      datasets: [{
        data: [38.2, 12.4, 3.8, 28.6, 8.1, 8.9],
        backgroundColor: [
          COLORS.azul,
          COLORS.azulClaro,
          COLORS.verde,
          COLORS.ouro,
          '#6B7280',
          '#D1D5DB',
        ],
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverOffset: 6,
      }]
    },
    options: {
      cutout: '65%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            generateLabels: (chart) => {
              const data = chart.data
              return data.labels.map((label, i) => ({
                text: `${label} (${data.datasets[0].data[i]}%)`,
                fillStyle: data.datasets[0].backgroundColor[i],
                index: i,
              }))
            }
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed}%`
          }
        }
      }
    }
  })
}

/**
 * Inicializar todos os gráficos encontrados na página
 */
export function initCharts() {
  criarGraficoReceitas('chart-receitas')
  criarGraficoDespesas('chart-despesas')
  criarGraficoResultadoFiscal('chart-resultado')
  criarGraficoDivida('chart-divida')
  criarGraficoComposicaoReceitas('chart-composicao')
}

// Auto-inicializar se a página tiver gráficos
document.addEventListener('DOMContentLoaded', () => {
  const hasCharts = document.querySelector('[id^="chart-"]')
  if (hasCharts) initCharts()
})
