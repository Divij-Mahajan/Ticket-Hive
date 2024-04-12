import { useNavigate } from "react-router-dom"
export default function TicketElement({ image, text, link = "" }) {
    const navigate = useNavigate()
    return <div onClick={() => {
        navigate(link)
    }} className="h-full w-72">
        <img className="-z-10" src={image} style={{ width: "100%", height: "100%" }} />
        <div className="text-3xl px-6 py-3 flex justify-end items-end z-10 absolute top-0 left-0 w-full h-full opacity-0 text-white bg-gradient-to-t from-black to to-transparent hover:opacity-100">
            {text}
        </div>
    </div>
}