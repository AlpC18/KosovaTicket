import { Calendar, ChevronDown, Star, MapPin } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DiscoverPage() {
    return (
        <div className="p-4 space-y-6">
            {/* City Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 text-sm font-bold whitespace-nowrap">
                    All Cities
                </Badge>
                <Badge variant="secondary" className="bg-[#2A2D40] text-gray-300 hover:bg-gray-700 px-4 py-2 text-sm font-medium flex items-center gap-2 whitespace-nowrap">
                    Pristina <ChevronDown className="w-4 h-4" />
                </Badge>
                <Badge variant="secondary" className="bg-[#2A2D40] text-gray-300 hover:bg-gray-700 px-4 py-2 text-sm font-medium flex items-center gap-2 whitespace-nowrap">
                    Prizren <ChevronDown className="w-4 h-4" />
                </Badge>
                <Badge variant="secondary" className="bg-[#2A2D40] text-gray-300 hover:bg-gray-700 px-4 py-2 text-sm font-medium flex items-center gap-2 whitespace-nowrap">
                    Peja <ChevronDown className="w-4 h-4" />
                </Badge>
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Upcoming Events</h2>
                <span className="text-yellow-500 text-sm font-bold flex items-center">View Map</span>
            </div>

            {/* Events List */}
            <div className="space-y-4">
                {/* Sunny Hill */}
                <div className="bg-[#2A2D40] rounded-xl overflow-hidden shadow-lg border border-gray-800">
                    <div className="h-40 relative">
                        <img
                            src="https://images.unsplash.com/photo-1540039155733-25f1c7566270?auto=format&fit=crop&q=80&w=800"
                            alt="Event"
                            className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-3 right-3 bg-yellow-500 text-black hover:bg-yellow-600 font-bold px-2 py-1 flex gap-1 items-center">
                            <Star className="w-3 h-3 fill-black text-black" /> TRENDING
                        </Badge>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-lg font-bold leading-tight">Sunny Hill Festival 2024</h3>
                                <p className="text-gray-400 text-sm flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" /> Gërmia Park, Pristina</p>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold block">€50.00</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-0.5">STARTS AT</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded-lg text-sm font-medium">
                                <Calendar className="w-4 h-4 mr-2" /> 25/07/2024
                            </div>
                            <Button onClick={() => window.location.href = '/seat-selection'} className="bg-[#1F2232] text-white hover:bg-gray-800 font-semibold px-6 border border-gray-700">Get Tickets</Button>
                        </div>
                    </div>
                </div>

                {/* Dokufest (Sold Out) */}
                <div className="bg-[#2A2D40] rounded-xl overflow-hidden shadow-lg border border-gray-800 opacity-90">
                    <div className="h-40 relative">
                        <img
                            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800"
                            alt="Event"
                            className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Badge className="bg-red-500/80 hover:bg-red-500/80 text-white font-bold px-4 py-1 border border-red-400/50 backdrop-blur-sm shadow-xl">
                                SOLD OUT
                            </Badge>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-lg font-bold leading-tight">Dokufest: Midnight Screening</h3>
                                <p className="text-gray-400 text-sm flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" /> Lumbardhi Cinema, Prizren</p>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold block">€5.00</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded-lg text-sm font-medium">
                                <Calendar className="w-4 h-4 mr-2" /> 04/08/2024
                            </div>
                            <Button className="bg-[#1F2232] text-gray-400 hover:bg-[#1F2232] cursor-not-allowed font-semibold px-6 border border-gray-800">Join Waitlist</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
