"use client"
import { Input } from "@/components/ui/input"
import { useSearchParams } from 'next/navigation'
export default function Search() {
    const searchParams = useSearchParams();

    const search = searchParams.get('search')


    return (
        <form className="flex justify-center p-10">
            <Input className="w-2xl"></Input>
        </form>
    )
}