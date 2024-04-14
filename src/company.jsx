import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { database } from "../firebaseConfig";
import { onValue, push, ref, set } from 'firebase/database';
import { useAuth0 } from "@auth0/auth0-react"
import hivesigner from "hivesigner"

function RootDiv({ setShow }) {
    return <div className="py-28 flex flex-col justify-center items-center px-28 gap-10 h-full w-full">
        <div className="text-4xl text-center">Welcome, what would you like to do?</div>
        <button onClick={() => { setShow("new") }} className="text-2xl bg-white text-black px-9 mt-16  hover:bg-black hover:text-white">New Event</button>
        <button onClick={() => { setShow("past") }} className="text-2xl bg-white text-black  hover:bg-black hover:text-white">Past Events</button>
    </div>

}
function NewDiv({ setShow }) {
    let token;
    try {

        token = window.location.href.split("?")[1].split("&")[0].split("=")[1]
    } catch {
        token = ""
    }
    let client;
    if (token != "") {
        client = new hivesigner.Client({
            app: 'demo',
            callbackURL: window.location.href,
            scope: ['vote', 'comment', "transfer"],
            accessToken: token
        });
    } else {
        client = new hivesigner.Client({
            app: 'demo',
            callbackURL: window.location.href,
            scope: ['vote', 'comment', "transfer"],
        });
        let state;
        var link = client.getLoginURL(state);
        window.location.replace(link);
    }


    let data = {
        eventId: "grubfest2024",
        eventName: "The Grub Fest",
        company: "somecompany",
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
    const [eventName, setEventName] = useState("")
    const [eventId, setId] = useState("")
    const [eventDate, setEventDate] = useState('');
    const [bookingStart, setBookingStart] = useState('');
    const [bookingEnd, setBookingEnd] = useState('');
    const [totalTickets, setTotalTickets] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState("")
    const [externalLink, setExternalLink] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [image, setImage] = useState('');
    return <div className="py-28 flex flex-col justify-center items-center px-28 gap-10 h-full w-full">
        <button onClick={() => { setShow("root") }} className=" absolute top-2 right-2  text-md bg-white text-black hover:bg-black hover:text-white">Return</button>
        <div className="  flex flex-col gap-4">
            <div className="flex gap-10">
                <div>
                    <div>Event Name</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="text"
                        value={eventName}
                        onChange={(e) => { setEventName(e.target.value) }}
                    />
                </div>
                <div>
                    <div>Event Id</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="text"
                        value={eventId}
                        onChange={(e) => { setId(e.target.value) }}
                    />

                </div>
            </div>
            <div className="flex gap-10">
                <div>
                    <div>Event Date</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="date"
                        value={eventDate}
                        onChange={(e) => { setEventDate(e.target.value) }}
                    />
                </div>

                <div>
                    <div>Booking Start</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="date"
                        value={bookingStart}
                        onChange={(e) => { setBookingStart(e.target.value) }}
                    />
                </div>

                <div>
                    <div>Booking End</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="date"
                        value={bookingEnd}
                        onChange={(e) => { setBookingEnd(e.target.value) }}
                    />
                </div>
            </div>
            <div className="flex gap-10 ">

                <div>
                    <div>Total Tickets</div>
                    <input
                        className="text-black rounded-lg h-10 w-32"
                        type="number"
                        value={totalTickets}
                        onChange={(e) => { setTotalTickets(e.target.value) }}
                    />
                </div>
                <div>
                    <div>Ticket Price</div>
                    <input
                        className="text-black rounded-lg h-10 w-32"
                        type="number"
                        value={ticketPrice}
                        onChange={(e) => { setTicketPrice(e.target.value) }}
                    />
                </div>
                <div>
                    <div>External Link</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="text"
                        value={externalLink}
                        onChange={(e) => { setExternalLink(e.target.value) }}
                        placeholder="Enter external link"
                    />
                </div>
            </div>

            <div className="flex gap-10">
                <div>
                    <div>Description</div>
                    <textarea
                        className="text-black rounded-lg h-10 w-96"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        placeholder="Enter event description"
                    />
                </div>
                <div>
                    <div>Category</div>

                    <input
                        type="text"
                        className="text-black rounded-lg h-10 w-32"
                        value={category}

                        onChange={(e) => { setCategory(e.target.value) }}
                    />
                </div>
            </div>
            <div className="flex gap-10">
                <div>
                    <div>Thumbnail</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="text"
                        value={thumbnail}
                        onChange={(e) => { setThumbnail(e.target.value) }}
                        placeholder="Enter thumbnail URL"
                    />
                </div>

                <div>
                    <div>Image</div>
                    <input
                        className="text-black rounded-lg h-10"
                        type="text"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                        placeholder="Enter image URL"
                    />
                </div>
            </div>


        </div>

        <button onClick={() => {
            let i = 0
            let t = []
            while (i < totalTickets) {
                let tickFormat = eventName[0] + eventName[1] + String(Math.ceil(Math.random() * 100000))
                if (!t.includes(tickFormat)) {
                    t.push(tickFormat)
                    i++
                }
            }

            let d = {
                eventId: eventId,
                eventName: eventName,
                company: "somecompany",
                eventDate: eventDate,
                bookingStart: bookingStart,
                bookingEnd: bookingEnd,
                totalTickets: totalTickets,
                bookedTickets: 0,
                description: description,
                externalLink: externalLink,
                ticketPrice: ticketPrice,
                category: category,
                thumbnail: thumbnail,
                image: image,
                tickets: t,
            }
            let string = `[\"data\",{\"event\":\"${eventName}\",\"num\":\"${t.length}\",\"tickets\":\"${t}\"}]`
            client.customJson([], ["divijmahajan2004"], "follow", string, function (err, res) {
                console.log(err, res)
            });
            console.log(JSON.parse(string))
            push(ref(database, `events/${category}`), d)
            setEventName("")
            setId("")
            setEventDate("")
            setBookingStart("")
            setBookingEnd("")
            setTotalTickets("")
            setDescription("")
            setExternalLink("")
            setTicketPrice("")
            setThumbnail("")
            setImage("")
        }} className="text-2xl bg-white text-black  hover:bg-black hover:text-white">Submit</button>
    </div >
}
function PastDiv({ setShow }) {
    let data = [
        {
            name: "Vihaan 007",
            date: "12/04/24",
            attendees: 500,
            link: "/Concert/Vihaan007"
        },
        {
            name: "EngiFest",
            date: "16/03/24",
            attendees: 1000000,
            link: "/Concert/EngiFest"
        },
    ]
    const navigate = useNavigate()
    return <div className="py-12 flex flex-col px-14 gap-10 h-full w-full">
        <button onClick={() => { setShow("root") }} className=" absolute top-2 right-2  text-md bg-white text-black hover:bg-black hover:text-white">Return</button>
        <div className="text-4xl text-center">Past Events</div>
        <table className="w-full text-xl ">
            <tr className="text-2xl  w-full gap-10 ">
                <th >Sno</th>
                <th >Event Name</th>
                <th>Date</th>
                <th>Attendees</th>
            </tr>
            <div className="h-3"></div>
            {data.map((d, i) => {
                return <tr onClick={() => {
                    navigate(d.link)
                }}>
                    <td className="text-center">{i}</td>
                    <td className="text-center">{d.name}</td>
                    <td className="text-center">{d.date}</td>
                    <td className="text-center">{d.attendees}</td>
                </tr>
            })}
        </table>
    </div>
}

function Company() {
    const routePath = useLocation();
    const onTop = () => {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        onTop()
    }, [routePath]);
    let tileLen = 56
    let rows = 10
    let tiles = []

    const [show, setShow] = useState("root")
    for (let j = 0; j < rows; j++) {
        let row = []
        for (let i = 0; i < window.innerWidth / tileLen + 1; i++) {
            row.push(<div key={i} className='bg-[--black]' style={{ width: `${tileLen}px`, height: `${tileLen}px`, margin: "1px" }}></div>)
        }
        tiles.push(row)
    }



    return (
        <div className='w-full h-full overflow-hidden '>
            <div className=' bg-[--light-black] w-full h-5/6 mt-24' />
            <div className='circle-gradient w-full h-full absolute top-0 left-0 mt-26' />
            <div className=' bg-gradient-to-b  from-transparent to-black w-full h-full absolute top-0 left-0 mt-24' />
            <div className='absolute top-0 left-0 mt-24'>
                {tiles.map((row, i) => {
                    return (<div key={i} className='flex'>
                        {row}
                    </div>)
                })}
            </div>
            <div className='absolute top-0 left-0 flex h-full w-full'>
                <div className="  -translate-x-1/2 glass-morphism absolute left-1/2 mt-32 w-1/2 mx-12  rounded-lg h-3/4  ">

                    {(show == "root") ?
                        <RootDiv setShow={setShow} />
                        : (show == "new") ?
                            <NewDiv setShow={setShow} />
                            : (show == "past") ?
                                <PastDiv setShow={setShow} />
                                : <div></div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Company


