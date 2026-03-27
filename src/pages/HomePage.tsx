import { Search, Map, ChevronRight, SlidersHorizontal, Heart, Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const categories = [
    { label: 'All', emoji: '🎟', active: true },
    { label: 'Concerts', emoji: '🎵', active: false },
    { label: 'Theater', emoji: '🎭', active: false },
    { label: 'Bus Routes', emoji: '🚌', active: false },
    { label: 'Sports', emoji: '⚽', active: false },
]

const nearbyItems = [
    {
        title: 'National Theatre: Hamlet',
        sub: 'Prishtina • €15.00',
        img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=400',
        liked: true,
        route: '/seat-selection',
    },
    {
        title: 'Prishtina – Prizren',
        sub: 'Every 30 min • €5.00',
        img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
        liked: false,
        route: '/seat-selection',
    },
]

export default function HomePage() {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div className="p-4 space-y-6 pb-4">
            {/* Greeting */}
            <div>
                <h1 className="text-3xl font-black text-white">
                    {t('greeting')} <span>👋</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">{t('where_going')}</p>
            </div>

            {/* Search Bar */}
            <button
                onClick={() => navigate('/search')}
                className="w-full flex items-center bg-[#2A2D40] hover:bg-[#32364c] transition-colors rounded-2xl px-4 py-3.5 border border-gray-800 group"
            >
                <Search className="text-gray-500 w-5 h-5 mr-3 group-hover:text-yellow-500 transition-colors" />
                <span className="flex-1 text-left text-gray-500 text-sm">{t('search_placeholder')}</span>
                <SlidersHorizontal className="text-gray-600 w-5 h-5 ml-3" />
            </button>

            {/* Categories */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map(c => (
                    <button
                        key={c.label}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap border transition-all ${c.active
                            ? 'bg-[#2A2D40] text-white border-gray-700 shadow-sm'
                            : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-700'
                            }`}
                    >
                        <span>{c.emoji}</span> {c.label}
                    </button>
                ))}
            </div>

            {/* Featured Event */}
            <div
                className="relative rounded-3xl overflow-hidden h-52 cursor-pointer group"
                onClick={() => navigate('/discover')}
            >
                <img
                    src="https://images.unsplash.com/photo-1540039155733-25f1c7566270?auto=format&fit=crop&q=80&w=800"
                    alt="Sunny Hill Festival"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <Badge className="self-start bg-black/60 backdrop-blur-sm text-yellow-500 text-[10px] uppercase tracking-[0.2em] border border-yellow-500/30 px-3">
                        ⭐ Featured Event
                    </Badge>
                    <div>
                        <h2 className="text-2xl font-black text-white mb-2 leading-tight">Sunny Hill Festival 2024</h2>
                        <div className="flex items-center gap-4 text-xs text-gray-300">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Aug 1–4</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Gërmia Park, Prishtina</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-yellow-400 font-bold">From €50.00</span>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors">
                                Get Tickets <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Near You */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">{t('popular_near_you')}</h3>
                    <button onClick={() => navigate('/discover')} className="text-yellow-500 text-sm font-bold hover:text-yellow-400 transition-colors">
                        {t('see_all')}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {nearbyItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(item.route)}
                            className="bg-[#1A1D2D] rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/30 transition-all text-left group shadow-sm"
                        >
                            <div className="relative h-28 overflow-hidden">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                {item.liked && (
                                    <button className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur rounded-lg">
                                        <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                                    </button>
                                )}
                            </div>
                            <div className="p-3">
                                <h4 className="font-bold text-white text-xs leading-tight mb-1 line-clamp-2">{item.title}</h4>
                                <p className="text-xs text-gray-500">{item.sub}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => navigate('/map')}
                    className="bg-[#1A1D2D] hover:bg-[#22253a] transition-colors rounded-2xl p-4 flex items-center gap-3 border border-gray-800 hover:border-yellow-500/30 group"
                >
                    <div className="bg-[#2A2D40] p-2.5 rounded-xl text-yellow-500 group-hover:scale-110 transition-transform">
                        <Map className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-white text-sm">{t('explore_map')}</h4>
                        <p className="text-xs text-gray-500">{t('explore_map_desc')}</p>
                    </div>
                </button>

                <button
                    onClick={() => navigate('/onboarding')}
                    className="bg-gradient-to-br from-yellow-900/40 to-[#1A1D2D] hover:from-yellow-900/60 transition-colors rounded-2xl p-4 flex items-center gap-3 border border-yellow-800/30 hover:border-yellow-600/40 group"
                >
                    <div className="bg-yellow-500/20 p-2.5 rounded-xl text-yellow-400 group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-white text-sm">{t('get_premium')}</h4>
                        <p className="text-xs text-gray-500">{t('get_premium_desc')}</p>
                    </div>
                </button>
            </div>
        </div>
    )
}
