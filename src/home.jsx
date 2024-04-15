
import { Suspense, useEffect, useRef, useState } from "react"
import HomeBackground from "./components/Home/homeBackground"
import Category from "./components/Home/Category"
import { useLocation, useNavigate } from "react-router-dom"
import TicketList from "./components/Explore/TicketList"
import { get, ref } from "firebase/database"
import { database } from "../firebaseConfig"
import Popup from "./components/Home/Popup"
import AboutUs from "./components/Home/about"

function reverseArr(input) {
    var ret = new Array;
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}

function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        get(ref(database, "/events")).then((snap) => {
            let d = snap.val()
            if (d && data.length == 0) {
                let tempData = []
                let k = Object.keys(d)
                for (let i = 0; i < k.length; i++) {
                    let z = Object.keys(d[k[i]])
                    for (let j = 0; j < z.length; j++) {
                        tempData.push(d[k[i]][z[j]])
                    }
                }
                setData((xyz) => {
                    return tempData
                })
            }
        })

    }, [])
    const routePath = useLocation();
    const onTop = () => {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        onTop()
    }, [routePath]);

    // let data = [
    //     {
    //         eventId: "grubfest2024",
    //         eventName: "The Grub Fest",
    //         eventDate: "29/03/24",
    //         bookingStart: "20/03/24",
    //         bookingEnd: "28/03/24",
    //         totalTickets: -1,
    //         bookedTickets: 50000,
    //         description: "India's premier food festival",
    //         externalLink: "https://www.instagram.com/thegrubfest/?hl=en",
    //         ticketPrice: 800,
    //         category: "Concerts",
    //         thumbnail: "category/ConcertsHero.png",
    //     },
    //     {
    //         eventId: "engi2024",
    //         eventName: "EngiFest",
    //         eventDate: "15/02/24",
    //         location: "DTU Campus",
    //         bookingStart: "08/02/24",
    //         bookingEnd: "14/02/24",
    //         totalTickets: -1,
    //         bookedTickets: 100000,
    //         description: "Engifest DTU is the annual cultural festival hosted by Delhi Technological University (DTU), showcasing a blend of talent, creativity, and innovation through various competitions, performances, and events.",
    //         externalLink: "https://www.engifest.in/",
    //         ticketPrice: 0,
    //         category: "Concerts",
    //         thumbnail: "engifest.png",
    //     },
    // ]
    // data = data.concat(data)
    // data = data.concat(data)
    const [pop, setPop] = useState(false)
    let aRef = useRef()
    const navigate = useNavigate()
    return (
        <div className='w-full '>
            <div id="landing-home" className="absolute top-0 left-0 w-full h-full -z-10">
                <Suspense>

                    <HomeBackground />
                </Suspense>
            </div>
            <div className='mt-24 flex flex-col'>
                <div className="mx-24 w-2/5 my-20">
                    <div className="text-6xl my-4">The one stop solution for all your ticket needs</div>
                    <div className="flex h-10 text-3xl items-center" style={{ color: "var(--purple)" }}>
                        <span className="m-3">Purchase</span>
                        <div className="bg-white h-full" style={{ width: "1px" }}></div>
                        <span className="m-3">Resell</span>
                        <div className="bg-white h-full" style={{ width: "1px" }}></div>
                        <span className="m-3">Distribute</span>
                    </div >
                </div>
                <div className="glass-morphism absolute top-0 right-0 mt-44 w-1/3 mx-12 gap-10 rounded-lg h-3/4 flex flex-col p-16 justify-between">
                    <div className="flex flex-col items-start gap-6">
                        <div className="md:text-2xl text-xl text-left ">Explore various categories and on going events.</div>
                        <a href="#landing-category" className="bg-white text-black  hover:bg-black hover:text-white rounded-lg py-3 px-6 ">Click Here</a>
                    </div>
                    <div className="text-center ">or</div>
                    <div className="flex flex-col items-end gap-6">
                        <div className="md:text-2xl text-xl text-right ">Looking for hosting an event or partner with us?</div>
                        <button onClick={() => {
                            navigate("/company")
                        }} className="bg-white text-black hover:bg-black hover:text-white">Click Here</button>
                    </div>
                </div>

            </div>
            <div className="h-10 w-full"></div>
            <div id="landing-category" className="w-full h-full pt-32 mt-44">
                <div className="text-5xl mx-10">Categories</div>
                <div className="h-10 w-full"></div>
                <div className="absolute">
                    <Category tData={data} />
                </div>
            </div>
            <div className="h-20 w-full"></div>
            <div id="landing-featured" className="w-full relative mt-80 z-100">
                <div className="text-3xl text-white mx-10 mb-6 mt-24 pt-32">Featured</div>
                <TicketList data={data} />
                <div className="h-10 w-full"></div>
                <TicketList data={reverseArr(data)} />
            </div>
            <div className="h-20 w-full"></div>
            <AboutUs />
            {pop && <Popup setPop={setPop} />}

        </div>
    )
}

export default Home
