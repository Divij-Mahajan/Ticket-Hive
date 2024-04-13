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
    return (
        <div className="fixed top-0 left-0 bg-[--black] h-24 z-10 p-7 flex justify-between" style={{ width: "100vw" }}>
            <div className="flex items-center">

                <img src={logo} width={55} />
                <div className="text-4xl font-black ml-4" onClick={() => { navigate("/") }}>
                    Ticket Hive
                </div>
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