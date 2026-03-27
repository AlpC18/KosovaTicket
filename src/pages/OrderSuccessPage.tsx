import { useNavigate } from 'react-router-dom'
import { CheckCircle2, BusFront, Download, Share2, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function OrderSuccessPage() {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="min-h-full bg-[#1F2232] flex flex-col items-center justify-center p-6 text-center pb-24">
            {/* Animated check */}
            <div
                className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            >
                <div className="relative w-32 h-32 mb-8">
                    {/* Pulse rings */}
                    <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping" />
                    <div className="absolute inset-2 rounded-full bg-green-500/15 animate-ping [animation-delay:0.2s]" />
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] relative z-10">
                        <CheckCircle2 className="w-16 h-16 text-white fill-white/20" strokeWidth={1.5} />
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <h1 className="text-3xl font-black text-white mb-2">Booking Confirmed!</h1>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                    Your tickets are ready. Check your email and the Tickets tab for your digital pass.
                </p>
            </div>

            {/* Ticket summary card */}
            <div className={`w-full max-w-sm mt-8 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-[#1A1D2D] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
                    {/* Top strip */}
                    <div className="bg-gradient-to-r from-[#252840] to-[#1A1D2D] px-5 py-4 border-b border-gray-800 flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500/15 rounded-xl flex items-center justify-center text-yellow-500">
                            <BusFront className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-white text-sm">Pristina → Prizren</p>
                            <p className="text-xs text-gray-500">KosovoPass Express · Line 402</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="px-5 py-4 grid grid-cols-2 gap-4 text-left">
                        <div>
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Date & Time</p>
                            <p className="text-white text-sm font-medium">Oct 24, 10:30 AM</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Seats</p>
                            <p className="text-white text-sm font-medium">2A, 2B</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Gate</p>
                            <p className="text-white text-sm font-medium">Terminal B</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Total Paid</p>
                            <p className="text-yellow-500 text-sm font-bold">€26.00</p>
                        </div>
                    </div>

                    {/* Booking ref */}
                    <div className="px-5 py-3 bg-[#161825] border-t border-dashed border-gray-800 flex justify-between items-center">
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Booking Ref</span>
                        <span className="font-mono text-yellow-500 text-xs font-bold tracking-widest">KP-2410-X92-PRI</span>
                    </div>
                </div>

                {/* KPass points earned */}
                <div className="mt-4 bg-gradient-to-r from-yellow-900/30 to-[#1A1D2D] border border-yellow-800/30 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-400 font-bold text-xs shrink-0">
                        +52
                    </div>
                    <div className="text-left">
                        <p className="text-yellow-400 font-bold text-sm">You earned 52 KPass Points!</p>
                        <p className="text-gray-500 text-xs">Total: 312 points · Redeem on next trip</p>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className={`w-full max-w-sm mt-6 space-y-3 transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-11 border-gray-700 text-gray-300 hover:text-white hover:bg-[#2A2D40] rounded-xl flex items-center gap-2 bg-transparent">
                        <Download className="w-4 h-4" /> Download
                    </Button>
                    <Button variant="outline" className="h-11 border-gray-700 text-gray-300 hover:text-white hover:bg-[#2A2D40] rounded-xl flex items-center gap-2 bg-transparent">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                </div>
                <Button
                    onClick={() => navigate('/tickets')}
                    className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl shadow-lg"
                >
                    View My Ticket
                </Button>
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors py-2"
                >
                    <Home className="w-4 h-4" /> Back to Home
                </button>
            </div>
        </div>
    )
}
