import { useParams } from "react-router-dom"
import SearchBar from "./components/Explore/searchbar"
import TicketList from "./components/Explore/TicketList"
export default function Event() {
    let data = {
        eventId: "grubfest2024",
        eventName: "The Grub Fest",
        eventDate: "29/03/24",
        bookingStart: "20/03/24",
        bookingEnd: "28/03/24",
        totalTickets: -1,
        bookedTickets: 50000,
        description: "Grub Fest is India's ultimate food festival, a melting pot of flavors, where foodies unite to savor a variety of delectable dishes from across the country.",
        externalLink: "https://www.instagram.com/thegrubfest/?hl=en",
        ticketPrice: 800,
        category: "Concerts",
        thumbnail: "category/ConcertsHero.png",
        image: "/grub.png",
        bookingOpen: true
    }
    const { category, id } = useParams()
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
                <div className="mt-6">
                    <div >{data.bookingOpen ? <div>Booking Open : {data.bookingStart} - {data.bookingEnd}</div> : ""}</div>
                </div>
                <div className="mt-3">
                    {data.description}...
                </div>
                <div className="absolute bottom-0 text-3xl mb-16 flex">
                    <div>

                        <span>Price : </span>
                        <span className="text-6xl font-thin">{data.ticketPrice}/-</span>
                    </div>
                    <button className="ml-32 bg-white text-black ">Buy</button>
                </div>
            </div>
        </div>
    </div>)
}