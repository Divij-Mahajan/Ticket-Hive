import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
gsap.registerPlugin(useGSAP);


export default function AboutUs() {
    let container = useRef()
    let translateVal = window.innerWidth * 2 / 5 - 70
    const { contextSafe } = useGSAP((context, contextSafe) => {
        gsap.to(".aboutus", { translateX: -translateVal });
    }, {});
    let x = 0

    const [close, setClose] = useState(true)



    let shift = contextSafe((translateVal) => {
        gsap.to(".aboutus", { translateX: translateVal });
    })



    return <div className="fixed aboutus  bottom-0 left-0 w-2/5 z-50 " onClick={() => {
        shift((close) ? -translateVal : 0)
        setClose(!close)
    }}>
        <img src="/aboutus.png" style={{ height: "100%", width: "100%", opacity: 0.95, }} ></img>
        <div className="absolute top-0 left-0 h-full w-full p-10 text-black" >
            <div className="text-xl ml-10">The UnBounds</div>
            {/* <div className="px-12 ml-10 pt-2"> Ticket Hive is a decentralised ticketing platform, providing users a once stop solution for all thier ticket needs with many great features.</div> */}
            <div className="px-12 ml-10 pt-4"> The UnBounds, the team behind Ticket Hive, is a team of 2 dedicated developers eager to explore various field and ready to take up any challenges thrown at them.</div>
            <div className="px-12 ml-16 pt-2 flex justify-between mr-10 items-center ">
                <div>
                    Rhytham Aggarwal
                </div>
                <div className="flex gap-2">

                    <a href="https://github.com/aggrhythm">
                        <FaGithub size={25} />
                    </a>
                    <a href="https://github.com/aggrhythm">
                        <FaLinkedinIn size={25} />
                    </a>
                </div>
            </div>

            <div className="px-12 ml-16 pt-1 flex  justify-between mr-10 items-center">
                <div>
                    Divij Mahajan
                </div>
                <div className="flex gap-2">

                    <a href="https://github.com/Divij-Mahajan">
                        <FaGithub size={25} />
                    </a>
                    <a href="https://www.linkedin.com/in/divij-mahajan-73b17b250/">
                        <FaLinkedinIn size={25} />
                    </a>
                </div>
            </div>
            {/* <div className="text-md mr-20 absolute right-0 bottom-0 mb-12 ">
                    Rhytham Aggarwal and Divij Mahajan
                </div> */}
        </div>

    </div>

}