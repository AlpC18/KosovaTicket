import { useState, useEffect } from 'react'
import { Clock, MapPin, BusFront, Wifi, Zap, Phone } from 'lucide-react'

type Stop = { name: string; eta: string; passed: boolean }

const stops: Stop[] = [
    { name: 'Stacioni Qendror, Prishtina', eta: 'Departed 10:30', passed: true },
    { name: 'Fushe Kosovë', eta: 'Departed 10:52', passed: true },
    { name: 'Lypjan', eta: 'Departed 11:08', passed: true },
    { name: 'Shtime', eta: 'ETA 11:22', passed: false },
    { name: 'Ferizaj', eta: 'ETA 11:38', passed: false },
    { name: 'Suhareka', eta: 'ETA 11:55', passed: false },
    { name: 'Stacioni Kryesor, Prizren', eta: 'ETA 12:10', passed: false },
]

const BUS_ICON = '🚌'

export default function LiveTrackingPage() {
    const [busX, setBusX] = useState(40)
    const [busY, setBusY] = useState(60)
    const [eta, setEta] = useState(87)

    // Animate bus position slowly
    useEffect(() => {
        const id = setInterval(() => {
            setBusX(x => Math.min(75, x + 0.15))
            setBusY(y => Math.max(30, y - 0.05))
            setEta(e => Math.max(0, e - 0.02))
        }, 300)
        return () => clearInterval(id)
    }, [])

    const etaMin = Math.floor(eta)

    return (
        <div className="flex flex-col h-full bg-[#1F2232]">
            {/* Map */}
            <div className="flex-1 relative overflow-hidden bg-[#12151f]">
                {/* Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                        <pattern id="grid2" width="36" height="36" patternUnits="userSpaceOnUse">
                            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#6C7293" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid2)" />
                </svg>

                {/* Roads */}
                <svg className="absolute inset-0 w-full h-full">
                    {/* Main road */}
                    <path d="M 15% 85% Q 45% 55% 80% 25%" stroke="#2A2D40" strokeWidth="10" fill="none" strokeLinecap="round" />
                    <path d="M 15% 85% Q 45% 55% 80% 25%" stroke="#1E2133" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray="4 8" />
                    {/* Side roads */}
                    <path d="M 30% 40% L 60% 70%" stroke="#1E2133" strokeWidth="5" fill="none" />
                    <path d="M 60% 30% L 80% 50%" stroke="#1E2133" strokeWidth="4" fill="none" />
                    <text x="50%" y="55%" textAnchor="middle" fill="#2A2D40" fontSize="56" fontWeight="bold" className="select-none">KOSOVO</text>
                </svg>

                {/* Stop markers along route */}
                {[
                    { x: 18, y: 82 },
                    { x: 28, y: 72 },
                    { x: 36, y: 64 },
                    { x: 46, y: 55 },
                    { x: 56, y: 47 },
                    { x: 66, y: 38 },
                    { x: 77, y: 28 },
                ].map((pos, i) => (
                    <div
                        key={i}
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${stops[i].passed ? 'bg-yellow-500 border-yellow-300' : 'bg-gray-700 border-gray-600'}`}
                    />
                ))}

                {/* Bus position */}
                <div
                    style={{ left: `${busX}%`, top: `${busY}%`, transition: 'left 0.3s linear, top 0.3s linear' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                    {/* Pulse */}
                    <div className="absolute inset-0 w-10 h-10 bg-yellow-500/20 rounded-full animate-ping -m-1" />
                    <div className="w-8 h-8 bg-yellow-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.5)] border-2 border-yellow-300 text-base">
                        {BUS_ICON}
                    </div>
                </div>

                {/* Destination pin */}
                <div style={{ left: '77%', top: '28%' }} className="absolute -translate-x-1/2 -translate-y-full z-20">
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-xl shadow-xl flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Prizren
                    </div>
                </div>

                {/* ETA badge */}
                <div className="absolute top-4 left-4 right-4 z-30">
                    <div className="bg-[#1A1D2D]/95 backdrop-blur border border-gray-700 rounded-2xl p-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Bus is on the way</span>
                            </div>
                            <span className="text-gray-500 text-xs font-mono">Line 402</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-gray-500 text-xs">Arriving in</p>
                                <p className="text-white font-black text-3xl">{etaMin}<span className="text-gray-500 font-normal text-base ml-1">min</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs">Next stop</p>
                                <p className="text-white text-sm font-bold">Shtime</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenity badges */}
                <div className="absolute bottom-4 left-4 flex gap-2 z-30">
                    <div className="bg-[#1A1D2D]/80 backdrop-blur border border-gray-700 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                        <Wifi className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs text-white font-medium">WiFi Active</span>
                    </div>
                    <div className="bg-[#1A1D2D]/80 backdrop-blur border border-gray-700 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-xs text-white font-medium">Outlets</span>
                    </div>
                </div>
            </div>

            {/* Bottom sheet */}
            <div className="bg-[#1A1D2D] border-t border-gray-700 px-4 pt-4 pb-24 shadow-2xl flex flex-col gap-4">
                {/* Trip info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500/15 rounded-xl flex items-center justify-center text-yellow-500">
                            <BusFront className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">Prishtina → Prizren</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                                <Clock className="w-3 h-3" /> Departed 10:30 · Seat 2A
                            </p>
                        </div>
                    </div>
                    <button className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-yellow-500 transition-colors">
                        <Phone className="w-4 h-4" />
                    </button>
                </div>

                {/* Stop progress */}
                <div className="space-y-2.5">
                    {stops.slice(2, 5).map((stop, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${stop.passed ? 'bg-yellow-500' : i === 0 ? 'bg-yellow-500/40 ring-2 ring-yellow-500/20' : 'bg-gray-700'}`} />
                            <p className={`text-sm flex-1 ${stop.passed ? 'text-gray-500 line-through' : i === 0 ? 'text-white font-bold' : 'text-gray-400'}`}>{stop.name}</p>
                            <span className={`text-xs font-medium tabular-nums ${stop.passed ? 'text-gray-600' : i === 0 ? 'text-yellow-500' : 'text-gray-600'}`}>{stop.eta}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
