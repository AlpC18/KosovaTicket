import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, Phone, Mail, ChevronRight, HelpCircle } from 'lucide-react'

type Msg = { from: 'user' | 'agent'; text: string; time: string }

const faqs = [
    { q: 'How do I cancel my ticket?', a: 'You can cancel your ticket up to 2 hours before departure from the Tickets tab.' },
    { q: 'Is the ticket refundable?', a: 'Standard tickets are 80% refundable. Premium tickets include full refund protection.' },
    { q: 'How do I use my QR code?', a: 'Show your QR code from the Tickets tab at the bus gate or venue entrance.' },
    { q: 'Can I change my seat?', a: 'Seat changes are available up to 30 minutes before departure via the Tickets tab.' },
]

const botReplies: Record<string, string> = {
    cancel: "You can cancel your ticket from the Tickets tab → select a ticket → Cancel. Refund arrives within 3-5 business days.",
    refund: "Standard tickets are 80% refundable. Premium members enjoy full refund protection.",
    seat: "Seat changes are allowed up to 30 minutes before departure. Go to Tickets → select your ticket → Change Seat.",
    default: "Thanks for contacting KosovoPass support! Our team typically responds within 5 minutes. Is there anything else I can help with?",
}

function getBotReply(text: string): string {
    const t = text.toLowerCase()
    if (t.includes('cancel')) return botReplies.cancel
    if (t.includes('refund') || t.includes('money')) return botReplies.refund
    if (t.includes('seat') || t.includes('change')) return botReplies.seat
    return botReplies.default
}

function now() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }

export default function SupportPage() {
    const [tab, setTab] = useState<'chat' | 'faq'>('chat')
    const [msgs, setMsgs] = useState<Msg[]>([
        { from: 'agent', text: 'Hi! I\'m KosovoPass Support. How can I help you today? 👋', time: now() }
    ])
    const [draft, setDraft] = useState('')
    const [typing, setTyping] = useState(false)
    const bottom = useRef<HTMLDivElement>(null)

    useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

    const send = () => {
        if (!draft.trim()) return
        const userMsg: Msg = { from: 'user', text: draft, time: now() }
        setMsgs(prev => [...prev, userMsg])
        setDraft('')
        setTyping(true)
        setTimeout(() => {
            setTyping(false)
            setMsgs(prev => [...prev, { from: 'agent', text: getBotReply(userMsg.text), time: now() }])
        }, 1400)
    }

    return (
        <div className="flex flex-col h-full bg-[#1F2232]">

            {/* Tabs */}
            <div className="flex border-b border-gray-800 bg-[#1A1D2D]">
                {(['chat', 'faq'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex-1 py-4 text-sm font-bold capitalize border-b-2 transition-colors ${tab === t ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-gray-500'}`}
                    >
                        {t === 'chat' ? '💬 Live Chat' : '❓ FAQ'}
                    </button>
                ))}
            </div>

            {tab === 'faq' ? (
                <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-3">
                    {/* Quick contacts */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button className="bg-[#1A1D2D] rounded-2xl p-4 border border-gray-800 flex flex-col items-center gap-2 hover:border-yellow-500/30 transition-colors">
                            <Phone className="w-6 h-6 text-green-400" />
                            <span className="text-white text-sm font-bold">Call Us</span>
                            <span className="text-gray-500 text-xs">+383 44 123 456</span>
                        </button>
                        <button className="bg-[#1A1D2D] rounded-2xl p-4 border border-gray-800 flex flex-col items-center gap-2 hover:border-yellow-500/30 transition-colors">
                            <Mail className="w-6 h-6 text-blue-400" />
                            <span className="text-white text-sm font-bold">Email</span>
                            <span className="text-gray-500 text-xs">support@kpass.app</span>
                        </button>
                    </div>

                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1 mb-3">Frequently Asked</h3>
                    {faqs.map((f, i) => (
                        <details key={i} className="bg-[#1A1D2D] rounded-2xl border border-gray-800 overflow-hidden group">
                            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                                <div className="flex items-center gap-3">
                                    <HelpCircle className="w-4 h-4 text-yellow-500 shrink-0" />
                                    <span className="text-white font-semibold text-sm">{f.q}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-600 group-open:rotate-90 transition-transform shrink-0" />
                            </summary>
                            <div className="px-4 pb-4 pt-0 text-gray-400 text-sm leading-relaxed border-t border-gray-800">{f.a}</div>
                        </details>
                    ))}
                </div>
            ) : (
                <>
                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
                        {/* Agent status */}
                        <div className="flex items-center justify-center gap-2 py-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs text-gray-500 font-medium">KosovoPass Support is online</span>
                        </div>

                        {msgs.map((m, i) => (
                            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
                                {m.from === 'agent' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-black text-xs shrink-0 mt-auto">
                                        KP
                                    </div>
                                )}
                                <div className={`max-w-[78%] ${m.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.from === 'user' ? 'bg-yellow-500 text-black rounded-br-sm font-medium' : 'bg-[#2A2D40] text-white rounded-bl-sm'}`}>
                                        {m.text}
                                    </div>
                                    <span className="text-[10px] text-gray-600 px-1">{m.time}</span>
                                </div>
                            </div>
                        ))}

                        {typing && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-black text-xs shrink-0">KP</div>
                                <div className="bg-[#2A2D40] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                                    {[0, 0.2, 0.4].map((d, i) => (
                                        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={bottom} />
                    </div>

                    {/* Input bar */}
                    <div className="sticky bottom-0 bg-[#1A1D2D] border-t border-gray-800 p-3 flex items-center gap-3 shadow-xl mb-16">
                        <div className="flex-1 flex items-center gap-3 bg-[#161825] rounded-2xl px-4 py-2.5 border border-gray-800">
                            <MessageCircle className="w-4 h-4 text-gray-500 shrink-0" />
                            <input
                                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                                placeholder="Type a message..."
                                value={draft}
                                onChange={e => setDraft(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && send()}
                            />
                        </div>
                        <button
                            onClick={send}
                            disabled={!draft.trim()}
                            className="w-11 h-11 rounded-2xl bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-black transition-all active:scale-95 shadow-lg"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
