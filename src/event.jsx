import { useParams } from "react-router-dom"
import SearchBar from "./components/Explore/searchbar"
import TicketList from "./components/Explore/TicketList"
import { get, push, ref, set } from "firebase/database"
import { database } from "../firebaseConfig"
import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
export default function Event() {
    const { category, id } = useParams()
    const [data, setData] = useState({})
    const [dataKey, setDataKey] = useState({})
    const [purchase, setPurchase] = useState(false)
    const { user, isAuthenticated, isLoading } = useAuth0();
    get(ref(database, `events/${category}`)).then((snap) => {
        let d = snap.val()
        if (d != null) {
            let l = Object.keys(d)
            for (let i = 0; i < l.length; i++) {
                let e = d[l[i]]

                if (e.eventId == id) {
                    setData(e)
                    setDataKey(l[i])
                }
            }
        }
    })


    return (<div className="w-full h-full">
        <img className="mt-24 w-full" src={`/category/${category}Hero.png`}></img>
        <div className=" bg-gradient-to-l from-black via-[rgba(0,0,0,0.34)] to-transparent  w-full h-full absolute top-0 left-0 mt-12"></div>
        <div className=" bg-gradient-to-t from-black via-transparent to-transparent  w-full h-full absolute top-0 left-0 mt-12"></div>
        <div className=" overflow-hidden glass-morphism absolute top-0 w-4/5 left-0 mt-28 mx-32 rounded-lg h-4/5">
            <img src={data.image} style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.5)", height: "100%", position: "absolute", width: "40%", right: 0 }}></img>
            <div className="p-12 py-20 text-xl w-3/5">
                <div>
                    <span className="text-5xl">{data.eventName} </span><span className="text-5xl" style={{ color: "rgba(255,255,255,0.6)" }}>/</span><span className="mx-3 text-3xl">{data.eventDate}</span>
                </div>
                <div className="w-1/2 my-2 h-1 bg-[rgba(255,255,255,0.6)]"></div>
                <div className="mt-6 text-2xl">
                    <div ><div>Bookings Open , {data.bookingStart} - {data.bookingEnd}</div> </div>
                </div>
                <div className="mt-3">{data.externalLink}</div>
                <div className="mt-6">
                    {data.description}...
                </div>
                <div className="absolute bottom-0 text-3xl mb-16 flex">
                    <div>

                        <span>Price : </span>
                        <span className="text-6xl font-thin">{data.ticketPrice}/-</span>
                    </div>
                    {purchase ? <div>Purchased</div> : (<button onClick={() => {
                        let d = data
                        set(ref(database, `events/${category}/${dataKey}/bookedTickets`), d.bookedTickets + 1)
                        let x = d.tickets[0]
                        set(ref(database, `events/${category}/${dataKey}/tickets`), d.tickets.splice(1))
                        push(ref(database, `users/${user.sub}/`), x)
                        setPurchase(true)
                    }} className="ml-32 bg-white text-black ">Buy</button>)}
                </div>
            </div>
        </div>
    </div>)
}