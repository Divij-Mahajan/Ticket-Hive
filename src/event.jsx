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
        description: "India's premier food festival",
        externalLink: "https://www.instagram.com/thegrubfest/?hl=en",
        ticketPrice: 800,
        category: "Concerts",
        thumbnail: "category/ConcertsHero.png",
        image: ""
    }
    const { category, id } = useParams()
    return (<div className="w-full h-full">
        <img className="mt-24 w-full" src={`/category/${category}Hero.png`}></img>
        <div className=" bg-gradient-to-l from-black via-[rgba(0,0,0,0.34)] to-transparent  w-full h-full absolute top-0 left-0 mt-12"></div>
        <div className=" bg-gradient-to-t from-black via-transparent to-transparent  w-full h-full absolute top-0 left-0 mt-12"></div>
        <div className=" w-1/2 h-full absolute top-0 left-0 mt-40 pt-20 px-10 ml-16">
            <div className="text-3xl">Yet to create This section</div>
        </div>
    </div>)
}