import { useEffect, useRef } from 'react'

export const CircleChartWrapper = ({
  data,
  tooltips = true,
  background,
  isPie = true,
  animated = true,
  size,
  ringProportion,
  middleCircleColor
}) => {
  const containerRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !data || data.length === 0) {
      return
    }

    let isMounted = true

    // Инициализируем график
    const initChart = () => {
      // Библиотека загружается через script tag в index.html
      const CircleChart = window.CircleChart

      if (!CircleChart) {
        console.error('CircleChart library not found. Make sure circle-chart.js is loaded.')
        return
      }

      if (!isMounted || !containerRef.current) {
        return
      }

      // Очищаем предыдущий экземпляр, если он существует
      if (chartInstanceRef.current) {
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
      }

      // Создаем новый экземпляр графика
      const chartOptions = {
        $container: containerRef.current,
        tooltips,
        isPie,
        animated,
        definition: data
      }

      if (background) {
        chartOptions.background = background
      }

      if (size) {
        chartOptions.size = size
      }

      if (ringProportion !== undefined) {
        chartOptions.ringProportion = ringProportion
      }

      if (middleCircleColor) {
        chartOptions.middleCircleColor = middleCircleColor
      }

      chartInstanceRef.current = new CircleChart(chartOptions)
    }

    // Ждем, пока библиотека загрузится (если еще не загружена)
    if (window.CircleChart) {
      initChart()
    } else {
      // Если библиотека еще не загружена, ждем события загрузки
      const checkLibrary = setInterval(() => {
        if (window.CircleChart) {
          clearInterval(checkLibrary)
          initChart()
        }
      }, 50)

      // Останавливаем проверку через 3 секунды
      setTimeout(() => {
        clearInterval(checkLibrary)
        if (!window.CircleChart) {
          console.error('CircleChart library failed to load')
        } else {
          initChart()
        }
      }, 3000)
    }

    // Очистка при размонтировании
    return () => {
      isMounted = false
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      chartInstanceRef.current = null
      // Не удаляем script элемент, так как он может использоваться другими компонентами
    }
  }, [data, tooltips, background, isPie, animated, size, ringProportion, middleCircleColor])

  // Обновление данных графика при изменении data
  useEffect(() => {
    if (!chartInstanceRef.current || !data || data.length === 0) {
      return
    }

    // Создаем объект данных для метода update
    const updateData = {}
    data.forEach(item => {
      if (item.name) {
        updateData[item.name] = item.value
      }
    })

    // Обновляем график, если метод update доступен
    if (chartInstanceRef.current.update && typeof chartInstanceRef.current.update === 'function') {
      chartInstanceRef.current.update(updateData)
    }
  }, [data])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '220px' }} />
}

