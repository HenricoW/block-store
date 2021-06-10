export const Navigation = ({ web3connect }) => {
    const walletConnect = (e) => {
        e.preventDefault();
        web3connect();
    };

    return (
        <div className="navigation">
            <div className="container">
                <a href="/" className="logo">
                    <span>Web3</span> Store
                </a>
                <img src="/images/menu.svg" alt="open mobile menu" className="menu-open" />
                <nav className="menu">
                    <img src="/images/exit.svg" alt="close mobile menu" className="menu-close" />
                    <ul>
                        <li>
                            <a href="/products">Products</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                    <div className="nav-rh-icons">
                        <a href="/cart" className="cart-white">
                            <img src="/images/shopping-cart-white.svg" alt="your account" />
                        </a>
                        <a href="/cart" className="cart-black">
                            <img src="/images/shopping-cart-black.svg" alt="your account" />
                        </a>
                        <a href="/" className="wallet-black" onClick={walletConnect}>
                            <img src="/images/wallet-black.svg" alt="your account" />
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};
