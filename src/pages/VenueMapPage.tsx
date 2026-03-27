import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Info } from 'lucide-react'

// Grid layout: A = aisle, _ = empty, numbers are seat IDs
type SeatStatus = 'available' | 'selected' | 'sold' | 'vip'

type Seat = { id: string; row: number; col: number; status: SeatStatus; price: number; label: string }

function buildSeats(): Seat[] {
    const seats: Seat[] = []
    const ROWS = 12
    const COLS = ['A', 'B', '_', 'C', 'D', 'E', '_', 'F', 'G']

    const soldIds = new Set(['1B', '2C', '3E', '4G', '5A', '6D', '7B', '8F', '9C', '10G'])
    const vipRows = new Set([1, 2])

    let id = 1
    for (let r = 1; r <= ROWS; r++) {
        let col = 0
        for (const c of COLS) {
            if (c === '_') { col++; continue }
            const seatId = `${r}${c}`
            const isVip = vipRows.has(r)
            const status: SeatStatus = soldIds.has(seatId) ? 'sold' : isVip ? 'vip' : 'available'
            seats.push({ id: seatId, row: r, col: col++, status, price: isVip ? 25 : 15, label: `Row ${r} · ${c}` })
            id++
        }
    }
    return seats
}

const seatConfig = { available: 'bg-gray-700 border-gray-600 hover:bg-green-600 hover:border-green-500', selected: 'bg-green-500 border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.5)]', sold: 'bg-gray-800 border-gray-800 opacity-40 cursor-not-allowed', vip: 'bg-yellow-900/40 border-yellow-700/60 hover:bg-yellow-500 hover:border-yellow-400' }
const seatText = { available: 'text-gray-400', selected: 'text-white font-black', sold: 'text-gray-700', vip: 'text-yellow-500' }

export default function VenueMapPage() {
    const [seats, setSeats] = useState<Seat[]>(buildSeats)
    const navigate = useNavigate()

    const toggleSeat = (id: string) => {
        setSeats(prev => prev.map(s => {
            if (s.id !== id || s.status === 'sold') return s
            return { ...s, status: s.status === 'selected' ? (s.row <= 2 ? 'vip' : 'available') : 'selected' }
        }))
    }

    const selected = seats.filter(s => s.status === 'selected')
    const total = selected.reduce((a, s) => a + s.price, 0)

    const ROWS = 12
    const COLS = ['A', 'B', '_', 'C', 'D', 'E', '_', 'F', 'G']

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-32">
            {/* Header */}
            <div className="bg-[#161825] px-4 py-3 flex items-center gap-3 border-b border-gray-800 sticky top-0 z-20">
                <button onClick={() => navigate(-1)} className="text-yellow-500 p-1.5 hover:bg-white/5 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <p className="text-white font-bold text-sm">National Theatre · Prishtina</p>
                    <p className="text-gray-500 text-xs">Hamlet · Oct 30</p>
                </div>
            </div>

            {/* Stage */}
            <div className="mx-4 mt-5 bg-gradient-to-b from-yellow-500/20 to-transparent border border-yellow-500/20 rounded-2xl flex items-center justify-center py-3">
                <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.3em]">🎭 Stage</span>
            </div>

            {/* Seat Grid */}
            <div className="overflow-x-auto px-4 mt-4">
                <div className="inline-block min-w-full">
                    {/* Column headers */}
                    <div className="flex gap-1.5 mb-2 pl-7">
                        {COLS.map((c, i) => (
                            <div key={i} className={`w-8 text-center text-[9px] font-bold text-gray-600 uppercase ${c === '_' ? '' : ''}`}>
                                {c !== '_' ? c : ''}
                            </div>
                        ))}
                    </div>

                    {Array.from({ length: ROWS }, (_, ri) => {
                        const row = ri + 1
                        const rowSeats = seats.filter(s => s.row === row)
                        return (
                            <div key={row} className="flex items-center gap-1.5 mb-1.5">
                                <span className="text-[9px] text-gray-700 font-bold w-5 shrink-0 text-right">{row}</span>
                                {COLS.map((c, ci) => {
                                    if (c === '_') return <div key={ci} className="w-8" />
                                    const seat = rowSeats.find(s => s.id === `${row}${c}`)
                                    if (!seat) return <div key={ci} className="w-8" />
                                    return (
                                        <button
                                            key={seat.id}
                                            onClick={() => toggleSeat(seat.id)}
                                            disabled={seat.status === 'sold'}
                                            title={`${seat.label} · €${seat.price}`}
                                            className={`w-8 h-8 rounded-lg border text-[9px] font-bold transition-all ${seatConfig[seat.status]} ${seatText[seat.status]}`}
                                        >
                                            {seat.status === 'selected' ? '✓' : c}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="px-4 mt-5 flex flex-wrap gap-3 justify-center">
                {[
                    { color: 'bg-gray-700 border-gray-600', label: 'Available' },
                    { color: 'bg-green-500 border-green-400', label: 'Selected' },
                    { color: 'bg-yellow-900/60 border-yellow-700', label: 'VIP (€25)' },
                    { color: 'bg-gray-800 border-gray-800 opacity-40', label: 'Sold Out' },
                ].map(l => (
                    <div key={l.label} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border ${l.color}`} />
                        <span className="text-xs text-gray-500">{l.label}</span>
                    </div>
                ))}
            </div>

            {/* Info note */}
            <div className="mx-4 mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Yellow rows 1–2 are VIP seats (€25). Standard seats are €15.</span>
            </div>

            {/* Sticky purchase bar */}
            {selected.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-[#161825]/95 backdrop-blur border-t border-gray-800 p-4 z-30 space-y-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm">{selected.length} seat{selected.length > 1 ? 's' : ''} · {selected.map(s => s.id).join(', ')}</p>
                            <p className="text-[10px] text-gray-600 mt-0.5">National Theatre · Oct 30</p>
                        </div>
                        <p className="text-white font-black text-2xl">€{total}</p>
                    </div>
                    <Button onClick={() => navigate('/payment')} className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl">
                        Continue to Payment
                    </Button>
                </div>
            )}
        </div>
    )
}
