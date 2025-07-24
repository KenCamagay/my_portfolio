'use client'

import { useEffect, useRef } from 'react'
import './background.css'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const columns = Math.floor(width / 20)
    const chars = 'アァイィウヴエカキクケコサシスセソタチッツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン'.split('')
    const drops = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#0F0'
      ctx.font = '16px monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 20, drops[i] * 20)
        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
    ref={canvasRef}
    className="fixed inset-0 -z-10 w-full h-full"
    />
  )
}
