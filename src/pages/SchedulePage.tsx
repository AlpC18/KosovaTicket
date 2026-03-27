import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RefreshCw, Users, Wifi, Zap } from 'lucide-react'

const cities = ['Prishtina', 'Prizren', 'Peja', 'Gjilan', 'Gjakova', 'Mitrovica', 'Ferizaj']

const departures = [
    { time: '06:30', arrives: '08:00', company: 'KosovoPass Express', seats: 18, avail: true, price: '€5.00', amenities: ['wifi', 'power'] },
    { time: '07:00', arrives: '08:30', company: 'Dukagjini Lines', seats: 4, avail: true, price: '€4.50', amenities: ['wifi'] },
    { time: '07:30', arrives: '09:00', company: 'Sharr Travel', seats: 0, avail: false, price: '€5.00', amenities: [] },
    { time: '08:00', arrives: '09:30', company: 'KosovoPass Express', seats: 32, avail: true, price: '€5.00', amenities: ['wifi', 'power'] },
    { time: '08:30', arrives: '10:00', company: 'Dukagjini Lines', seats: 12, avail: true, price: '€4.50', amenities: ['wifi'] },
    { time: '09:00', arrives: '10:30', company: 'Sharr Travel', seats: 7, avail: true, price: '€4.00', amenities: [] },
    { time: '10:00', arrives: '11:30', company: 'KosovoPass Express', seats: 40, avail: true, price: '€5.00', amenities: ['wifi', 'power'] },
]

export default function SchedulePage() {
    const [from, setFrom] = useState('Prishtina')
    const [to, setTo] = useState('Prizren')
    const [date, setDate] = useState('2024-10-24')
    const navigate = useNavigate()

    const swap = () => { setFrom(to); setTo(from) }

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            {/* Route selector card */}
            <div className="bg-[#1A1D2D] mx-4 mt-5 rounded-3xl p-5 border border-gray-800 shadow-xl space-y-4">
                {/* From / To */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-3">
                        <div>
                            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">From</label>
                            <select
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                                className="w-full bg-[#161825] border border-gray-800 text-white rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-yellow-500 cursor-pointer"
                            >
                                {cities.filter(c => c !== to).map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">To</label>
                            <select
                                value={to}
                                onChange={e => setTo(e.target.value)}
                                className="w-full bg-[#161825] border border-gray-800 text-white rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-yellow-500 cursor-pointer"
                            >
                                {cities.filter(c => c !== from).map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={swap}
                        className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 hover:bg-yellow-500/20 transition-colors active:rotate-180 duration-300 shrink-0"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                {/* Date */}
                <div>
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full bg-[#161825] border border-gray-800 text-white rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-yellow-500 cursor-pointer"
                    />
                </div>
            </div>

            {/* Results heading */}
            <div className="flex items-center justify-between px-5 mt-6 mb-3">
                <div>
                    <h2 className="font-bold text-white">{from} <ArrowRight className="inline w-4 h-4 text-yellow-500" /> {to}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">{departures.filter(d => d.avail).length} departures available</p>
                </div>
            </div>

            {/* Departure list */}
            <div className="px-4 space-y-3">
                {departures.map((d, i) => (
                    <div
                        key={i}
                        onClick={() => d.avail && navigate('/seat-selection')}
                        className={`bg-[#1A1D2D] rounded-2xl border p-4 transition-all ${d.avail ? 'border-gray-800 hover:border-yellow-500/30 cursor-pointer' : 'border-gray-800 opacity-50 cursor-not-allowed'}`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="text-center">
                                    <p className="text-white font-black text-lg leading-none">{d.time}</p>
                                    <p className="text-gray-600 text-[10px] mt-0.5">{from.slice(0, 3).toUpperCase()}</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 px-3">
                                    <div className="h-px w-12 bg-gray-700 relative">
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full" />
                                    </div>
                                    <span className="text-[9px] text-gray-600 font-medium">1h 30m</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-black text-lg leading-none">{d.arrives}</p>
                                    <p className="text-gray-600 text-[10px] mt-0.5">{to.slice(0, 3).toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-yellow-500 font-black text-lg">{d.price}</p>
                                {!d.avail && <span className="text-[10px] text-red-400 font-bold uppercase">Sold Out</span>}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <p className="text-xs text-gray-500">{d.company}</p>
                                <div className="flex gap-1.5">
                                    {d.amenities.includes('wifi') && <Wifi className="w-3.5 h-3.5 text-blue-400" />}
                                    {d.amenities.includes('power') && <Zap className="w-3.5 h-3.5 text-yellow-400" />}
                                </div>
                            </div>
                            {d.avail && (
                                <span className={`text-xs font-bold flex items-center gap-1 ${d.seats <= 5 ? 'text-red-400' : 'text-green-400'}`}>
                                    <Users className="w-3.5 h-3.5" />
                                    {d.seats <= 5 ? `${d.seats} left!` : `${d.seats} seats`}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
