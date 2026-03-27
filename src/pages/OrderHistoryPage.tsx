import { useState } from 'react'
import { BusFront, Ticket, Download, ChevronRight, CheckCircle2, XCircle, Clock } from 'lucide-react'

type Order = {
    id: string
    type: 'bus' | 'event'
    title: string
    sub: string
    date: string
    price: string
    status: 'completed' | 'cancelled' | 'upcoming'
    ref: string
}

const orders: Order[] = [
    { id: '1', type: 'bus', title: 'Prishtina → Prizren', sub: 'KosovoPass Express · 2 seats', date: 'Oct 24, 2024', price: '€24.00', status: 'upcoming', ref: 'KP-2410-X92' },
    { id: '2', type: 'event', title: 'Sunny Hill Festival', sub: 'Full Festival Pass × 2', date: 'Aug 1, 2024', price: '€150.00', status: 'completed', ref: 'KP-0824-SHF' },
    { id: '3', type: 'bus', title: 'Prishtina → Peja', sub: 'Dukagjini Lines · 1 seat', date: 'Jul 15, 2024', price: '€6.00', status: 'completed', ref: 'KP-0715-PEJ' },
    { id: '4', type: 'event', title: 'Dokufest: Midnight', sub: 'Single ticket', date: 'Aug 4, 2024', price: '€5.00', status: 'cancelled', ref: 'KP-0804-DOK' },
    { id: '5', type: 'bus', title: 'Prizren → Gjakova', sub: 'Sharr Travel · 1 seat', date: 'Jun 10, 2024', price: '€4.00', status: 'completed', ref: 'KP-0610-GJA' },
    { id: '6', type: 'bus', title: 'Prishtina → Gjilan', sub: 'KosovoPass Express · 1 seat', date: 'May 5, 2024', price: '€4.50', status: 'completed', ref: 'KP-0505-GJL' },
]

const statusConfig = {
    completed: { label: 'Completed', icon: CheckCircle2, color: 'text-green-400 bg-green-400/10' },
    cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-400 bg-red-400/10' },
    upcoming: { label: 'Upcoming', icon: Clock, color: 'text-yellow-400 bg-yellow-400/10' },
}

export default function OrderHistoryPage() {
    const [tab, setTab] = useState<'all' | 'bus' | 'event'>('all')

    const filtered = orders.filter(o => tab === 'all' ? true : o.type === tab)

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            {/* Header */}
            <div className="px-4 pt-5 pb-3">
                <h1 className="text-2xl font-black text-white">Order History</h1>
                <p className="text-xs text-gray-500 mt-0.5">{orders.length} orders total</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-4 pb-4">
                {(['all', 'bus', 'event'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize border transition-all ${tab === t ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
                    >
                        {t === 'bus' ? '🚌 Bus' : t === 'event' ? '🎫 Events' : 'All'}
                    </button>
                ))}
            </div>

            {/* Order cards */}
            <div className="px-4 space-y-3">
                {filtered.map(order => {
                    const cfg = statusConfig[order.status]
                    const StatusIcon = cfg.icon
                    const TypeIcon = order.type === 'bus' ? BusFront : Ticket
                    return (
                        <div key={order.id} className="bg-[#1A1D2D] rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors group cursor-pointer">
                            <div className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${order.type === 'bus' ? 'bg-blue-500/15 text-blue-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                                        <TypeIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-bold text-white text-sm leading-tight">{order.title}</h3>
                                            <p className="text-yellow-500 font-black text-sm shrink-0">{order.price}</p>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-0.5">{order.sub}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-gray-600 text-xs font-mono">{order.ref}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.color}`}>
                                                <StatusIcon className="w-3 h-3" /> {cfg.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="px-4 py-2.5 bg-[#161825] border-t border-gray-800 flex items-center justify-between">
                                <span className="text-xs text-gray-600">{order.date}</span>
                                <div className="flex items-center gap-3">
                                    <button className="text-xs text-gray-500 hover:text-yellow-500 transition-colors flex items-center gap-1">
                                        <Download className="w-3.5 h-3.5" /> Receipt
                                    </button>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-colors" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Total */}
            <div className="mx-4 mt-6 bg-[#1A1D2D] rounded-2xl border border-gray-800 p-4 flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">Total Spent (2024)</span>
                <span className="text-white font-black text-xl">€193.50</span>
            </div>
        </div>
    )
}
