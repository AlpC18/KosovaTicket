import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Train, Plane, BusFront, Leaf, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cities = ['Prishtina', 'Prizren', 'Peja', 'Skopje (MK)', 'Tirana (AL)', 'Sarajevo (BA)', 'Belgrade (RS)']

type Mode = 'bus' | 'train' | 'flight'

type Journey = {
    mode: Mode
    operator: string
    duration: string
    price: string
    departs: string
    arrives: string
    co2: string
    transfers: number
    recommended?: boolean
}

const results: Journey[] = [
    { mode: 'bus', operator: 'KosovoPass Express', duration: '1h 30m', price: '€5', departs: '10:00', arrives: '11:30', co2: '1.2kg', transfers: 0, recommended: true },
    { mode: 'bus', operator: 'Dukagjini Lines', duration: '1h 45m', price: '€4', departs: '10:30', arrives: '12:15', co2: '1.2kg', transfers: 0 },
    { mode: 'train', operator: 'Trainkos', duration: '2h 10m', price: '€3', departs: '9:45', arrives: '11:55', co2: '0.4kg', transfers: 1 },
    { mode: 'flight', operator: 'Wizz Air', duration: '0h 45m', price: '€59', departs: '12:15', arrives: '13:00', co2: '18.5kg', transfers: 0 },
]

const modeIcon = { bus: BusFront, train: Train, flight: Plane } as const
const modeColor = { bus: 'text-blue-400 bg-blue-500/10', train: 'text-green-400 bg-green-500/10', flight: 'text-purple-400 bg-purple-500/10' } as const
const modeLabel = { bus: 'Bus', train: 'Train', flight: 'Flight' }

export default function JourneyPlannerPage() {
    const [from, setFrom] = useState('Prishtina')
    const [to, setTo] = useState('Prizren')
    const [date, setDate] = useState('2024-10-24')
    const [searched, setSearched] = useState(false)
    const [sortBy, setSortBy] = useState<'price' | 'duration' | 'eco'>('price')
    const navigate = useNavigate()

    const sorted = [...results].sort((a, b) => {
        if (sortBy === 'price') return parseInt(a.price.replace('€', '')) - parseInt(b.price.replace('€', ''))
        if (sortBy === 'duration') return a.duration.localeCompare(b.duration)
        if (sortBy === 'eco') return parseFloat(a.co2) - parseFloat(b.co2)
        return 0
    })

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            {/* Planner Form */}
            <div className="bg-[#1A1D2D] mx-4 mt-5 rounded-3xl p-5 border border-gray-800 shadow-xl space-y-4">
                <h2 className="text-white font-black text-lg">Journey Planner</h2>
                <p className="text-gray-500 text-xs -mt-2">Compare bus, train & flight options</p>

                <div className="space-y-3">
                    <div>
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">From</label>
                        <select value={from} onChange={e => setFrom(e.target.value)} className="w-full bg-[#161825] border border-gray-800 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-500">
                            {cities.filter(c => c !== to).map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">To</label>
                        <select value={to} onChange={e => setTo(e.target.value)} className="w-full bg-[#161825] border border-gray-800 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-500">
                            {cities.filter(c => c !== from).map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-[#161825] border border-gray-800 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-500" />
                    </div>
                </div>

                <Button onClick={() => setSearched(true)} className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl flex items-center justify-center gap-2">
                    Search All Options <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Results */}
            {searched && (
                <div className="px-4 mt-6">
                    {/* Sort pills */}
                    <div className="flex gap-2 mb-4">
                        {(['price', 'duration', 'eco'] as const).map(s => (
                            <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border capitalize transition-all ${sortBy === s ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-gray-700'}`}>
                                {s === 'eco' ? '🌿 Eco' : s === 'price' ? '💸 Price' : '⏱ Speed'}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        {sorted.map((j, i) => {
                            const Icon = modeIcon[j.mode]
                            const color = modeColor[j.mode]
                            return (
                                <button
                                    key={i}
                                    onClick={() => j.mode === 'bus' ? navigate('/seat-selection') : undefined}
                                    className={`w-full bg-[#1A1D2D] rounded-2xl border p-4 text-left transition-all group ${j.recommended ? 'border-yellow-500/40' : 'border-gray-800 hover:border-gray-700'}`}
                                >
                                    {j.recommended && (
                                        <div className="text-[9px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                                            ⭐ Recommended
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-bold text-sm">{modeLabel[j.mode]}</span>
                                                {j.transfers > 0 && <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{j.transfers} transfer</span>}
                                            </div>
                                            <p className="text-gray-500 text-xs mt-0.5">{j.operator}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-yellow-400 font-black text-xl">{j.price}</p>
                                            <p className="text-gray-600 text-xs">per person</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between bg-[#161825] rounded-xl px-3 py-2.5">
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {j.departs} → {j.arrives}</span>
                                            <span className="flex items-center gap-1 text-gray-600">|</span>
                                            <span className="font-medium text-gray-300">{j.duration}</span>
                                        </div>
                                        <span className={`flex items-center gap-1 text-xs font-semibold ${parseFloat(j.co2) < 5 ? 'text-green-400' : parseFloat(j.co2) < 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            <Leaf className="w-3 h-3" /> {j.co2} CO₂
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-end mt-3">
                                        <span className={`text-xs font-bold flex items-center gap-1 ${j.mode === 'bus' ? 'text-yellow-500 group-hover:text-yellow-400' : 'text-gray-500'}`}>
                                            {j.mode === 'bus' ? 'Select seats' : 'View on partner site'} <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
