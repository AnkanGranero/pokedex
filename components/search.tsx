import { Input } from "@/components/ui/input"
import Form from "next/form"
export default function Search() {


    


    return (
        <Form className="flex justify-center p-10" action="search">
            <Input className="w-2xl" name="query"></Input>
        </Form>
    )
}   