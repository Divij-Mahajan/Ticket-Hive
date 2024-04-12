import { useParams } from "react-router-dom"
import SearchBar from "./components/Explore/searchbar"
import TicketList from "./components/Explore/TicketList"
export default function Explore() {
    let data = [
        {
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
        },
        {
            eventId: "engi2024",
            eventName: "EngiFest",
            eventDate: "15/02/24",
            location: "DTU Campus",
            bookingStart: "08/02/24",
            bookingEnd: "14/02/24",
            totalTickets: -1,
            bookedTickets: 100000,
            description: "Engifest DTU is the annual cultural festival hosted by Delhi Technological University (DTU), showcasing a blend of talent, creativity, and innovation through various competitions, performances, and events.",
            externalLink: "https://www.engifest.in/",
            ticketPrice: 0,
            category: "Concerts",
            thumbnail: "engifest.png",
        },
    ]
    data = data.concat(data)
    data = data.concat(data)
    const { category } = useParams()
    let taglines = {
        Hotels: "Hotels that will make you want to book again....",
        Sports: "For every heart beating for sports...",
        Concerts: "Concerts are waiting for you...",
        Airlines: "You should fly, your money shouldn't...",
        Movies: "Watch latest movies, at best rate...",
        Trains: "Heading somewhere? Book a train...",
        Bus: "Kabhi Bus bhi karo yr..."
    }
    return (<div className="w-full h-full">
        <img className="mt-24 w-full" src={`/category/${category}Hero.png`}></img>
        <div className=" bg-gradient-to-r from-black via-[rgba(0,0,0,0.64)] to-transparent  w-full h-full absolute top-0 left-0 mt-12"></div>
        <div className=" w-1/2 h-full absolute top-0 left-0 mt-40 pt-20 px-10 ml-16">
            <SearchBar />
            <div className="text-6xl mt-40">
                {taglines[category]}
            </div>
        </div>
        <div className="w-full ">
            <div className="text-3xl text-white mx-10 mb-6 mt-24">Featured</div>
            <TicketList data={data} />
            <div className="text-3xl text-white mt-24 mx-10 mb-6">Top Picks</div>
            <TicketList data={data} />
            <div className="text-3xl text-white mt-24 mx-10 mb-6">More</div>
            <TicketList data={data} />
        </div>
    </div>)
}