import { useState } from "react"
import { useNavigate } from "react-router-dom"


function RootDiv({ setShow }) {
    return <div className="py-28 flex flex-col justify-center items-center px-28 gap-10 h-full w-full">
        <div className="text-4xl text-center">Welcome, what would you like to do?</div>
        <button onClick={() => { setShow("new") }} className="text-2xl bg-white text-black px-9 mt-16  hover:bg-black hover:text-white">New Event</button>
        <button onClick={() => { setShow("past") }} className="text-2xl bg-white text-black  hover:bg-black hover:text-white">Past Events</button>
    </div>

}
function NewDiv({ setShow }) {
    return <div className="py-28 flex flex-col justify-center items-center px-28 gap-10 h-full w-full">
        <button onClick={() => { setShow("root") }} className=" absolute top-2 right-2  text-md bg-white text-black hover:bg-black hover:text-white">Return</button>

        <button onClick={() => { setShow("past") }} className="text-2xl bg-white text-black  hover:bg-black hover:text-white">Submit</button>
    </div>
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


