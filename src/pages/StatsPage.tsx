import { TrendingUp, MapPin, Leaf, BarChart3, Clock, Award } from 'lucide-react'

const monthlyData = [
    { month: 'May', trips: 3, spend: 14 },
    { month: 'Jun', trips: 5, spend: 22 },
    { month: 'Jul', trips: 4, spend: 18 },
    { month: 'Aug', trips: 9, spend: 78 },
    { month: 'Sep', trips: 6, spend: 28 },
    { month: 'Oct', trips: 7, spend: 33 },
]

const maxSpend = Math.max(...monthlyData.map(d => d.spend))

const topRoutes = [
    { from: 'Prishtina', to: 'Prizren', trips: 12, pct: 46 },
    { from: 'Prishtina', to: 'Peja', trips: 8, pct: 31 },
    { from: 'Prizren', to: 'Gjakova', trips: 4, pct: 15 },
    { from: 'Prishtina', to: 'Gjilan', trips: 2, pct: 8 },
]

export default function StatsPage() {
    const totalTrips = monthlyData.reduce((a, d) => a + d.trips, 0)
    const totalSpend = monthlyData.reduce((a, d) => a + d.spend, 0)
    const co2Saved = Math.round(totalTrips * 2.4)
    const avgPerMonth = (totalSpend / monthlyData.length).toFixed(0)

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            <div className="px-4 pt-5 pb-4">
                <h1 className="text-2xl font-black text-white">Travel Stats</h1>
                <p className="text-xs text-gray-500 mt-0.5">May – October 2024</p>
            </div>

            <div className="px-4 space-y-5">
                {/* KPI row */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: BarChart3, label: 'Total Trips', value: totalTrips, unit: 'trips', color: 'text-blue-400 bg-blue-500/10' },
                        { icon: TrendingUp, label: 'Total Spent', value: `€${totalSpend}`, unit: '2024', color: 'text-yellow-400 bg-yellow-500/10' },
                        { icon: Clock, label: 'Avg Monthly', value: `€${avgPerMonth}`, unit: '/month', color: 'text-purple-400 bg-purple-500/10' },
                        { icon: Leaf, label: 'CO₂ Saved', value: `${co2Saved}kg`, unit: 'vs car', color: 'text-green-400 bg-green-500/10' },
                    ].map(({ icon: Icon, label, value, unit, color }) => (
                        <div key={label} className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-4">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                                <Icon className="w-4.5 h-4.5" />
                            </div>
                            <p className="text-2xl font-black text-white leading-none">{value}</p>
                            <p className="text-gray-600 text-xs mt-1 font-medium">{unit}</p>
                            <p className="text-gray-500 text-xs font-bold mt-0.5 uppercase tracking-wide">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Spend bar chart */}
                <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5">
                    <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-yellow-500" /> Monthly Spending
                    </h2>
                    <div className="flex items-end gap-2 h-28">
                        {monthlyData.map(d => (
                            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                                <span className="text-[10px] text-gray-500 font-bold">€{d.spend}</span>
                                <div className="w-full bg-gray-800 rounded-t-lg overflow-hidden" style={{ height: '80px' }}>
                                    <div
                                        className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg transition-all duration-700"
                                        style={{ height: `${(d.spend / maxSpend) * 100}%`, marginTop: `${100 - (d.spend / maxSpend) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-gray-500 font-medium">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top routes */}
                <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5">
                    <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-500" /> Most Traveled Routes
                    </h2>
                    <div className="space-y-4">
                        {topRoutes.map((r, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm text-white font-medium">{r.from} → {r.to}</span>
                                    <span className="text-xs text-gray-500 font-bold">{r.trips} trips ({r.pct}%)</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                                        style={{ width: `${r.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fun fact */}
                <div className="bg-gradient-to-r from-green-900/30 to-[#1A1D2D] border border-green-800/30 rounded-2xl p-4 flex gap-4 items-center">
                    <div className="w-12 h-12 bg-green-500/15 rounded-2xl flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                        <p className="text-green-300 font-bold text-sm">Eco Traveler!</p>
                        <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">By choosing bus over car, you saved <span className="text-green-400 font-bold">{co2Saved}kg</span> of CO₂ this year — equivalent to planting 3 trees 🌱</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
