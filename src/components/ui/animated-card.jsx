import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card.jsx'
import { motion } from 'framer-motion'

const AnimatedCard = ({ children, title, ...props }) => {
  const [isHovered, setIsHovered] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={`
          bg-white/60 backdrop-blur-sm border-neutral-200
          ${isHovered ? 'shadow-lg' : 'shadow-md'}
          transition-all duration-300
        `}
        {...props}
      >
        <CardHeader>
          <motion.div variants={item}>
            <CardTitle className="text-xl font-light text-neutral-900">
              {title}
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div variants={item}>
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { AnimatedCard }
