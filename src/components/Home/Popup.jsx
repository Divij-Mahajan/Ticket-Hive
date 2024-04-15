export default function Popup({ setPop, head, body }) {
    return <div className="fixed top-0 left-0 h-full w-full z-50 pop-background">
        <div className="items-center flex flex-col justify-between p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 pop-morphism">
            <div className="text-black">
                <div className="text-3xl mb-8">{head}</div>
                <div>{body}</div>
            </div>
            <button className="w-32 mr-10" onClick={() => { setPop(false) }}>Okay</button>
        </div>
    </div>
}