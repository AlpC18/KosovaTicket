import { Lock, Tag, CreditCard, Building2, Wallet } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from '../store/useStore'

export default function PaymentPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { addTicket } = useStore()
    
    // Fallback to dummy data if navigated directly
    const state = location.state || { route: 'Bus Tickets (Prishtina-Prizren)', total: 24.00, seats: ['2A'] };
    const serviceFee = 2.00;

    return (
        <div className="p-6 space-y-8 bg-[#1F2232] min-h-full pb-32">

            {/* Order Summary */}
            <div className="bg-[#1A1D2D] rounded-2xl p-5 border border-gray-800 shadow-xl">
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-gray-300">
                        <span className="font-medium">{state.route}</span>
                        <span className="font-bold tracking-wide">€{(state.total).toFixed(2)}</span>
                    </div>
                    {state.seats && (
                        <div className="flex justify-between items-center text-gray-400 text-sm">
                            <span>Seats</span>
                            <span className="font-mono">{state.seats.join(', ')}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-gray-300">
                        <span className="font-medium">Service Fee</span>
                        <span className="font-bold tracking-wide">€{(serviceFee).toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-gray-800 w-full my-4"></div>
                    <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-lg">Total Amount</span>
                        <span className="font-bold text-xl text-yellow-500">€{(state.total + serviceFee).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Promo Code */}
            <div>
                <h3 className="text-lg font-bold mb-3">Promo Code</h3>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <Input
                            placeholder="Enter code"
                            className="bg-[#1A1D2D] border-gray-800 text-white pl-12 h-12 focus-visible:ring-yellow-500 focus-visible:ring-offset-0 focus-visible:border-yellow-500 rounded-xl"
                        />
                    </div>
                    <Button className="h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 rounded-xl shadow-lg">Apply</Button>
                </div>
            </div>

            {/* Payment Method */}
            <div>
                <h3 className="text-lg font-bold mb-4">Payment Method</h3>
                <div className="space-y-4">

                    {/* Credit Card Selected */}
                    <div className="relative border-2 border-yellow-500 rounded-2xl p-5 bg-[#1A1D2D] shadow-lg overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-500/20 to-transparent pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                    <CreditCard className="text-yellow-500 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-md">Credit or Debit Card</h4>
                                    <p className="text-gray-500 text-xs mt-0.5">Visa, Mastercard, Amex</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                                <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-4 mt-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 mb-2 block uppercase tracking-wider">Card Number</label>
                                <div className="relative">
                                    <Input
                                        placeholder="•••• •••• •••• 4242"
                                        className="bg-[#161825] border-gray-800 h-12 text-white font-mono tracking-widest pl-4 pr-16 focus-visible:ring-yellow-500/50 rounded-xl shadow-inner"
                                        defaultValue="•••• •••• •••• 4242"
                                    />
                                    <div className="flex gap-1 absolute right-3 top-1/2 -translate-y-1/2 opacity-70">
                                        <div className="w-5 h-5 bg-blue-500/80 rounded-full mix-blend-screen"></div>
                                        <div className="w-5 h-5 bg-red-500/80 rounded-full mix-blend-screen -ml-2"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 mb-2 block uppercase tracking-wider">Expiry Date</label>
                                    <Input
                                        placeholder="MM/YY"
                                        className="bg-[#161825] border-gray-800 h-12 text-white font-mono focus-visible:ring-yellow-500/50 rounded-xl shadow-inner text-center"
                                        defaultValue="12/26"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 mb-2 block uppercase tracking-wider">CVV</label>
                                    <Input
                                        type="password"
                                        placeholder="•••"
                                        className="bg-[#161825] border-gray-800 h-12 text-white font-mono text-center tracking-[0.5em] focus-visible:ring-yellow-500/50 rounded-xl shadow-inner"
                                        defaultValue="123"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Unselected options */}
                    <div className="border border-gray-800 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#1A1D2D] transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                                <Wallet className="text-gray-400 w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">IPKO Pay</h4>
                                <p className="text-gray-500 text-xs mt-0.5">Local payment gateway</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#1A1D2D] transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                                <Building2 className="text-gray-400 w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">Raiffeisen Bank</h4>
                                <p className="text-gray-500 text-xs mt-0.5">Direct bank transfer</p>
                            </div>
                        </div>
                        <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Complete Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#161825] border-t border-gray-800 p-6 z-20 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <Button 
                    onClick={() => {
                        addTicket({
                            title: state.route,
                            date: new Date(Date.now() + 86400000).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                            location: 'Prishtina Central Station',
                            price: `€${(state.total + serviceFee).toFixed(2)}`,
                            type: 'bus'
                        });
                        navigate('/order-success');
                    }}
                    className="w-full h-14 bg-gradient-to-r from-[#2A2D40] to-[#1F2232] text-white hover:opacity-90 font-bold text-lg rounded-xl border border-gray-700 shadow-xl flex items-center justify-center gap-2 group mb-4">
                    Complete Purchase <Lock className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                </Button>
                <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest leading-relaxed">
                    By completing this purchase, you agree to the <a href="#" className="text-yellow-500 underline underline-offset-2">Terms of Service</a> and <a href="#" className="text-yellow-500 underline underline-offset-2">Privacy Policy</a> of KosovoPass.
                </p>
            </div>
        </div>
    )
}
