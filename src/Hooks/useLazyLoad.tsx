import React, { FC, ReactElement, useEffect, useState } from "react"

const useLazyLoad = (element: React.RefObject<HTMLElement>): boolean => {
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (!element.current) return
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setLoaded(() => true)
          observer.unobserve(entry.target)
        }
      })
    }
    const observer = new IntersectionObserver(callback)
    observer.observe(element.current)

    return () => observer.disconnect()
  }, [element])

  return loaded
}

export default useLazyLoad
