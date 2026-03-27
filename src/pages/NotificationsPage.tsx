import { BusFront, Ticket, Gift, Star } from 'lucide-react'

const notifications = [
    {
        id: 1,
        icon: BusFront,
        iconBg: 'bg-blue-500/20 text-blue-400',
        title: 'Your bus departs in 30 minutes',
        body: 'Line 402 · Pristina → Prizren · Gate Terminal B',
        time: '09:00 AM',
        unread: true,
    },
    {
        id: 2,
        icon: Ticket,
        iconBg: 'bg-green-500/20 text-green-400',
        title: 'Booking confirmed!',
        body: 'Sunny Hill Festival 2024 — 2 tickets confirmed',
        time: 'Yesterday',
        unread: true,
    },
    {
        id: 3,
        icon: Star,
        iconBg: 'bg-yellow-500/20 text-yellow-400',
        title: 'Early access: Dokufest 2024',
        body: 'Premium members get tickets 48h early. Get yours now.',
        time: 'Mon',
        unread: false,
    },
    {
        id: 4,
        icon: Gift,
        iconBg: 'bg-pink-500/20 text-pink-400',
        title: 'You earned 50 KPass Points!',
        body: 'Your recent Prizren trip earned you reward points.',
        time: 'Sun',
        unread: false,
    },
    {
        id: 5,
        icon: BusFront,
        iconBg: 'bg-purple-500/20 text-purple-400',
        title: 'Trip reminder: Peja tomorrow',
        body: 'Oct 28 · 09:15 AM · Dukagjini Lines · Economy',
        time: 'Sat',
        unread: false,
    },
]

export default function NotificationsPage() {
    const unreadCount = notifications.filter(n => n.unread).length

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232]">
            {/* Header */}
            <div className="px-5 py-5 border-b border-gray-800 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-white">Notifications</h1>
                    <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>
                </div>
                <button className="text-yellow-500 text-sm font-bold hover:text-yellow-400 transition-colors">
                    Mark all read
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto pb-28">
                {notifications.map((n) => {
                    const Icon = n.icon
                    return (
                        <button
                            key={n.id}
                            className={`w-full flex items-start gap-4 px-5 py-4 border-b border-gray-800 hover:bg-[#2A2D40] transition-colors text-left ${n.unread ? 'bg-[#242640]' : ''}`}
                        >
                            {n.unread && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full" />
                            )}
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${n.iconBg}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <p className={`font-semibold text-sm leading-tight ${n.unread ? 'text-white' : 'text-gray-300'}`}>{n.title}</p>
                                    <span className="text-[10px] text-gray-500 whitespace-nowrap shrink-0 font-medium mt-0.5">{n.time}</span>
                                </div>
                                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{n.body}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
