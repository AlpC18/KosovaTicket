import { MapPin, Navigation, BusFront, Ticket, Coffee, Clock } from 'lucide-react'
import { useState } from 'react'

const mapPoints = [
    { id: 1, type: 'stop', label: 'Stacioni Qendror', x: 46, y: 62, icon: BusFront },
    { id: 2, type: 'stop', label: 'Stacioni Rilindja', x: 60, y: 40, icon: BusFront },
    { id: 3, type: 'event', label: 'Sunny Hill', x: 75, y: 25, icon: Ticket },
    { id: 4, type: 'event', label: 'National Theatre', x: 50, y: 52, icon: Ticket },
    { id: 5, type: 'cafe', label: 'Gjirafa Cafe', x: 30, y: 45, icon: Coffee },
]

const filterTabs = [
    { label: 'Bus Stops', icon: BusFront, type: 'stop' },
    { label: 'Events', icon: Ticket, type: 'event' },
    { label: 'Services', icon: Coffee, type: 'cafe' },
]

export default function MapPage() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null)
    const [selected, setSelected] = useState<number | null>(null)

    const visible = activeFilter
        ? mapPoints.filter(p => p.type === activeFilter)
        : mapPoints

    const selectedPoint = mapPoints.find(p => p.id === selected)

    return (
        <div className="flex flex-col h-full bg-[#1F2232]">
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-800">
                <h1 className="text-xl font-bold text-white">Kosovo Map</h1>
                <p className="text-xs text-gray-500 mt-0.5">Browse bus stops, venues & services</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 px-4 py-3 border-b border-gray-800 overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setActiveFilter(null)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${!activeFilter ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
                >
                    All
                </button>
                {filterTabs.map(f => {
                    const Icon = f.icon
                    return (
                        <button
                            key={f.type}
                            onClick={() => setActiveFilter(activeFilter === f.type ? null : f.type)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border flex items-center gap-1.5 transition-all ${activeFilter === f.type ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
                        >
                            <Icon className="w-3.5 h-3.5" /> {f.label}
                        </button>
                    )
                })}
            </div>

            {/* Map Area */}
            <div className="flex-1 relative overflow-hidden">
                {/* Simulated dark map */}
                <div className="absolute inset-0 bg-[#12151f]">
                    {/* Grid lines to simulate a map */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6C7293" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    {/* Roads */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#252840" strokeWidth="8" />
                        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#252840" strokeWidth="8" />
                        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#1E2235" strokeWidth="5" />
                        <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="#1E2235" strokeWidth="5" />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#3A3F58" fontSize="72" fontWeight="bold" className="select-none">PRISHTINA</text>
                    </svg>

                    {/* Map Pins */}
                    {visible.map(point => {
                        const Icon = point.icon
                        const isSelected = selected === point.id
                        const colorMap = {
                            stop: isSelected ? 'bg-blue-500 border-blue-300' : 'bg-blue-600/80 border-blue-500',
                            event: isSelected ? 'bg-yellow-500 border-yellow-300' : 'bg-yellow-600/80 border-yellow-500',
                            cafe: isSelected ? 'bg-pink-500 border-pink-300' : 'bg-pink-600/80 border-pink-500',
                        } as const

                        return (
                            <button
                                key={point.id}
                                onClick={() => setSelected(isSelected ? null : point.id)}
                                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20`}
                            >
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg transition-all ${colorMap[point.type as keyof typeof colorMap]} ${isSelected ? 'scale-125 shadow-2xl' : 'hover:scale-110'}`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                {isSelected && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap shadow-xl">
                                        {point.label}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                                    </div>
                                )}
                            </button>
                        )
                    })}

                    {/* My Location */}
                    <div className="absolute" style={{ left: '55%', top: '55%' }}>
                        <div className="w-5 h-5 bg-blue-400 rounded-full border-2 border-white shadow-lg">
                            <div className="absolute inset-0.5 bg-blue-400 rounded-full animate-ping opacity-60" />
                        </div>
                    </div>
                </div>

                {/* Current Location button */}
                <button className="absolute top-4 right-4 bg-[#2A2D40] border border-gray-700 p-3 rounded-xl shadow-xl hover:bg-[#32364c] transition-colors z-30">
                    <Navigation className="w-5 h-5 text-yellow-500" />
                </button>

                {/* Bottom sheet - point info */}
                {selectedPoint && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#1A1D2D] border-t border-gray-700 px-5 py-5 rounded-t-3xl shadow-2xl z-30 animate-in slide-in-from-bottom">
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedPoint.type === 'stop' ? 'bg-blue-500/20 text-blue-400' :
                                    selectedPoint.type === 'event' ? 'bg-yellow-500/20 text-yellow-500' :
                                        'bg-pink-500/20 text-pink-400'
                                }`}>
                                {(() => { const I = selectedPoint.icon; return <I className="w-6 h-6" />; })()}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white text-base">{selectedPoint.label}</h3>
                                <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> Prishtina City Centre
                                </p>
                                <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Opens 06:00 — 22:00
                                </p>
                            </div>
                            <button className="text-yellow-500 text-sm font-bold border border-yellow-500/30 px-3 py-1.5 rounded-xl hover:bg-yellow-500/10 transition-colors">
                                Go →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
