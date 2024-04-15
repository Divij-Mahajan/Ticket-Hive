import TicketElement from "./TicketElement";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(useGSAP);

export default function TicketList({ data }) {

    let n = data.length
    let selected = 0
    let ticketWidth = window.innerWidth / 5
    let translateVal = 0
    const container = useRef();
    const { contextSafe } = useGSAP((context, contextSafe) => {
    }, { scope: container });
    let shift = contextSafe((translateVal) => {
        gsap.to(".events-list", { translateX: translateVal });
    })
    function shiftRight() {
        if (selected <= Math.ceil(n / 5) * 5) {
            selected += 5
            translateVal -= ticketWidth * 5
            shift(translateVal)
        }
    }
    function shiftLeft() {
        if (selected > 0) {
            selected -= 5
            translateVal += ticketWidth * 5
            shift(translateVal)
        }
    }
    return <div className="w-full overflow-hidden relative" ref={container}>
        <div className="h-48 flex events-list gap-1 m-0">
            {data.map((d, i) => {
                return <div key={i} className="w-72 relative" >
                    <TicketElement image={d.thumbnail} text={d.eventName} link={`/${d.category}/${d.eventId}`} />
                </div>
            })}
        </div>
        <div onClick={shiftLeft} className="cursor-pointer z-10 bg-gradient-to-r from-[rgba(0,0,0,0.82)] via-[rgba(0,0,0,0.42)] to-transparent absolute top-0 left-0 text-3xl font-light flex items-center h-full pl-2 pr-5 w-16">{"<"}</div>
        <div onClick={shiftRight} className="cursor-pointer z-10 bg-gradient-to-l from-[rgba(0,0,0,0.82)] via-[rgba(0,0,0,0.42)] to-transparent absolute top-0 right-0 text-3xl font-light flex items-center h-full pl-5 pr-2 w-16">{">"}</div>
    </div>
}