import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface OmikujiCylinderProps {
  isAnimating: boolean
}

const OmikujiCylinder = forwardRef<HTMLDivElement, OmikujiCylinderProps>(
  ({ isAnimating }, ref) => {
    return (
      <div className="relative">
        {/* 筒の本体 */}
        <motion.div
          ref={ref}
          className="relative w-32 h-48 md:w-40 md:h-56"
          style={{ perspective: '1000px' }}
        >
          {/* 六角形の筒 */}
          <div className="hexagon-cylinder relative w-full h-full">
            {/* 六角形の各面 */}
            {Array.from({ length: 6 }).map((_, index) => {
              const rotation = index * 60
              return (
                <div
                  key={index}
                  className="absolute w-full h-full bg-gradient-to-b from-amber-600 to-amber-800 border border-amber-900"
                  style={{
                    transformOrigin: '50% 50%',
                    transform: `rotateY(${rotation}deg) translateZ(64px)`,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* 木目のテクスチャ効果 */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-900 to-transparent"></div>
                    <div className="absolute top-0 w-full h-1 bg-amber-900 opacity-50"></div>
                    <div className="absolute top-4 w-full h-px bg-amber-900 opacity-30"></div>
                    <div className="absolute top-8 w-full h-px bg-amber-900 opacity-30"></div>
                    <div className="absolute top-12 w-full h-px bg-amber-900 opacity-30"></div>
                    <div className="absolute top-16 w-full h-px bg-amber-900 opacity-30"></div>
                    <div className="absolute bottom-0 w-full h-1 bg-amber-900 opacity-50"></div>
                  </div>
                </div>
              )
            })}
            
            {/* 上面の穴 */}
            <div 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-amber-900 shadow-inner"
              style={{ zIndex: 10 }}
            >
              <div className="absolute inset-1 rounded-full bg-gray-900"></div>
            </div>

            {/* 下面（反転時に見える）*/}
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-amber-900 shadow-inner"
              style={{ zIndex: 10 }}
            >
              <div className="absolute inset-1 rounded-full bg-gray-900"></div>
            </div>

            {/* 装飾的な文字 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-200 font-bold text-sm md:text-base z-20 text-center px-2">
              おみくじ箱
            </div>
          </div>
        </motion.div>

        {/* 影 */}
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 md:w-40 md:h-10 bg-black opacity-20 rounded-full blur-md"
          animate={{
            scale: isAnimating ? [1, 1.1, 1] : 1,
            opacity: isAnimating ? [0.2, 0.1, 0.2] : 0.2
          }}
          transition={{
            duration: 0.5,
            repeat: isAnimating ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* 神秘的な光の効果 */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 rounded-full blur-xl"
          animate={{
            opacity: isAnimating ? [0, 0.3, 0] : 0,
            scale: isAnimating ? [0.8, 1.2, 0.8] : 1
          }}
          transition={{
            duration: 2,
            repeat: isAnimating ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* 回転中のパーティクル効果 */}
        {isAnimating && (
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: [0, Math.cos(index * 45 * Math.PI / 180) * 100],
                  y: [0, Math.sin(index * 45 * Math.PI / 180) * 100],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

OmikujiCylinder.displayName = 'OmikujiCylinder'

export default OmikujiCylinder