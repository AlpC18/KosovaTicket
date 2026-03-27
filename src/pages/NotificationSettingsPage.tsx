import { useState } from 'react'
import { BusFront, Star, Tag, Megaphone, Clock, Bell } from 'lucide-react'

const categories = [
    {
        icon: BusFront, label: 'Trip Reminders', color: 'text-blue-400 bg-blue-500/10',
        items: [
            { label: 'Departure alerts (30 min)', on: true },
            { label: 'Boarding soon (10 min)', on: true },
            { label: 'Trip cancelled', on: true },
            { label: 'Delay notifications', on: false },
        ]
    },
    {
        icon: Star, label: 'Events & Tickets', color: 'text-yellow-400 bg-yellow-500/10',
        items: [
            { label: 'Event starts soon', on: true },
            { label: 'New events in my city', on: true },
            { label: 'Early access (Premium)', on: true },
            { label: 'Waitlist spot available', on: false },
        ]
    },
    {
        icon: Tag, label: 'Deals & Promotions', color: 'text-green-400 bg-green-500/10',
        items: [
            { label: 'Flash sale alerts', on: false },
            { label: 'Weekly promo digest', on: true },
            { label: 'KPass Points expiring', on: true },
            { label: 'Referral bonus earned', on: true },
        ]
    },
    {
        icon: Megaphone, label: 'App & Account', color: 'text-purple-400 bg-purple-500/10',
        items: [
            { label: 'New features & updates', on: true },
            { label: 'Account security alerts', on: true },
            { label: 'Payment confirmations', on: true },
            { label: 'Newsletters', on: false },
        ]
    },
]

type State = Record<string, Record<string, boolean>>

function buildInitial(): State {
    const s: State = {}
    categories.forEach(cat => {
        s[cat.label] = {}
        cat.items.forEach(item => { s[cat.label][item.label] = item.on })
    })
    return s
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${on ? 'bg-yellow-500' : 'bg-gray-700'}`}
        >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-7' : 'left-1'}`} />
        </button>
    )
}

export default function NotificationSettingsPage() {
    const [state, setState] = useState<State>(buildInitial)

    const toggle = (cat: string, item: string) => {
        setState(prev => ({
            ...prev,
            [cat]: { ...prev[cat], [item]: !prev[cat][item] }
        }))
    }

    const toggleAll = (cat: string, value: boolean) => {
        setState(prev => ({
            ...prev,
            [cat]: Object.fromEntries(Object.keys(prev[cat]).map(k => [k, value]))
        }))
    }

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            <div className="px-4 pt-5 pb-4">
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                    <Bell className="w-6 h-6 text-yellow-500" /> Notifications
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">Control exactly what alerts you receive</p>
            </div>

            <div className="px-4 space-y-4">
                {/* Quiet hours */}
                <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Clock className="w-4.5 h-4.5" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">Quiet Hours</p>
                            <p className="text-gray-500 text-xs mt-0.5">No alerts between 22:00 – 07:00</p>
                        </div>
                    </div>
                    <Toggle on={true} onToggle={() => { }} />
                </div>

                {/* Category groups */}
                {categories.map(cat => {
                    const Icon = cat.icon
                    const allOn = Object.values(state[cat.label]).every(Boolean)
                    return (
                        <div key={cat.label} className="bg-[#1A1D2D] rounded-2xl border border-gray-800 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.color}`}>
                                        <Icon className="w-4.5 h-4.5" />
                                    </div>
                                    <span className="text-white font-bold text-sm">{cat.label}</span>
                                </div>
                                <Toggle on={allOn} onToggle={() => toggleAll(cat.label, !allOn)} />
                            </div>
                            {/* Items */}
                            <div className="divide-y divide-gray-800/60">
                                {cat.items.map(item => (
                                    <div key={item.label} className="flex items-center justify-between px-4 py-3.5 pl-14">
                                        <span className="text-gray-300 text-sm">{item.label}</span>
                                        <Toggle on={state[cat.label][item.label]} onToggle={() => toggle(cat.label, item.label)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
