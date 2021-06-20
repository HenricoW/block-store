import { useRef } from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ web3connect }) => {
    const walletConnect = (e) => {
        e.preventDefault();
        web3connect();
    };

    const navRef = useRef(null);
    const bgBlurRef = useRef(null);

    const showMobileMenu = () => {
        navRef.current.classList.remove("hidden-sm");
        bgBlurRef.current.classList.remove("hidden");
    };

    const hideMobileMenu = () => {
        navRef.current.classList.add("hidden-sm");
        bgBlurRef.current.classList.add("hidden");
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
                <div className="page-blur hidden" ref={bgBlurRef} onClick={() => hideMobileMenu()}></div>
                <nav className="menu hidden-sm" ref={navRef}>
                    <img
                        src="/images/exit.svg"
                        alt="close mobile menu"
                        className="menu-close"
                        onClick={() => hideMobileMenu()}
                    />
                    <ul onClick={() => hideMobileMenu()}>
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
                    <div className="nav-rh-icons" onClick={() => hideMobileMenu()}>
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
