import { Input } from "@/components/ui/input"
import Form from "next/form"
export default function Search() {

    return (
        <Form className="flex justify-center p-10" action="/search" >
            <Input placeholder="Search for a Pokémon..." className="w-[70%] p-5" name="query"></Input>
        </Form>
    )
}   