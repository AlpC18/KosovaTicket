import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, ArrowLeft, BusFront, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Step = 'select' | 'reason' | 'confirm' | 'done'

const myTickets = [
    { id: 'A', icon: BusFront, label: 'Prishtina → Prizren', sub: 'Oct 24 · Seat 2A, 2B · €24.00', refund: '€19.20', policy: '80% refund (standard)' },
    { id: 'B', icon: Ticket, label: 'Sunny Hill Festival', sub: 'Aug 1 · Full Pass · €150.00', refund: '€150.00', policy: '100% refund (Premium member)' },
]

const reasons = [
    'Change of plans',
    'Personal emergency',
    'Illness',
    'Wrong date booked',
    'Found better option',
    'Other',
]

export default function CancelTicketPage() {
    const [step, setStep] = useState<Step>('select')
    const [ticket, setTicket] = useState<string | null>(null)
    const [reason, setReason] = useState<string | null>(null)
    const navigate = useNavigate()

    const sel = myTickets.find(t => t.id === ticket)

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-800 flex items-center gap-3">
                <button onClick={() => step === 'select' ? navigate(-1) : setStep('select')} className="text-yellow-500 p-1.5 hover:bg-white/5 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-black text-white">Cancel Ticket</h1>
            </div>

            {/* Step 1 */}
            {step === 'select' && (
                <div className="p-4 space-y-5">
                    <p className="text-gray-400 text-sm">Select the ticket you want to cancel:</p>
                    <div className="space-y-3">
                        {myTickets.map(t => {
                            const Icon = t.icon
                            return (
                                <button
                                    key={t.id}
                                    onClick={() => setTicket(t.id)}
                                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${ticket === t.id ? 'border-yellow-500 bg-yellow-900/10' : 'border-gray-800 bg-[#1A1D2D] hover:border-gray-700'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#252840] rounded-xl flex items-center justify-center text-yellow-500 shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{t.label}</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{t.sub}</p>
                                            <p className="text-green-400 text-xs font-semibold mt-1.5">↩ Refund: {t.refund}</p>
                                            <p className="text-gray-600 text-[10px] mt-0.5">{t.policy}</p>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Policy note */}
                    <div className="bg-[#1A1D2D] border border-gray-800 rounded-2xl p-4 text-xs text-gray-400 space-y-2 leading-relaxed">
                        <p className="font-bold text-white text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500" /> Cancellation Policy</p>
                        <p>• Standard tickets: <span className="text-white">80% refund</span> if cancelled 2+ hours before departure</p>
                        <p>• Premium members: <span className="text-green-400">100% refund</span> anytime</p>
                        <p>• Refund arrives within <span className="text-white">3–5 business days</span></p>
                    </div>

                    <Button disabled={!ticket} onClick={() => setStep('reason')} className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl disabled:opacity-40">
                        Continue
                    </Button>
                </div>
            )}

            {/* Step 2: Reason */}
            {step === 'reason' && (
                <div className="p-4 space-y-4">
                    <p className="text-gray-400 text-sm">Why are you cancelling?</p>
                    <div className="space-y-2">
                        {reasons.map(r => (
                            <button
                                key={r}
                                onClick={() => setReason(r)}
                                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium text-sm transition-all ${reason === r ? 'border-yellow-500 bg-yellow-900/10 text-white' : 'border-gray-800 bg-[#1A1D2D] text-gray-400 hover:border-gray-700'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" onClick={() => setStep('select')} className="flex-1 h-12 border-gray-700 text-gray-400 rounded-2xl bg-transparent">Back</Button>
                        <Button disabled={!reason} onClick={() => setStep('confirm')} className="flex-1 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl disabled:opacity-40">Continue</Button>
                    </div>
                </div>
            )}

            {/* Step 3: Confirm */}
            {step === 'confirm' && sel && (
                <div className="p-4 space-y-5">
                    <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5 space-y-4">
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Cancelling</p>
                            <p className="text-white font-bold mt-1">{sel.label}</p>
                            <p className="text-gray-500 text-xs">{sel.sub}</p>
                        </div>
                        <div className="h-px bg-gray-800" />
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Reason</p>
                            <p className="text-white text-sm mt-1">{reason}</p>
                        </div>
                        <div className="h-px bg-gray-800" />
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Refund Amount</p>
                            <p className="text-green-400 font-black text-3xl mt-1">{sel.refund}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{sel.policy}</p>
                        </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-red-300 text-sm leading-relaxed">This action cannot be undone. Your ticket will be immediately cancelled and the refund will be processed.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setStep('reason')} className="flex-1 h-12 border-gray-700 text-gray-400 rounded-2xl bg-transparent">Back</Button>
                        <Button onClick={() => setStep('done')} className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl">Cancel Ticket</Button>
                    </div>
                </div>
            )}

            {/* Done */}
            {step === 'done' && sel && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 bg-green-500 rounded-[32px] flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] mb-6">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-white">Cancellation Confirmed</h2>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-xs">
                        Your ticket has been cancelled. A refund of <span className="text-green-400 font-bold">{sel.refund}</span> will appear in 3–5 business days.
                    </p>
                    <Button onClick={() => navigate('/')} className="mt-8 w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl">
                        Back to Home
                    </Button>
                </div>
            )}
        </div>
    )
}
