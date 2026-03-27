import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BusFront, Ticket, Map, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const slides = [
    {
        icon: BusFront,
        gradient: 'from-blue-900 via-[#1A1D2D] to-[#1F2232]',
        glow: 'bg-blue-500/20',
        accentColor: 'text-blue-400',
        title: 'Travel Kosovo\nEffortlessly',
        subtitle: 'Book bus tickets instantly from anywhere. Real-time schedules, seat selection, and digital boarding passes.',
    },
    {
        icon: Ticket,
        gradient: 'from-yellow-900/50 via-[#1A1D2D] to-[#1F2232]',
        glow: 'bg-yellow-500/20',
        accentColor: 'text-yellow-400',
        title: 'Events &\nExperiences',
        subtitle: 'Concerts, theater, film festivals — discover and book all of Kosovo\'s vibrant culture in one place.',
    },
    {
        icon: Map,
        gradient: 'from-green-900/50 via-[#1A1D2D] to-[#1F2232]',
        glow: 'bg-green-500/20',
        accentColor: 'text-green-400',
        title: 'Explore Every\nCorner',
        subtitle: 'From Prishtina to Prizren, Peja to Gjilan — your complete Kosovo travel companion in your pocket.',
    },
]

export default function OnboardingPage() {
    const [step, setStep] = useState(0)
    const navigate = useNavigate()
    const slide = slides[step]
    const Icon = slide.icon
    const isLast = step === slides.length - 1

    return (
        <div className={`min-h-screen flex flex-col bg-gradient-to-b ${slide.gradient} transition-all duration-700`}>
            {/* Skip */}
            <div className="flex justify-end p-6">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-500 text-sm font-medium hover:text-gray-300 transition-colors"
                >
                    Skip
                </button>
            </div>

            {/* Illustration */}
            <div className="flex-1 flex flex-col items-center justify-center px-8">
                <div className={`relative w-40 h-40 ${slide.glow} rounded-full blur-3xl absolute`} />
                <div className={`relative w-40 h-40 rounded-[40px] ${slide.accentColor === 'text-blue-400' ? 'bg-blue-900/40 border-blue-800' : slide.accentColor === 'text-yellow-400' ? 'bg-yellow-900/40 border-yellow-800' : 'bg-green-900/40 border-green-800'} border-2 flex items-center justify-center mb-10 shadow-2xl`}>
                    <Icon className={`w-20 h-20 ${slide.accentColor}`} strokeWidth={1.2} />
                </div>

                <h1 className="text-4xl font-black text-white text-center leading-tight whitespace-pre-line mb-5">
                    {slide.title}
                </h1>
                <p className="text-gray-400 text-center leading-relaxed text-sm">
                    {slide.subtitle}
                </p>
            </div>

            {/* Dots + CTA */}
            <div className="p-8 flex flex-col items-center gap-6">
                <div className="flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setStep(i)}
                            className={`rounded-full transition-all ${i === step ? 'w-8 h-2 bg-yellow-500' : 'w-2 h-2 bg-gray-700 hover:bg-gray-500'}`}
                        />
                    ))}
                </div>

                {isLast ? (
                    <div className="w-full space-y-3">
                        <Button
                            onClick={() => navigate('/')}
                            className="w-full h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-lg rounded-2xl shadow-[0_4px_30px_rgba(234,179,8,0.35)] flex items-center justify-center gap-2"
                        >
                            <Star className="w-5 h-5 fill-black" /> Get Started
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/')}
                            className="w-full h-12 text-gray-400 font-medium hover:text-white"
                        >
                            I already have an account
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={() => setStep(s => s + 1)}
                        className="w-full h-14 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all"
                    >
                        Continue <ArrowRight className="w-5 h-5" />
                    </Button>
                )}
            </div>
        </div>
    )
}
