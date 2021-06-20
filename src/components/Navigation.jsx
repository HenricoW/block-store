import { useRef } from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ web3connect }) => {
    const walletConnect = (e) => {
        e.preventDefault();
        web3connect();
    };

    const navRef = useRef(null);

    const showMobileMenu = () => {
        navRef.current.classList.remove("hidden-sm");
    };

    const hideMobileMenu = () => {
        navRef.current.classList.add("hidden-sm");
    };

    return (
        <div className="navigation">
            <div className="container">
                <Link to="/" className="logo">
                    <span>Web3</span> Store
                </Link>
                <img
                    src="/images/menu.svg"
                    alt="open mobile menu"
                    className="menu-open"
                    onClick={() => showMobileMenu()}
                />
                <nav className="menu hidden-sm" ref={navRef}>
                    <img
                        src="/images/exit.svg"
                        alt="close mobile menu"
                        className="menu-close"
                        onClick={() => hideMobileMenu()}
                    />
                    <ul>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contLinkct">Contact</Link>
                        </li>
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                    </ul>
                    <div className="nav-rh-icons">
                        <Link to="/cart" className="cart-white">
                            <img src="/images/shopping-cart-white.svg" alt="your account" />
                        </Link>
                        <Link to="/" className="wallet-white" onClick={walletConnect}>
                            <img src="/images/wallet-white.svg" alt="your account" />
                        </Link>
                        <Link to="/cart" className="cart-black">
                            <img src="/images/shopping-cart-black.svg" alt="your account" />
                        </Link>
                        <Link to="/" className="wallet-black" onClick={walletConnect}>
                            <img src="/images/wallet-black.svg" alt="your account" />
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};
