import { Check, Star, Zap, Wifi, Shield, Ticket, ChevronLeft, Coffee } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const plans = [
    {
        id: 'monthly',
        name: 'Monthly',
        price: '€9.99',
        period: '/month',
        popular: false,
    },
    {
        id: 'annual',
        name: 'Annual',
        price: '€79',
        period: '/year',
        popular: true,
        savings: 'Save €41',
    },
]

const features = [
    { icon: Ticket, label: 'Unlimited ticket bookings', sub: 'No booking limits' },
    { icon: Zap, label: 'Priority boarding', sub: 'Skip the queue' },
    { icon: Wifi, label: 'Free WiFi on all buses', sub: 'High speed included' },
    { icon: Coffee, label: 'Lounge access', sub: 'All major terminals' },
    { icon: Shield, label: 'Ticket insurance', sub: 'Full refund protection' },
    { icon: Star, label: 'Exclusive event access', sub: 'Early ticket sales' },
]

export default function PremiumPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-full bg-[#1F2232] pb-32 flex flex-col">
            {/* Header */}
            <div className="relative overflow-hidden px-6 pt-6 pb-16 bg-gradient-to-b from-[#1A1230] to-[#1F2232]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
                    <div className="absolute -top-6 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl" />
                </div>
                <button onClick={() => navigate(-1)} className="relative z-10 text-yellow-500 mb-6 flex items-center gap-1">
                    <ChevronLeft className="w-5 h-5" /> Back
                </button>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.5)] mb-4">
                        <Star className="w-8 h-8 text-black fill-black" />
                    </div>
                    <h1 className="text-3xl font-bold text-white text-center">KosovoPass</h1>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Premium</h2>
                    <p className="text-gray-400 text-center mt-3 text-sm leading-relaxed max-w-xs">
                        Unlock the full Kosovo experience. Travel smarter, faster, and with exclusive perks.
                    </p>
                </div>
            </div>

            {/* Plan Selector */}
            <div className="px-4 -mt-8 z-10 relative">
                <div className="flex gap-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${plan.popular
                                ? 'border-yellow-500 bg-gradient-to-br from-[#2A2D1A] to-[#2A2D40] shadow-[0_0_30px_rgba(234,179,8,0.2)]'
                                : 'border-gray-800 bg-[#1A1D2D]'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-yellow-500 text-black text-[9px] font-bold px-3 py-1 rounded-bl-xl">BEST VALUE</div>
                                </div>
                            )}
                            {plan.savings && (
                                <div className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full w-fit mb-2 border border-green-500/20">{plan.savings}</div>
                            )}
                            <div className={`text-2xl font-bold ${plan.popular ? 'text-yellow-500' : 'text-white'}`}>{plan.price}</div>
                            <div className="text-gray-400 text-xs">{plan.period}</div>
                            <div className="text-gray-300 font-medium text-sm mt-1">{plan.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="px-4 mt-8">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">What&apos;s included</h3>
                <div className="space-y-3">
                    {features.map((f, i) => {
                        const Icon = f.icon
                        return (
                            <div key={i} className="flex items-center gap-4 bg-[#1A1D2D] p-4 rounded-2xl border border-gray-800 hover:border-yellow-500/20 transition-colors group">
                                <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold text-sm">{f.label}</p>
                                    <p className="text-gray-500 text-xs">{f.sub}</p>
                                </div>
                                <Check className="w-5 h-5 text-yellow-500 shrink-0" />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#161825] to-transparent pb-8 z-20">
                <Button className="w-full h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold text-lg rounded-2xl shadow-[0_4px_30px_rgba(234,179,8,0.35)] transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-black" />
                    Start Free 7-Day Trial
                </Button>
                <p className="text-center text-xs text-gray-500 mt-3">Cancel anytime. No hidden fees.</p>
            </div>
        </div>
    )
}
