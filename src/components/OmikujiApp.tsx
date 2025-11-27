import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Share2, RotateCcw } from 'lucide-react'
import OmikujiCylinder from './OmikujiCylinder'
import OmikujiResult from './OmikujiResult'
import { omikujiData } from '../data/omikujiData'

export type FortuneType = '大吉' | '中吉' | '小吉' | '凶'

interface FortuneResult {
  type: FortuneType
  message: string
  imageUrl: string
}

const OmikujiApp: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [currentFortune, setCurrentFortune] = useState<FortuneResult | null>(null)
  const cylinderRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)

  const drawOmikuji = useCallback(async () => {
    if (isAnimating) return

    setIsAnimating(true)
    setShowResult(false)

    // ランダムで運勢を選択
    const fortuneTypes: FortuneType[] = ['大吉', '中吉', '小吉', '凶']
    const randomType = fortuneTypes[Math.floor(Math.random() * fortuneTypes.length)]
    const fortuneMessages = omikujiData[randomType]
    const randomMessage = fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)]
    
    setCurrentFortune({
      type: randomType,
      message: randomMessage.message,
      imageUrl: randomMessage.imageUrl
    })

    // 筒の回転アニメーション（5秒間）
    if (cylinderRef.current) {
      await new Promise(resolve => {
        gsap.to(cylinderRef.current, {
          rotation: 360 * 5, // 5回転
          duration: 3,
          ease: "power2.out",
          onComplete: resolve
        })
      })

      // 筒の反転アニメーション
      await new Promise(resolve => {
        gsap.to(cylinderRef.current, {
          rotationX: 180,
          duration: 1,
          ease: "power2.inOut",
          onComplete: resolve
        })
      })
    }

    // 1秒待って紙を表示
    setTimeout(() => {
      setShowResult(true)
      setIsAnimating(false)
    }, 1000)
  }, [isAnimating])

  const resetOmikuji = useCallback(() => {
    setShowResult(false)
    setCurrentFortune(null)
    
    if (cylinderRef.current) {
      gsap.set(cylinderRef.current, { rotation: 0, rotationX: 0 })
    }
  }, [])

  const shareResult = useCallback(() => {
    if (!currentFortune) return

    const shareText = `おみくじを引きました！結果は「${currentFortune.type}」です✨\n\n${currentFortune.message}\n\n#おみくじ #運勢 #今日の運勢`
    
    if (navigator.share) {
      navigator.share({
        title: 'おみくじ結果',
        text: shareText,
        url: window.location.href
      })
    } else {
      // フォールバック: クリップボードにコピー
      navigator.clipboard.writeText(shareText).then(() => {
        alert('結果をクリップボードにコピーしました！')
      })
    }
  }, [currentFortune])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      {/* タイトル */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
          おみくじ
        </h1>
        <p className="text-lg md:text-xl text-amber-100 drop-shadow-md">
          六角の筒から運勢を占おう
        </p>
      </motion.div>

      {/* おみくじ筒 */}
      <div className="relative mb-8">
        <OmikujiCylinder 
          ref={cylinderRef}
          isAnimating={isAnimating}
        />
      </div>

      {/* 結果表示 */}
      <AnimatePresence>
        {showResult && currentFortune && (
          <OmikujiResult 
            fortune={currentFortune}
            onShare={shareResult}
            onReset={resetOmikuji}
          />
        )}
      </AnimatePresence>

      {/* コントロールボタン */}
      <div className="flex flex-col items-center space-y-4">
        {!showResult && (
          <motion.button
            onClick={drawOmikuji}
            disabled={isAnimating}
            className={`px-10 py-3 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
              isAnimating 
                ? 'bg-slate-600 cursor-not-allowed text-slate-300' 
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl border-2 border-amber-300/30'
            }`}
            whileHover={{ scale: isAnimating ? 1 : 1.05 }}
            whileTap={{ scale: isAnimating ? 1 : 0.95 }}
          >
            {isAnimating ? '運勢を占い中...' : 'おみくじを引く'}
          </motion.button>
        )}

        {showResult && (
          <div className="flex space-x-4">
            <motion.button
              onClick={resetOmikuji}
              className="flex items-center space-x-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-600 rounded-full transition-colors duration-300 border border-emerald-500/50 text-emerald-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={20} />
              <span>もう一度</span>
            </motion.button>

            <motion.button
              onClick={shareResult}
              className="flex items-center space-x-2 px-6 py-3 bg-amber-700 hover:bg-amber-600 rounded-full transition-colors duration-300 border border-amber-500/50 text-amber-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} />
              <span>共有</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* フッター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 text-center text-sm text-amber-200/70"
      >
        <p>筒を回して運勢を占う、伝統的なおみくじ体験</p>
      </motion.div>
    </div>
  )
}

export default OmikujiApp