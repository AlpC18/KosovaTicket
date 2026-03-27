import { Search, X, MapPin, Clock, ArrowRight, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const popularRoutes = [
    { from: 'Prishtina', to: 'Prizren', duration: '1h 30min', price: '€5.00', frequency: 'Every 30 min' },
    { from: 'Prishtina', to: 'Peja', duration: '1h 45min', price: '€6.00', frequency: 'Every hour' },
    { from: 'Prishtina', to: 'Gjilan', duration: '50min', price: '€4.00', frequency: 'Every 45 min' },
    { from: 'Prishtina', to: 'Gjakova', duration: '1h 20min', price: '€5.50', frequency: 'Every hour' },
    { from: 'Prizren', to: 'Peja', duration: '2h 10min', price: '€8.00', frequency: '4× daily' },
]

const recentSearches = ['Prishtina → Prizren', 'Sunny Hill Festival', 'National Theatre']

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [focused, setFocused] = useState(false)
    const navigate = useNavigate()

    const filtered = popularRoutes.filter(r =>
        `${r.from} ${r.to}`.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232]">
            {/* Search bar */}
            <div className="sticky top-0 z-20 bg-[#1F2232] px-4 pt-4 pb-3 border-b border-gray-800">
                <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${focused ? 'bg-[#2A2D40] ring-2 ring-yellow-500/30' : 'bg-[#2A2D40]'}`}>
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />
                    <input
                        className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
                        placeholder="Search routes, events, cities..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        autoFocus
                    />
                    {query.length > 0 && (
                        <button onClick={() => setQuery('')} className="text-gray-500 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Filters Row */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                    {['All', 'Bus', 'Events', 'Today'].map(f => (
                        <button key={f} className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-colors ${f === 'All' ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                            {f}
                        </button>
                    ))}
                    <button className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border border-gray-700 text-gray-400 flex items-center gap-1.5 hover:border-gray-500 transition-colors">
                        <SlidersHorizontal className="w-3.5 h-3.5" /> More Filters
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-28 p-4 space-y-6">
                {/* Recent Searches — shown when not actively filtering */}
                {query.length === 0 && (
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Recent Searches</h3>
                        <div className="space-y-2">
                            {recentSearches.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setQuery(s.split('→')[0].trim())}
                                    className="w-full flex items-center gap-3 p-3 bg-[#1A1D2D] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group"
                                >
                                    <Clock className="w-4 h-4 text-gray-500 group-hover:text-yellow-500 transition-colors" />
                                    <span className="text-sm text-gray-300">{s}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Route Results */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
                        {query.length > 0 ? `Results for "${query}"` : 'Popular Routes'}
                    </h3>
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
                            <Search className="w-12 h-12 mb-4 opacity-30" />
                            <p className="font-semibold">No routes found</p>
                            <p className="text-sm mt-1 opacity-70">Try a different city or keyword</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filtered.map((r, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate('/seat-selection')}
                                    className="w-full bg-[#1A1D2D] rounded-2xl p-4 border border-gray-800 hover:border-yellow-500/30 transition-all text-left group shadow-sm"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-white font-bold text-sm">{r.from}</span>
                                        <ArrowRight className="w-4 h-4 text-yellow-500" />
                                        <span className="text-white font-bold text-sm">{r.to}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.duration}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.frequency}</span>
                                        </div>
                                        <span className="text-yellow-500 font-bold text-sm">{r.price}</span>
                                    </div>
                                    <div className="mt-3 h-0.5 bg-gray-800 group-hover:bg-yellow-500/20 transition-colors rounded-full" />
                                    <div className="flex justify-end mt-2">
                                        <span className="text-xs text-gray-600 group-hover:text-yellow-500 transition-colors font-medium">Get tickets →</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
