import { useState } from 'react'
import { QrCode, ShieldCheck, CheckCircle2, ChevronLeft, ScanLine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
    const { tickets, useTicket, clearTickets } = useStore()
    const navigate = useNavigate()
    const [scannedCode, setScannedCode] = useState('')
    const [scanResult, setScanResult] = useState<{success: boolean, message: string} | null>(null)

    const handleScan = () => {
        // In a real app, this would use a camera. We mock a scan.
        // E.g. assume they typed a ticket ID or pasted the URL
        if (!scannedCode) return

        let ticketId = scannedCode
        if (scannedCode.includes('/verify/')) {
            ticketId = scannedCode.split('/verify/')[1]
        }

        const ticket = tickets.find(t => t.id === ticketId)
        
        if (!ticket) {
            setScanResult({ success: false, message: 'Invalid ticket! Ticket not found in system.' })
            return
        }

        if (ticket.status === 'used') {
            setScanResult({ success: false, message: 'Ticket already used!' })
            return
        }

        if (ticket.status === 'expired') {
            setScanResult({ success: false, message: 'Ticket has expired!' })
            return
        }

        useTicket(ticket.id)
        setScanResult({ success: true, message: `Success! ${ticket.title} validated.` })
        setScannedCode('')
    }

    return (
        <div className="flex flex-col h-full bg-[#1F2232] text-white">
            <header className="flex items-center justify-between px-4 py-3 bg-[#1A1D2D] border-b border-gray-800 sticky top-0 z-50">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-yellow-500 hover:bg-white/5 rounded-xl transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="font-bold text-lg flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-500" /> Admin Portal
                </div>
                <div className="w-10" />
            </header>

            <div className="p-6 space-y-8 flex-1 overflow-y-auto">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1A1D2D] p-5 rounded-2xl border border-gray-800">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Sold</div>
                        <div className="text-2xl font-black text-white">{tickets.length}</div>
                    </div>
                    <div className="bg-[#1A1D2D] p-5 rounded-2xl border border-gray-800">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Checked In</div>
                        <div className="text-2xl font-black text-yellow-500">{tickets.filter(t => t.status === 'used').length}</div>
                    </div>
                </div>

                {/* Scanner Interface */}
                <div className="bg-[#1A1D2D] rounded-3xl border border-gray-800 p-6 flex flex-col items-center shadow-lg">
                    <div className="w-20 h-20 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-4">
                        <ScanLine className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">QR Scanner Demo</h3>
                    <p className="text-sm text-gray-500 text-center mb-6">Enter a Ticket ID (e.g. TK-12345678) or URL to simulate scanning.</p>
                    
                    <div className="w-full space-y-4">
                        <input 
                            className="bg-[#161825] border border-gray-700 text-white w-full h-14 rounded-xl px-4 text-center tracking-widest outline-none focus:border-yellow-500 transition-colors font-mono"
                            placeholder="TK-XXXXXXXX"
                            value={scannedCode}
                            onChange={(e) => setScannedCode(e.target.value)}
                        />
                        <Button 
                            onClick={handleScan}
                            className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl text-md"
                        >
                            Validate Ticket
                        </Button>
                    </div>

                    {scanResult && (
                        <div className={`mt-6 w-full p-4 rounded-xl flex items-start gap-3 border ${scanResult.success ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                            {scanResult.success ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <QrCode className="w-6 h-6 shrink-0 opacity-50" />}
                            <p className="text-sm font-medium">{scanResult.message}</p>
                        </div>
                    )}
                </div>

                {/* Recent Tickets List */}
                <div>
                    <h4 className="text-sm font-bold text-gray-400 mb-4">Recent Tickets</h4>
                    <div className="space-y-3">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="bg-[#161825] p-3 rounded-xl border border-gray-800 flex justify-between items-center">
                                <div>
                                    <div className="font-mono text-xs text-yellow-500 mb-0.5">{ticket.id}</div>
                                    <div className="text-sm font-bold">{ticket.title}</div>
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${ticket.status === 'active' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-500'}`}>
                                    {ticket.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Developer Tools */}
                <div className="pt-8 mb-24">
                    <Button onClick={() => { if(confirm('Emin misin? Tüm veritabanı silinecek.')) clearTickets() }} className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                        Clear All Database (Reset State)
                    </Button>
                </div>

            </div>
        </div>
    )
}
