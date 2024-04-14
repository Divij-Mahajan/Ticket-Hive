import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);



function Category() {
    const container = useRef();
    const navigate = useNavigate()
    let selected = 1;
    let translateVal = window.innerWidth / 2 - 325
    let translateStep = 458
    const { contextSafe } = useGSAP((context, contextSafe) => {
        gsap.set(".category", { width: 480, height: 300, opacity: 0.5, translateX: translateVal });
        gsap.set(`.cat-1`, { opacity: 1, width: 640, height: 400 })
    }, { scope: container });

    // let fadeIn = contextSafe((category) => {
    //     gsap.to(`.cat-${category}`, { opacity: 0.5, width: 480, height: 300, duration: 0.5, ease: "power1.out" })
    // })
    // let fadeOut = contextSafe((category) => {
    //     gsap.to(`.cat-${category}`, { opacity: 1, width: 640, height: 400, duration: 0.5, delay: 1.0, ease: "power1.out" })
    // })
    let shift = contextSafe((translateVal) => {
        gsap.to(".category", { translateX: translateVal });
    })
    function shiftRight() {
        if (selected < 7) {
            contextSafe((category) => {
                gsap.to(`.cat-${category}`, { opacity: 0.5, width: 480, height: 300, duration: 0.5, ease: "power1.out" })
                gsap.to(`.cat-${category + 1}`, { opacity: 1, width: 640, height: 400, duration: 0.5, delay: 0.5, ease: "power1.out" })
            })(selected)
            selected++
            translateVal -= translateStep
            shift(translateVal)
        }
    }
    function shiftLeft() {
        if (selected > 1) {
            contextSafe((category) => {
                gsap.to(`.cat-${category}`, { opacity: 0.5, width: 400, height: 250, duration: 0.5, ease: "power1.out" })
                gsap.to(`.cat-${category - 1}`, { opacity: 1, width: 640, height: 400, duration: 0.5, delay: 0.5, ease: "power1.out" })
            })(selected)
            selected--
            translateVal += translateStep
            shift(translateVal)
        }
    }


    let categories = [
        "Sports",
        "Movies",
        "Hotels",
        "Airlines",
        "Trains",
        "Bus",
        "Concerts",
    ]
    return <div className="w-full h-full flex flex-col categories gap-3 items-center" ref={container}>
        <div className="flex h-2/3 gap-6 items-center mx-5 overflow-hidden">
            {categories.map((category, i) => {
                return <img key={i} className={`cat-` + String(i + 1) + " category rounded-sm "} src={`/category/${category}Nav.png`} />
            })}
        </div>
        <div className="absolute h-full w-full bg-gradient-to-r from-black via-transparent to-black">
            <div onClick={() => {
                navigate(`/${categories[selected - 1]}`)
            }} style={{ width: 640, height: 400, marginLeft: window.innerWidth / 2 - 305, marginTop: 40 }}></div>
        </div>
        <div className="flex gap-10 z-10">

            <button className="bg-[--gray] text-white" onClick={() => {
                shiftLeft(selected)
            }}>Prev</button>
            <button className="bg-[--gray] text-white" onClick={() => {
                shiftRight(selected)
            }}>Next</button>
        </div>
    </div>
}
export default Category