
import { getTypeColor } from "@/lib/pokemon-colors"
export default function RoundedImageFrame({ children, type }: { children: React.ReactNode, type: string }) {
    
    const color = getTypeColor(type);

    return (
        <div className="border-8 rounded-full bg-white"
            style={{ borderColor: color }}>
            {children}
        </div >
    )
}