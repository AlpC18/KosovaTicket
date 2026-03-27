import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, UserCheck, ArrowRight, CheckCircle2, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Step = 'select' | 'recipient' | 'confirm' | 'done'

const myTickets = [
    { id: 'A', label: 'Prishtina → Prizren', sub: 'Oct 24 · Seat 2B', ref: 'KP-2410-X92' },
    { id: 'B', label: 'Sunny Hill — Full Pass', sub: 'Aug 1–4 · Ticket #2', ref: 'KP-0824-SHF' },
]

const contacts = [
    { name: 'Albin Krasniqi', initial: 'AK', color: 'bg-blue-500' },
    { name: 'Donika Mehmeti', initial: 'DM', color: 'bg-pink-500' },
    { name: 'Ares Lajçi', initial: 'AL', color: 'bg-green-500' },
    { name: 'Genc Berisha', initial: 'GB', color: 'bg-orange-500' },
]

export default function TransferPage() {
    const [step, setStep] = useState<Step>('select')
    const [ticket, setTicket] = useState<string | null>(null)
    const [recipient, setRecipient] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const selectedTicket = myTickets.find(t => t.id === ticket)
    const selectedContact = contacts.find(c => c.name === recipient)

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            {/* Progress bar */}
            <div className="px-4 pt-5 pb-4 border-b border-gray-800">
                <h1 className="text-xl font-black text-white mb-3">Transfer Ticket</h1>
                <div className="flex items-center gap-2">
                    {(['select', 'recipient', 'confirm'] as const).map((s, i) => {
                        const steps = ['select', 'recipient', 'confirm', 'done']
                        const currentIdx = steps.indexOf(step)
                        const stepIdx = i
                        return (
                            <div key={s} className="flex items-center gap-2 flex-1">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${currentIdx > stepIdx ? 'bg-yellow-500 text-black' : currentIdx === stepIdx ? 'bg-yellow-500 text-black ring-4 ring-yellow-500/20' : 'bg-gray-800 text-gray-600'}`}>
                                    {currentIdx > stepIdx ? '✓' : i + 1}
                                </div>
                                {i < 2 && <div className={`flex-1 h-0.5 rounded-full transition-colors ${currentIdx > stepIdx ? 'bg-yellow-500' : 'bg-gray-800'}`} />}
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-1.5 px-0.5">
                    <span>Select</span><span>Recipient</span><span>Confirm</span>
                </div>
            </div>

            {/* Step 1: Select ticket */}
            {step === 'select' && (
                <div className="p-4 space-y-4">
                    <p className="text-gray-400 text-sm">Which ticket do you want to transfer?</p>
                    <div className="space-y-3">
                        {myTickets.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTicket(t.id)}
                                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${ticket === t.id ? 'border-yellow-500 bg-yellow-900/10' : 'border-gray-800 bg-[#1A1D2D] hover:border-gray-700'}`}
                            >
                                <p className="font-bold text-white text-sm">{t.label}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{t.sub}</p>
                                <p className="text-gray-700 text-xs font-mono mt-1">{t.ref}</p>
                            </button>
                        ))}
                    </div>
                    <Button disabled={!ticket} onClick={() => setStep('recipient')} className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40">
                        Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Step 2: Choose recipient */}
            {step === 'recipient' && (
                <div className="p-4 space-y-5">
                    <p className="text-gray-400 text-sm">Who should receive the ticket?</p>

                    {/* Contacts */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Your Contacts</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {contacts.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => setRecipient(c.name)}
                                    className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${recipient === c.name ? 'border-yellow-500 bg-yellow-900/10' : 'border-gray-800 bg-[#1A1D2D] hover:border-gray-700'}`}
                                >
                                    <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0`}>{c.initial}</div>
                                    <div className="text-left min-w-0">
                                        <p className="text-white font-semibold text-xs leading-tight truncate">{c.name}</p>
                                        {recipient === c.name && <UserCheck className="w-4 h-4 text-yellow-500 mt-1" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Or email */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Or Enter Email</h3>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-[#1A1D2D] border border-gray-800 rounded-xl flex items-center px-3 gap-2 focus-within:border-yellow-500 transition-colors">
                                <Search className="w-4 h-4 text-gray-500 shrink-0" />
                                <input
                                    className="flex-1 bg-transparent text-white text-sm py-3 focus:outline-none placeholder-gray-600"
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setRecipient(null) }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setStep('select')} className="flex-1 h-12 border-gray-700 text-gray-400 rounded-2xl bg-transparent">Back</Button>
                        <Button disabled={!recipient && !email} onClick={() => setStep('confirm')} className="flex-1 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40">
                            Continue <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Confirm */}
            {step === 'confirm' && selectedTicket && (
                <div className="p-4 space-y-5">
                    <p className="text-gray-400 text-sm">Review and confirm the transfer</p>

                    <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 p-5 space-y-4">
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Ticket</p>
                            <p className="text-white font-bold text-sm mt-1">{selectedTicket.label}</p>
                            <p className="text-gray-500 text-xs">{selectedTicket.sub}</p>
                        </div>
                        <div className="h-px bg-gray-800" />
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Recipient</p>
                            <div className="flex items-center gap-3 mt-2">
                                {selectedContact ? (
                                    <>
                                        <div className={`w-9 h-9 ${selectedContact.color} rounded-xl flex items-center justify-center text-white font-black text-sm`}>{selectedContact.initial}</div>
                                        <p className="text-white font-bold text-sm">{selectedContact.name}</p>
                                    </>
                                ) : (
                                    <p className="text-white font-bold text-sm">{email}</p>
                                )}
                            </div>
                        </div>
                        <div className="h-px bg-gray-800" />
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 text-xs text-orange-300 leading-relaxed">
                            ⚠️ This action is irreversible. The ticket will be removed from your account and transferred immediately.
                        </div>
                    </div>

                    {/* Share link option */}
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-400 hover:text-white rounded-2xl py-3 text-sm font-medium transition-colors hover:bg-[#1A1D2D]">
                        <Link2 className="w-4 h-4" /> Or share via link
                    </button>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setStep('recipient')} className="flex-1 h-12 border-gray-700 text-gray-400 rounded-2xl bg-transparent">Back</Button>
                        <Button onClick={() => setStep('done')} className="flex-1 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl">Confirm Transfer</Button>
                    </div>
                </div>
            )}

            {/* Done */}
            {step === 'done' && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 bg-green-500 rounded-[32px] flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] mb-6">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-white">Ticket Transferred!</h2>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-xs">
                        The ticket has been sent to <span className="text-white font-semibold">{selectedContact?.name || email}</span>. They will receive a confirmation.
                    </p>
                    <Button onClick={() => navigate('/tickets')} className="mt-8 w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl">
                        Back to Tickets
                    </Button>
                </div>
            )}
        </div>
    )
}
