import React, { useState, useRef, useEffect } from "react"

interface InfiniteScrollProps {
  id: string
  onMore: () => void
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ id, onMore }) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (isIntersecting) onMore()
      },
      { threshold: 0.75 }
    )
    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [isIntersecting, onMore])

  return <div ref={ref} id={id} />
}

export default InfiniteScroll
