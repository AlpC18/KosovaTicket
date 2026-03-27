import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Plus, Minus, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const routes = [
    { label: 'Prishtina → Prizren', price: 5 },
    { label: 'Prishtina → Peja', price: 6 },
    { label: 'Prishtina → Gjilan', price: 4 },
    { label: 'Prizren → Gjakova', price: 4.5 },
]

const dates = ['Oct 24', 'Oct 25', 'Oct 26', 'Oct 27', 'Oct 28']

const sampleMembers = ['Albin K.', 'Donika M.', 'Ares L.']

export default function GroupBookingPage() {
    const [count, setCount] = useState(3)
    const [route, setRoute] = useState(0)
    const [date, setDate] = useState(0)
    const [members, setMembers] = useState(sampleMembers)
    const [newMember, setNewMember] = useState('')
    const navigate = useNavigate()

    const selectedRoute = routes[route]
    const total = (count * selectedRoute.price).toFixed(2)
    const discount = count >= 5 ? 10 : count >= 3 ? 5 : 0
    const finalTotal = (parseFloat(total) * (1 - discount / 100)).toFixed(2)

    const addMember = () => {
        if (newMember.trim() && members.length < count) {
            setMembers(prev => [...prev, newMember.trim()])
            setNewMember('')
        }
    }

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-36">
            <div className="px-4 pt-5 pb-4">
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                    <Users className="w-6 h-6 text-yellow-500" /> Group Booking
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">Book for 2–8 people & save up to 10%</p>
            </div>

            <div className="px-4 space-y-5">
                {/* Step 1: Travelers */}
                <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">① Travelers</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Number of people</span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCount(c => Math.max(2, c - 1))}
                                className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors active:scale-90"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-yellow-500 font-black text-2xl w-8 text-center">{count}</span>
                            <button
                                onClick={() => setCount(c => Math.min(8, c + 1))}
                                className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors active:scale-90"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {discount > 0 && (
                        <div className="mt-3 bg-green-500/15 border border-green-500/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                            <span className="text-green-300 text-sm font-semibold">Group discount applied: <span className="font-black">{discount}% off!</span></span>
                        </div>
                    )}
                </div>

                {/* Step 2: Route */}
                <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">② Route</h2>
                    <div className="space-y-2">
                        {routes.map((r, i) => (
                            <button
                                key={i}
                                onClick={() => setRoute(i)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${route === i ? 'border-yellow-500 bg-yellow-900/10' : 'border-gray-800 hover:border-gray-700'}`}
                            >
                                <span className={`font-medium text-sm ${route === i ? 'text-white' : 'text-gray-400'}`}>{r.label}</span>
                                <span className={`font-bold text-sm ${route === i ? 'text-yellow-500' : 'text-gray-600'}`}>€{r.price}/pp</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 3: Date */}
                <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">③ Date</h2>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {dates.map((d, i) => (
                            <button
                                key={i}
                                onClick={() => setDate(i)}
                                className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm whitespace-nowrap transition-all ${date === i ? 'border-yellow-500 bg-yellow-500 text-black' : 'border-gray-800 text-gray-400 hover:border-gray-700'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 4: Passengers */}
                <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">④ Passengers ({members.length}/{count})</h2>
                    <div className="space-y-2 mb-3">
                        {members.map((m, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#161825] rounded-xl px-4 py-3 border border-gray-800">
                                <span className="text-white text-sm font-medium">{m}</span>
                                <button onClick={() => setMembers(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-600 hover:text-red-400 transition-colors">✕</button>
                            </div>
                        ))}
                    </div>
                    {members.length < count && (
                        <div className="flex gap-2">
                            <input
                                className="flex-1 bg-[#161825] border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-600"
                                placeholder="Enter passenger name..."
                                value={newMember}
                                onChange={e => setNewMember(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addMember()}
                            />
                            <button onClick={addMember} className="w-11 h-11 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 flex items-center justify-center hover:bg-yellow-500/30 transition-colors active:scale-95">
                                <UserPlus className="w-4.5 h-4.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#161825] border-t border-gray-800 p-4 z-20 space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{count} × €{selectedRoute.price} {discount > 0 && <span className="text-green-400">(-{discount}%)</span>}</span>
                    <span className="text-white font-black text-xl">€{finalTotal}</span>
                </div>
                <Button
                    onClick={() => navigate('/seat-selection')}
                    className="w-full h-13 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-base rounded-2xl flex items-center justify-center gap-2"
                >
                    Select Seats <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
