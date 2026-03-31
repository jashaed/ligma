import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Minimize2 } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              setSelectedGame(null);
              setSearchQuery('');
            }}
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              UnblockedHub
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedGame ? (
          <div className={`flex flex-col gap-4 animate-in fade-in duration-300 ${isFullScreen ? 'fixed inset-0 z-50 bg-black p-0' : ''}`}>
            <div className={`flex items-center justify-between ${isFullScreen ? 'absolute top-4 right-4 z-10' : ''}`}>
              {!isFullScreen && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-xl font-semibold">{selectedGame.title}</h2>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={toggleFullScreen}
                  className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors text-white backdrop-blur-sm"
                  title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                {isFullScreen && (
                  <button
                    onClick={() => {
                      setSelectedGame(null);
                      setIsFullScreen(false);
                    }}
                    className="p-2 bg-red-600/80 hover:bg-red-500 rounded-lg transition-colors text-white backdrop-blur-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className={`relative w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 ${isFullScreen ? 'h-full' : 'aspect-video'}`}>
              <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                allowFullScreen
                title={selectedGame.title}
                referrerPolicy="no-referrer"
              />
            </div>
            
            {!isFullScreen && (
              <div className="mt-4 p-6 bg-slate-800/30 rounded-xl border border-slate-700/30">
                <h3 className="text-lg font-medium mb-2">About {selectedGame.title}</h3>
                <p className="text-slate-400">
                  Enjoy playing {selectedGame.title} unblocked on our platform. 
                  If the game doesn't load, try refreshing the page or checking your connection.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Featured Games</h2>
              <p className="text-slate-400">Hand-picked classics for your break time.</p>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group relative bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
                  >
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors">
                        {game.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-1 bg-slate-700 rounded text-slate-300">
                          Unblocked
                        </span>
                        <span className="text-xs font-medium px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded">
                          Play Now
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-300">No games found</h3>
                <p className="text-slate-500 mt-2">Try searching for something else.</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-800 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2026 UnblockedHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
