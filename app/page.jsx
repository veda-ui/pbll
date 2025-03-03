import { redirect } from "next/navigation"
import cookiestatus from "../lib/getcookiestatus"

export default async function Page(){
const user = await cookiestatus()
return(
    <>
    {user && (redirect("/"))

    }
    <>
    {!user && (
        <h1> WELCOME</h1>
    )}

    </>
    </>
)

}