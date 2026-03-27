import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star, Share2, Heart, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const lineup = [
    { name: 'Dua Lipa', type: 'Headliner', time: 'Aug 1 · 22:00' },
    { name: 'Era Istrefi', type: 'Special Guest', time: 'Aug 2 · 21:00' },
    { name: 'Noizy', type: 'Performer', time: 'Aug 3 · 20:00' },
    { name: 'Elina Born', type: 'Performer', time: 'Aug 4 · 19:00' },
]

const ticketTypes = [
    { label: 'Day Pass', price: '€50', sub: 'Access to 1 day' },
    { label: 'Full Festival', price: '€150', sub: 'All 4 days', popular: true },
    { label: 'VIP Pass', price: '€320', sub: 'Front stage + lounge' },
]

export default function EventDetailPage() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-32">

            {/* Hero */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1540039155733-25f1c7566270?auto=format&fit=crop&q=80&w=800"
                    alt="Sunny Hill Festival"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2232] via-black/40 to-transparent" />

                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-red-400 hover:bg-black/70 transition-colors">
                            <Heart className="w-4 h-4 fill-red-400" />
                        </button>
                    </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <Badge className="mb-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 border-none">⭐ TRENDING</Badge>
                    <h1 className="text-3xl font-black text-white leading-tight">Sunny Hill Festival 2024</h1>
                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                        <span className="text-gray-300 text-xs ml-1">4.9 · 2.4k reviews</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pt-5 space-y-6">

                {/* Key info row */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#1A1D2D] rounded-2xl p-3 flex flex-col items-center gap-1.5 border border-gray-800">
                        <Calendar className="w-5 h-5 text-yellow-500" />
                        <span className="text-white text-xs font-bold text-center leading-tight">Aug 1–4 2024</span>
                    </div>
                    <div className="bg-[#1A1D2D] rounded-2xl p-3 flex flex-col items-center gap-1.5 border border-gray-800">
                        <MapPin className="w-5 h-5 text-yellow-500" />
                        <span className="text-white text-xs font-bold text-center leading-tight">Gërmia Park, Prishtina</span>
                    </div>
                    <div className="bg-[#1A1D2D] rounded-2xl p-3 flex flex-col items-center gap-1.5 border border-gray-800">
                        <Users className="w-5 h-5 text-yellow-500" />
                        <span className="text-white text-xs font-bold text-center leading-tight">80,000+ Capacity</span>
                    </div>
                </div>

                {/* About */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-2">About</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Sunny Hill Festival is Kosovo's biggest music festival held annually in Prishtina. Founded by Dua Lipa and her father Dukagjin Lipa, this 4-day festival brings together world-class artists and celebrates Kosovo's vibrant culture.
                    </p>
                </div>

                {/* Lineup */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">Lineup</h2>
                    <div className="space-y-2">
                        {lineup.map((a, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#1A1D2D] rounded-xl px-4 py-3 border border-gray-800">
                                <div>
                                    <p className="text-white font-bold text-sm">{a.name}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">{a.type}</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" /> {a.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ticket Types */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">Choose Ticket</h2>
                    <div className="space-y-3">
                        {ticketTypes.map((t, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${t.popular ? 'border-yellow-500 bg-yellow-900/10' : 'border-gray-800 bg-[#1A1D2D] hover:border-gray-700'}`}
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-bold text-sm">{t.label}</span>
                                        {t.popular && <Badge className="text-[9px] bg-yellow-500 text-black border-none px-1.5 py-0 font-bold">BEST</Badge>}
                                    </div>
                                    <p className="text-gray-500 text-xs mt-0.5">{t.sub}</p>
                                </div>
                                <span className={`font-black text-lg ${t.popular ? 'text-yellow-400' : 'text-white'}`}>{t.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#161825]/95 backdrop-blur border-t border-gray-800 p-4 z-20">
                <Button
                    onClick={() => navigate('/seat-selection')}
                    className="w-full h-13 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-base rounded-2xl shadow-[0_4px_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
                >
                    <Ticket className="w-5 h-5" /> Buy Tickets · From €50
                </Button>
            </div>
        </div>
    )
}
