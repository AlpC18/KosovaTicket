import { Gift, Star, Zap, Award, TrendingUp, ChevronRight } from 'lucide-react'

const badges = [
    { icon: '🏆', label: 'First Ride', earned: true },
    { icon: '🎫', label: '5 Events', earned: true },
    { icon: '🌍', label: 'Explorer', earned: true },
    { icon: '⭐', label: 'Premium', earned: false },
    { icon: '🚌', label: '25 Trips', earned: false },
    { icon: '🎭', label: 'Culture Fan', earned: false },
]

const history = [
    { label: 'Pristina → Prizren booking', pts: '+52', date: 'Oct 24', positive: true },
    { label: 'Sunny Hill ticket purchase', pts: '+120', date: 'Aug 1', positive: true },
    { label: 'Referral bonus — Alban K.', pts: '+200', date: 'Jul 15', positive: true },
    { label: 'Redeemed: 10% discount', pts: '-100', date: 'Jun 20', positive: false },
]

const perks = [
    { title: '10% off next bus', pts: '100 pts', unlocked: true },
    { title: 'Free Event Ticket (up to €15)', pts: '300 pts', unlocked: true },
    { title: 'Priority Boarding', pts: '500 pts', unlocked: false },
    { title: 'VIP Lounge Access', pts: '1000 pts', unlocked: false },
]

export default function RewardsPage() {
    const totalPoints = 312
    const nextTier = 500
    const progress = (totalPoints / nextTier) * 100

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">

            {/* Points hero */}
            <div className="relative overflow-hidden px-5 pt-6 pb-16 bg-gradient-to-b from-[#1A1230] to-[#1F2232]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-yellow-500/8 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border border-yellow-500/20 flex items-center justify-center mb-4 shadow-xl">
                        <Star className="w-10 h-10 text-yellow-400 fill-yellow-400/30" />
                    </div>

                    <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-1">KPass Points Balance</p>
                    <div className="text-6xl font-black text-white mb-1">{totalPoints}</div>
                    <p className="text-gray-500 text-sm">Gold Member · {nextTier - totalPoints} pts to Platinum</p>

                    {/* Progress bar */}
                    <div className="w-full max-w-xs mt-5">
                        <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2">
                            <span>Gold</span>
                            <span>Platinum · {nextTier} pts</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 -mt-8 space-y-6 z-10 relative">

                {/* Badges */}
                <div className="bg-[#1A1D2D] rounded-3xl p-5 border border-gray-800 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-white flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" /> Badges</h2>
                        <span className="text-xs text-gray-600">{badges.filter(b => b.earned).length}/{badges.length} earned</span>
                    </div>
                    <div className="grid grid-cols-6 gap-3">
                        {badges.map((b, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all ${b.earned ? 'bg-[#2A2D40] shadow-sm' : 'bg-gray-800/40 grayscale opacity-40'}`}>
                                    {b.icon}
                                </div>
                                <span className={`text-[8px] font-bold text-center leading-tight ${b.earned ? 'text-gray-400' : 'text-gray-700'}`}>{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rewards to redeem */}
                <div>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.15em] mb-3 px-1">Redeem Rewards</h2>
                    <div className="space-y-2.5">
                        {perks.map((p, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between bg-[#1A1D2D] p-4 rounded-2xl border transition-all ${p.unlocked ? 'border-yellow-500/20 cursor-pointer hover:border-yellow-500/40' : 'border-gray-800 opacity-60'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${p.unlocked ? 'bg-yellow-500/15 text-yellow-400' : 'bg-gray-800 text-gray-600'}`}>
                                        <Gift className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-sm ${p.unlocked ? 'text-white' : 'text-gray-500'}`}>{p.title}</p>
                                        <p className="text-xs text-gray-600 mt-0.5">{p.pts}</p>
                                    </div>
                                </div>
                                {p.unlocked ? (
                                    <span className="text-yellow-500 text-xs font-bold border border-yellow-500/30 px-3 py-1 rounded-xl">Redeem</span>
                                ) : (
                                    <Zap className="w-4 h-4 text-gray-700" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Points history */}
                <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Points History
                        </h2>
                        <button className="text-yellow-500 text-xs font-bold flex items-center gap-1">All <ChevronRight className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="bg-[#1A1D2D] rounded-2xl overflow-hidden border border-gray-800 divide-y divide-gray-800">
                        {history.map((h, i) => (
                            <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-[#22253a] transition-colors">
                                <div>
                                    <p className="text-white text-sm font-medium">{h.label}</p>
                                    <p className="text-gray-600 text-xs mt-0.5">{h.date}</p>
                                </div>
                                <span className={`font-bold text-sm tabular-nums ${h.positive ? 'text-green-400' : 'text-red-400'}`}>{h.pts}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
