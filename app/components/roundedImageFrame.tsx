
import { getTypeColor } from "@/lib/pokemonColors"
export default function RoundedImageFrame({ children, type }: { children: React.ReactNode, type: string }) {
    
    const color = getTypeColor(type);


    return (
        <div className="border-8 rounded-full"
            style={{ borderColor: color }}>
            {children}
        </div >
    )
}