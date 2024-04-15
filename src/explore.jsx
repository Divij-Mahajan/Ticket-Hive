import { useLocation, useParams } from "react-router-dom"
import SearchBar from "./components/Explore/searchbar"
import TicketList from "./components/Explore/TicketList"
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../firebaseConfig";
export default function Explore() {

    const routePath = useLocation();
    const onTop = () => {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        onTop()
    }, [routePath]);


    const { category } = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        get(ref(database, `/events/${category}`)).then((snap) => {
            let d = snap.val()
            if (d) {
                let tempData = []
                let z = Object.keys(d)
                for (let j = 0; j < z.length; j++) {
                    tempData.push(d[z[j]])
                }
                setData((xyz) => {
                    return [...tempData, ...tempData, ...tempData]
                })

            }
        })

    }, [])
    let taglines = {
        Hotels: "Hotels that will make you want to book again....",
        Sports: "For every heart beating for sports...",
        Concerts: "Concerts are waiting for you...",
        Airlines: "You should fly, your money shouldn't...",
        Movies: "Watch latest movies, at best rate...",
        Trains: "Heading somewhere? Book a train...",
        Bus: "Kabhi Bus bhi karo yr..."
    }
    return (<div className="w-full ">
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