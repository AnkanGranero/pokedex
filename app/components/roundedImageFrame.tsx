
import { getTypeColor } from "@/lib/pokemonColors"
export default function RoundedImageFrame({ children, type }: { children: React.ReactNode, type: string }) {
    console.log(type);

    const color = getTypeColor(type);

    console.log(color);

    return (
        <div className="border-8 rounded-full"
            style={{ borderColor: color }}>
            {children}
        </div >
    )
}