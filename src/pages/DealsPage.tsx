import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame, Clock, Zap, Tag, ArrowRight, Star } from 'lucide-react'

type Deal = {
    id: number
    tag: string
    title: string
    sub: string
    originalPrice: string
    salePrice: string
    discount: number
    endsIn: number // seconds
    img: string
    hot: boolean
}

const deals: Deal[] = [
    {
        id: 1, tag: '🚌 Bus', title: 'Prishtina → Prizren', sub: 'KosovoPass Express · Any departure today',
        originalPrice: '€5.00', salePrice: '€2.50', discount: 50,
        endsIn: 3600, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400', hot: true,
    },
    {
        id: 2, tag: '🎫 Event', title: 'Dokufest Night Cinema', sub: 'Prizren Old Town · Aug 6, 21:00',
        originalPrice: '€12.00', salePrice: '€7.00', discount: 42,
        endsIn: 7200, img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400', hot: false,
    },
    {
        id: 3, tag: '🚌 Bus', title: 'Prishtina → Peja', sub: 'Dukagjini Lines · Weekend only',
        originalPrice: '€6.00', salePrice: '€3.50', discount: 42,
        endsIn: 14400, img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', hot: false,
    },
    {
        id: 4, tag: '🎭 Theater', title: 'National Theatre Gala', sub: 'Prishtina · Oct 30 · Premium seats',
        originalPrice: '€25.00', salePrice: '€15.00', discount: 40,
        endsIn: 28800, img: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=400', hot: true,
    },
    {
        id: 5, tag: '🎵 Concert', title: 'Noizy Live in Gjilan', sub: 'Arena Gjilan · Nov 2 · Standing',
        originalPrice: '€20.00', salePrice: '€13.00', discount: 35,
        endsIn: 86400, img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=400', hot: false,
    },
]

function Countdown({ secs }: { secs: number }) {
    const [remaining, setRemaining] = useState(secs)
    useEffect(() => {
        const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000)
        return () => clearInterval(id)
    }, [])
    const h = Math.floor(remaining / 3600)
    const m = Math.floor((remaining % 3600) / 60)
    const s = remaining % 60
    const fmt = (n: number) => String(n).padStart(2, '0')
    return (
        <div className="flex items-center gap-1 text-yellow-400 font-mono font-black text-sm">
            <Clock className="w-3.5 h-3.5" />
            {h > 0 && <span>{fmt(h)}h </span>}
            <span>{fmt(m)}m </span>
            <span>{fmt(s)}s</span>
        </div>
    )
}

export default function DealsPage() {
    const navigate = useNavigate()
    const [filter, setFilter] = useState('All')
    const filters = ['All', '🚌 Bus', '🎫 Event', '🎭 Theater', '🎵 Concert']

    const filtered = deals.filter(d => filter === 'All' || d.tag === filter)
    const hotDeals = filtered.filter(d => d.hot)
    const otherDeals = filtered.filter(d => !d.hot)

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            {/* Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-900/60 via-orange-900/40 to-[#1F2232] px-5 py-6 border-b border-red-800/30">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                        <Flame className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-2">Flash Deals <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" /></h1>
                        <p className="text-red-300/80 text-xs mt-0.5">Limited time offers — grab before they expire</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-gray-800">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${filter === f ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-600'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="p-4 space-y-5">
                {/* Hot Deals */}
                {hotDeals.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Flame className="w-3.5 h-3.5" /> Hot Right Now</h2>
                        {hotDeals.map(deal => (
                            <button
                                key={deal.id}
                                onClick={() => navigate('/seat-selection')}
                                className="w-full mb-3 relative rounded-3xl overflow-hidden group"
                            >
                                <img src={deal.img} alt={deal.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                                {/* Discount badge */}
                                <div className="absolute top-3 right-3 bg-red-500 text-white font-black text-sm px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5" /> -{deal.discount}%
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{deal.tag}</span>
                                    <h3 className="text-xl font-black text-white leading-tight">{deal.title}</h3>
                                    <p className="text-gray-400 text-xs mt-0.5 mb-3">{deal.sub}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-gray-500 line-through text-sm mr-2">{deal.originalPrice}</span>
                                            <span className="text-yellow-400 font-black text-2xl">{deal.salePrice}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <Countdown secs={deal.endsIn} />
                                            <div className="bg-yellow-500 text-black text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1">
                                                Get Deal <ArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Other Deals */}
                {otherDeals.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Star className="w-3.5 h-3.5 text-yellow-500" /> More Deals</h2>
                        <div className="space-y-3">
                            {otherDeals.map(deal => (
                                <button
                                    key={deal.id}
                                    onClick={() => navigate('/seat-selection')}
                                    className="w-full flex bg-[#1A1D2D] rounded-2xl border border-gray-800 overflow-hidden hover:border-yellow-500/30 transition-all group text-left"
                                >
                                    <img src={deal.img} alt={deal.title} className="w-24 h-24 object-cover shrink-0 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="flex-1 p-3.5 flex flex-col justify-between">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">{deal.tag}</p>
                                            <h3 className="font-bold text-white text-sm leading-tight mt-0.5">{deal.title}</h3>
                                            <p className="text-gray-600 text-xs mt-0.5 line-clamp-1">{deal.sub}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-600 line-through text-xs">{deal.originalPrice}</span>
                                                <span className="text-yellow-400 font-black text-base">{deal.salePrice}</span>
                                                <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded-lg">-{deal.discount}%</span>
                                            </div>
                                            <Countdown secs={deal.endsIn} />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
