import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const springConfig = {
  type: 'spring',
  stiffness: 500,
  damping: 30
}

export const useCardAnimation = (isMounted) => {
  const [isHovered, setIsHovered] = useState(false)

  return {
    scale: isMounted ? (isHovered ? 1.05 : 1) : 0,
    opacity: isMounted ? 1 : 0,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
}

export const useButtonAnimation = () => {
  const [isHovered, setIsHovered] = useState(false)

  return {
    scale: isHovered ? 1.05 : 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
}

export const useTransitionAnimation = () => {
  const [isMounted, setIsMounted] = useState(false)

  return {
    opacity: isMounted ? 1 : 0,
    y: isMounted ? 0 : 20,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
}
