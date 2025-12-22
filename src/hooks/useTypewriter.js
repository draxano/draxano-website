import { useState, useEffect } from 'react'

/**
 * Custom hook for typewriter animation
 * Types text character by character, then blinks the last character 5 times before restarting
 */
export function useTypewriter(text, typingSpeed = 200, blinkSpeed = 500, blinkCount = 8) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLastChar, setShowLastChar] = useState(true)
  const [phase, setPhase] = useState('typing') // 'typing' or 'blinking'
  const [blinkIteration, setBlinkIteration] = useState(0)

  useEffect(() => {
    // Typing phase
    if (phase === 'typing' && currentIndex < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex((prev) => {
          const next = prev + 1
          // When we reach the end, switch to blinking phase
          if (next === text.length) {
            setPhase('blinking')
            setBlinkIteration(0)
            setShowLastChar(true)
          }
          return next
        })
      }, typingSpeed)

      return () => clearTimeout(typingTimeout)
    }

    // Blinking phase
    if (phase === 'blinking' && currentIndex === text.length) {
      const blinkInterval = setInterval(() => {
        setShowLastChar((prev) => {
          const newState = !prev
          // When the character becomes visible again (after a blink)
          if (newState) {
            setBlinkIteration((prev) => {
              const next = prev + 1
              // After blinks, reset to typing phase
              if (next >= blinkCount) {
                setPhase('typing')
                setCurrentIndex(0)
                setDisplayedText('')
                setBlinkIteration(0)
                clearInterval(blinkInterval)
                return 0
              }
              return next
            })
          }
          return newState
        })
      }, blinkSpeed)

      return () => clearInterval(blinkInterval)
    }
  }, [currentIndex, text, typingSpeed, blinkSpeed, blinkCount, phase])

  // Return text with or without the last character based on blink state
  if (phase === 'blinking' && !showLastChar) {
    return displayedText.slice(0, -1)
  }

  return displayedText
}

