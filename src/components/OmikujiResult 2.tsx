import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { FortuneType } from './OmikujiApp'

interface FortuneResult {
  type: FortuneType
  message: string
  imageUrl: string
}

interface OmikujiResultProps {
  fortune: FortuneResult
  onShare: () => void
  onReset: () => void
}

const OmikujiResult: React.FC<OmikujiResultProps> = ({ fortune }) => {
  const paperRef = useRef<HTMLDivElement>(null)

  const getFortuneColor = (type: FortuneType) => {
    switch (type) {
      case '大吉': return 'from-amber-500 to-yellow-500'
      case '中吉': return 'from-emerald-500 to-teal-600'
      case '小吉': return 'from-sky-500 to-indigo-500'
      case '凶': return 'from-slate-500 to-stone-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getFortuneEmoji = (type: FortuneType) => {
    switch (type) {
      case '大吉': return '🌟'
      case '中吉': return '🍀'
      case '小吉': return '🌸'
      case '凶': return '⚡'
      default: return '✨'
    }
  }

  return (
    <motion.div
      ref={paperRef}
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, rotateX: 90 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      className="max-w-md mx-auto"
    >
      {/* 棒状の神（紙の上部に配置）*/}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center mb-2"
      >
        <div className="w-2 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full shadow-lg">
          <div className="w-full h-2 bg-amber-400 rounded-full"></div>
        </div>
      </motion.div>

      {/* おみくじの紙 */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg shadow-2xl p-6 border-2 border-amber-200"
        style={{ transformOrigin: 'top center' }}
      >
        {/* 結果のタイトル */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${getFortuneColor(fortune.type)} text-white font-bold text-2xl md:text-3xl shadow-lg`}>
            {getFortuneEmoji(fortune.type)} {fortune.type} {getFortuneEmoji(fortune.type)}
          </div>
        </motion.div>

        {/* イラスト表示エリア */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-amber-50 to-stone-100 rounded-full flex items-center justify-center border-4 border-amber-400 shadow-inner">
            {fortune.imageUrl ? (
              <img 
                src={fortune.imageUrl} 
                alt={fortune.type}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // 画像の読み込みに失敗した場合のフォールバック
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling!.style.display = 'flex'
                }}
              />
            ) : null}
            <div className="text-6xl md:text-7xl" style={{ display: fortune.imageUrl ? 'none' : 'flex' }}>
              {getFortuneEmoji(fortune.type)}
            </div>
          </div>
        </motion.div>

        {/* メッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium mb-4">
            {fortune.message}
          </p>
        </motion.div>

        {/* 装飾的な境界線 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4"
        />

        {/* 日付 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="text-center text-sm text-gray-500"
        >
          {new Date().toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </motion.div>
      </motion.div>

      {/* 紙が開くときのキラキラエフェクト */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${20 + index * 5}%`,
              top: `${30 + (index % 3) * 20}%`
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
              y: [0, -20, -40]
            }}
            transition={{
              duration: 2,
              delay: 0.8 + index * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default OmikujiResult