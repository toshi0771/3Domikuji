import { FortuneType } from '../components/OmikujiApp'

interface OmikujiMessage {
  message: string
  imageUrl: string
}

export const omikujiData: Record<FortuneType, OmikujiMessage[]> = {
  '大吉': [
    {
      message: '素晴らしい一日となるでしょう。あなたの努力が実を結び、大きな幸運が訪れます。新しいことにも積極的に挑戦してみてください。',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: '運気が最高潮に達しています。今日始めることは全て良い結果をもたらすでしょう。自信を持って行動してください。',
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: 'あなたの周りに幸せが溢れています。感謝の気持ちを忘れずに、今日という日を大切に過ごしましょう。',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop&crop=center'
    }
  ],
  '中吉': [
    {
      message: '着実に前進する時期です。小さな幸せを大切にしながら、コツコツと努力を続けることで大きな成果を得られるでしょう。',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: '周りの人との関係が良好になる日です。協力し合うことで、思いもよらない良い出来事が起こりそうです。',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: '新しい学びや発見がありそうです。好奇心を大切にして、様々なことにアンテナを張って過ごしましょう。',
      imageUrl: 'https://images.unsplash.com/photo-1418065460487-3cd7e30b6b6b?w=400&h=400&fit=crop&crop=center'
    }
  ],
  '小吉': [
    {
      message: '小さな幸せが訪れる予感です。日常の中にある美しいものに目を向けて、心豊かに過ごしましょう。',
      imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: 'ゆっくりと、でも確実に物事が良い方向に向かっています。焦らず、自分のペースを大切にしてください。',
      imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: '思いやりの心が幸運を呼びます。身近な人への優しさを忘れずに、温かい一日をお過ごしください。',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center'
    }
  ],
  '凶': [
    {
      message: '今は忍耐の時です。困難な状況も必ず好転します。今日は無理をせず、体調管理を第一に考えましょう。',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: '慎重に行動することが大切です。急がず、一歩一歩確実に前進すれば、きっと道は開けるでしょう。',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center'
    },
    {
      message: '今日は学びの日と捉えましょう。様々な経験が、将来のあなたにとって大きな財産となるはずです。',
      imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop&crop=center'
    }
  ]
}