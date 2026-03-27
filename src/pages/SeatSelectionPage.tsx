import { useState } from 'react'
import { Wifi, Zap, ArrowRight, BusFront } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

export default function SeatSelectionPage() {
    const navigate = useNavigate()
    const [selectedSeats, setSelectedSeats] = useState<string[]>(['2A', '2B'])
    const bookedSeats = ['3C', '3D', '1A']
    const seatPrice = 12.00

    const toggleSeat = (id: string) => {
        if (bookedSeats.includes(id)) return
        if (selectedSeats.includes(id)) {
            setSelectedSeats(selectedSeats.filter(s => s !== id))
        } else {
            setSelectedSeats([...selectedSeats, id])
        }
    }

    const renderSeat = (id: string) => {
        const isBooked = bookedSeats.includes(id)
        const isSelected = selectedSeats.includes(id)

        let styles = "w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all "

        if (isBooked) {
            styles += "bg-[#3A3F58] border-[#3A3F58] text-gray-400 cursor-not-allowed opacity-50"
        } else if (isSelected) {
            styles += "bg-yellow-500 border-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] transform scale-105"
        } else {
            styles += "bg-transparent border-[#3A3F58] text-gray-300 hover:border-yellow-500/50"
        }

        return (
            <button key={id} onClick={() => toggleSeat(id)} className={styles} disabled={isBooked}>
                {id}
            </button>
        )
    }

    return (
        <div className="flex flex-col h-full bg-[#1F2232]">
            {/* Progress Bar & Subheader */}
            <div className="px-6 py-4 bg-[#1A1D2D] border-b border-gray-800">
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <span className="text-gray-400 text-sm">2 seats remaining to select</span>
                    </div>
                    <div className="text-yellow-500 font-bold text-sm">Step 2 of 3</div>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-yellow-500 w-2/3 rounded-full"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                {/* Legend */}
                <div className="flex gap-6 mb-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#3A3F58] rounded"></div> Available
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div> Selected
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#3A3F58] rounded"></div> Booked
                    </div>
                </div>

                {/* Bus Layout */}
                <div className="w-full max-w-[320px] bg-[#161825] p-6 rounded-3xl border border-gray-800 shadow-2xl relative">
                    {/* Driver Cabin */}
                    <div className="bg-[#2A2B1D] text-yellow-600/50 rounded-2xl py-4 flex flex-col items-center mb-8 border border-yellow-900/30">
                        <BusFront className="w-6 h-6 mb-2 text-yellow-500/80" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B8B5C]">Driver Cabin</span>
                    </div>

                    {/* Seats grid */}
                    <div className="flex justify-between relative">
                        {/* Aisle line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 flex items-center justify-center">
                            <div className="w-[1px] h-full bg-gray-800/50"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 z-10">
                            {['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'].map(renderSeat)}
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:gap-4 z-10">
                            {['1C', '1D', '2C', '2D', '3C', '3D', '4C', '4D', '5C', '5D', '6C', '6D'].map(renderSeat)}
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] mt-8 mb-32">
                    <div className="bg-[#1A1D2D] p-4 rounded-2xl border border-gray-800 flex flex-col items-start hover:border-yellow-500/30 transition-colors">
                        <Wifi className="text-yellow-500 mb-3 w-6 h-6" />
                        <span className="font-bold text-sm text-white mb-1">Free WiFi</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">High speed on board</span>
                    </div>
                    <div className="bg-[#1A1D2D] p-4 rounded-2xl border border-gray-800 flex flex-col items-start hover:border-yellow-500/30 transition-colors">
                        <Zap className="text-yellow-500 mb-3 w-6 h-6" />
                        <span className="font-bold text-sm text-white mb-1">Power Outlets</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Every seat row</span>
                    </div>
                </div>
            </div>

            {/* Footer sticky */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#161825] border-t border-gray-800 p-6 z-20 pb-safe">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Selected Seats</div>
                        <div className="flex gap-2">
                            {selectedSeats.length > 0 ? selectedSeats.map(s => (
                                <span key={s} className="bg-[#2A2D40] text-yellow-500 px-2 py-1 rounded text-xs font-bold font-mono">{s}</span>
                            )) : <span className="text-gray-600 text-sm">None</span>}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-400 mb-0.5">Total Price</div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">€{(selectedSeats.length * seatPrice).toFixed(2)}</div>
                    </div>
                </div>
                <Button onClick={() => navigate('/payment', { state: { seats: selectedSeats, total: selectedSeats.length * seatPrice, route: 'Prishtina to Prizren' } })} className="w-full h-14 bg-gradient-to-r from-[#2A2D40] to-[#1F2232] text-white hover:opacity-90 font-bold text-lg rounded-xl border border-gray-700 shadow-xl flex items-center justify-center gap-2 group">
                    Confirm Booking <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    )
}
