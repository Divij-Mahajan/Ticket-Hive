import { useNavigate } from "react-router-dom";
import logo from "/logo.png"
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
    );
};


function Header() {
    const navigate = new useNavigate()
    const { user, isAuthenticated, isLoading } = useAuth0();
    let categories = [
        "Sports",
        "Movies",
        "Hotels",
        "Airlines",
        "Trains",
        "Bus",
        "Concerts",
    ]
    return (
        <div className="fixed top-0 left-0  h-24 z-50 p-7 flex justify-between header-div" style={{ width: "100vw" }}>
            <div className="flex items-center">

                <img src={logo} width={55} />
                <div className="text-4xl font-black ml-4" onClick={() => { navigate("/") }}>
                    Ticket Hive
                </div>
            </div>
            <div className="flex items-center gap-5 text-xl">
                {categories.map((category, i) => {
                    return <div className="hover:scale-110" onClick={() => { navigate(`/${category}`) }}>{category}</div>
                })}
            </div>
            <div className="text-2xl mr-4 flex items-center gap-10">
                {(isAuthenticated) ?
                    <LogoutButton /> :
                    <LoginButton />
                }

            </div>
        </div>
    );
}

export default Header;