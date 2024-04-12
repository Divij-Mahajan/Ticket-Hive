import { useNavigate } from "react-router-dom";
import logo from "/logo.png"

function Header() {
    const navigate = new useNavigate()
    return (
        <div className="fixed top-0 left-0 bg-[--black] h-24 z-10 p-7 flex justify-between" style={{ width: "100vw" }}>
            <div className="flex items-center">

                <img src={logo} width={55} />
                <div className="text-4xl font-black ml-4" onClick={() => { navigate("/") }}>
                    Ticket Hive
                </div>
            </div>
            <div className="text-2xl mr-4 flex items-center gap-10">
                <a href="#landing-home">Home</a>
                <a href="#landing-category">Category</a>
                <a href="#landing-featured">Featured</a>

            </div>
        </div>
    );
}

export default Header;