import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Component() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
                {/* Hero Content */}
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">Benvenuto</h1>
                    <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Inizia il tuo viaggio con noi. Scopri un mondo di possibilità infinite.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                    <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full">
                        <Link href="/admin">
                            Inizia Ora
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
