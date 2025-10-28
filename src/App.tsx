import OmikujiApp from './components/OmikujiApp'

function App() {
  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1676524122134-78d9cad3d861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080)',
      }}
    >
      {/* 軽いオーバーレイで明るさを保ちつつ、神社らしい神聖な雰囲気を演出 */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-slate-800/50 to-orange-900/45"></div>
      <div className="relative z-10">
        <OmikujiApp />
      </div>
    </div>
  )
}

export default App