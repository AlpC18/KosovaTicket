import { Heart, Trash2, BusFront, Ticket, Calendar, MapPin } from 'lucide-react'
import { useState } from 'react'

type FavItem = {
    id: number
    type: 'event' | 'route'
    title: string
    sub: string
    img: string
    extra: string
}

const initial: FavItem[] = [
    {
        id: 1, type: 'event', title: 'Sunny Hill Festival 2024', sub: 'Gërmia Park, Prishtina',
        img: 'https://images.unsplash.com/photo-1540039155733-25f1c7566270?auto=format&fit=crop&q=80&w=400',
        extra: 'Aug 1–4 · From €50',
    },
    {
        id: 2, type: 'event', title: 'National Theatre: Hamlet', sub: 'Prishtina',
        img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=400',
        extra: 'Aug 10 · €15',
    },
    {
        id: 3, type: 'route', title: 'Prishtina → Prizren', sub: 'KosovoPass Express',
        img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
        extra: 'Every 30 min · €5.00',
    },
    {
        id: 4, type: 'route', title: 'Prishtina → Peja', sub: 'Dukagjini Lines',
        img: 'https://images.unsplash.com/photo-1629807406208-d2243d94ed68?auto=format&fit=crop&q=80&w=400',
        extra: 'Every hour · €6.00',
    },
]

export default function SavedPage() {
    const [items, setItems] = useState<FavItem[]>(initial)
    const [activeTab, setActiveTab] = useState<'all' | 'events' | 'routes'>('all')

    const filtered = items.filter(i =>
        activeTab === 'all' ? true : activeTab === 'events' ? i.type === 'event' : i.type === 'route'
    )

    const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232]">
            {/* Header */}
            <div className="px-4 pt-5 pb-3">
                <h1 className="text-2xl font-black text-white">Saved</h1>
                <p className="text-gray-500 text-sm mt-0.5">{items.length} items saved</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-4 pb-3">
                {(['all', 'events', 'routes'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize border transition-all ${activeTab === tab ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="flex-1 px-4 pb-28 space-y-3">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <Heart className="w-14 h-14 opacity-20 mb-4" />
                        <p className="font-semibold">Nothing saved yet</p>
                        <p className="text-sm mt-1 opacity-60">Tap the heart icon to save items</p>
                    </div>
                ) : (
                    filtered.map(item => (
                        <div
                            key={item.id}
                            className="bg-[#1A1D2D] rounded-2xl overflow-hidden border border-gray-800 flex hover:border-gray-700 transition-colors group"
                        >
                            {/* Image */}
                            <div className="w-24 h-24 shrink-0 relative">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className={`absolute top-2 left-2 w-6 h-6 rounded-lg flex items-center justify-center ${item.type === 'event' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                    {item.type === 'event' ? <Ticket className="w-3.5 h-3.5" /> : <BusFront className="w-3.5 h-3.5" />}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 p-3 flex flex-col justify-center">
                                <h3 className="font-bold text-white text-sm leading-tight">{item.title}</h3>
                                <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {item.sub}
                                </p>
                                <p className="text-yellow-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-gray-500" />
                                    <span className="text-gray-400">{item.extra}</span>
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col items-center justify-center gap-2 px-3 border-l border-gray-800">
                                <button className="text-red-400 hover:text-red-300 transition-colors p-1">
                                    <Heart className="w-4 h-4 fill-red-400" />
                                </button>
                                <button
                                    onClick={() => remove(item.id)}
                                    className="text-gray-600 hover:text-red-400 transition-colors p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
