import { useNavigate } from 'react-router-dom'
import {
    User, Star, MapPin, Bell, Shield, CreditCard,
    ChevronRight, LogOut, Settings, HelpCircle, Gift, Languages, Moon,
    BarChart3, History, BusFront, Users, ShieldCheck
} from 'lucide-react'

const stats = [
    { label: 'Trips', value: '24' },
    { label: 'Events', value: '7' },
    { label: 'Saved', value: '€312' },
]

export default function ProfilePage() {
    const navigate = useNavigate()

    const menuGroups = [
        {
            title: 'Travel',
            items: [
                { icon: BusFront, label: 'Bus Schedule', path: '/schedule', color: 'text-blue-400' },
                { icon: History, label: 'Order History', path: '/history', color: 'text-green-400' },
                { icon: BarChart3, label: 'Travel Stats', path: '/stats', color: 'text-purple-400' },
                { icon: Users, label: 'Group Booking', path: '/group-booking', color: 'text-teal-400' },
            ]
        },
        {
            title: 'Account',
            items: [
                { icon: User, label: 'Personal Info', path: null, color: 'text-blue-400' },
                { icon: CreditCard, label: 'Payment Methods', path: null, color: 'text-green-400' },
                { icon: Shield, label: 'Privacy & Security', path: null, color: 'text-purple-400' },
                { icon: ShieldCheck, label: 'Admin Portal (Scanner)', path: '/admin', color: 'text-yellow-400' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: Languages, label: 'Language & Region', path: '/language', color: 'text-blue-400' },
                { icon: Bell, label: 'Notifications', path: '/notification-settings', color: 'text-yellow-400' },
                { icon: Moon, label: 'Dark Mode', path: null, color: 'text-indigo-400', toggle: true },
                { icon: MapPin, label: 'Default City: Prishtina', path: null, color: 'text-red-400' },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Help & Support', path: '/support', color: 'text-teal-400' },
                { icon: Gift, label: 'Refer a Friend', path: null, color: 'text-pink-400' },
                { icon: Settings, label: 'App Settings', path: null, color: 'text-gray-400' },
            ]
        }
    ]

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232]">
            {/* Hero */}
            <div className="relative overflow-hidden px-6 pt-8 pb-20 bg-gradient-to-br from-[#1A1D2D] via-[#252840] to-[#1F2232]">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#1F2232] to-transparent pointer-events-none" />

                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-3xl shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                            A
                        </div>
                        <div className="absolute bottom-0 right-0 w-7 h-7 bg-yellow-500 rounded-full border-2 border-[#1A1D2D] flex items-center justify-center">
                            <Settings className="w-3.5 h-3.5 text-black" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-4">Alp Çi</h2>
                    <p className="text-gray-400 text-sm mt-1">alp@kosovopass.app</p>

                    <button
                        onClick={() => navigate('/premium')}
                        className="mt-4 flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-5 py-2 rounded-full shadow-lg hover:shadow-yellow-500/30 transition-all active:scale-95"
                    >
                        <Star className="w-4 h-4 fill-black" />
                        KosovoPass Premium
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="mx-4 -mt-8 bg-[#2A2D40] rounded-2xl p-4 grid grid-cols-3 divide-x divide-gray-700 border border-gray-800 shadow-xl z-10 relative">
                {stats.map(s => (
                    <div key={s.label} className="flex flex-col items-center gap-1 px-2">
                        <span className="text-2xl font-bold text-white">{s.value}</span>
                        <span className="text-xs text-gray-400 font-medium">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Menu Groups */}
            <div className="p-4 space-y-6 mt-4 pb-28">
                {menuGroups.map(group => (
                    <div key={group.title}>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 px-1">{group.title}</h3>
                        <div className="bg-[#2A2D40] rounded-2xl overflow-hidden divide-y divide-gray-800 border border-gray-800">
                            {group.items.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <button
                                        key={i}
                                        onClick={() => item.path && navigate(item.path)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-[#32364c] transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-4.5 h-4.5" />
                                            </div>
                                            <span className="font-medium text-sm text-white">{item.label}</span>
                                        </div>
                                        {'toggle' in item && item.toggle ? (
                                            <div className="w-12 h-6 bg-yellow-500 rounded-full relative">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                                            </div>
                                        ) : (
                                            <ChevronRight className="text-gray-600 group-hover:text-gray-300 transition-colors" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}

                <button className="w-full flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 font-bold rounded-2xl p-4 hover:bg-red-500/20 transition-colors active:scale-95">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>

                <p className="text-center text-xs text-gray-600 pb-4">KosovoPass v1.0.0 · Made with ❤ in Prishtina</p>
            </div>
        </div>
    )
}
