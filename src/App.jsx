import "./App.css";

function App() {
    return (
        <>
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
                            <a href="/account">
                                <img src="/images/cart.png" alt="your account" />
                            </a>
                            <a href="/cart">
                                <img src="/images/cart.png" alt="shopping cart" />
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
            <section className="hero-section">
                <div className="container">
                    <div className="left-col">
                        <h1>Work out with a new style</h1>
                        <p>Presenting a new way to shop with Web 3.0</p>
                        <a href="/products">Experience it now!</a>
                    </div>
                    <img src="/images/image1.png" alt="hero image" />
                </div>
            </section>
            <section className="featured-products">
                <div className="container">
                    <h2>Featured Products</h2>
                    <div className="grid-featured">
                        <div className="product-card">
                            <img src="/images/product-1.jpg" alt="featured product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-2.jpg" alt="featured product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-3.jpg" alt="featured product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-4.jpg" alt="featured product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="exclusive-product">
                <div className="container">
                    <img src="/images/exclusive.png" alt="exclusive product" />
                    <div className="right-col">
                        <h3>Exclusively available on the Web3 Store</h3>
                        <h1>Smart Band 9000</h1>
                        <p>
                            The Smart Band 9000 can... wait for it... TELL THE TIME! Get this bleeding edge piece of
                            technology now. Be the envy of your friends
                        </p>
                        <a href="/product/1234">Buy now</a>
                    </div>
                </div>
            </section>
            <section className="featured-products">
                <div className="container">
                    <h2>Latest Products</h2>
                    <div className="grid-latest">
                        <div className="product-card">
                            <img src="/images/product-1.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-2.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-3.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-4.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-1.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-2.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-3.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-4.jpg" alt="latest product" />
                            <p>Product Title</p>
                            <div className="rating"></div>
                            <p>$ Price</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <div className="container">
                    <div className="grid-testimonial">
                        <div className="testimonial-card">
                            <img src="" alt="quote image" className="quote-image" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi harum eum ratione
                                culpa sapiente aliquid!
                            </p>
                            <div className="rating"></div>
                            <img src="/images/user-1.png" alt="reviewer's avatar" className="avatar" />
                            <div className="name">Mable Stewart</div>
                        </div>
                        <div className="testimonial-card">
                            <img src="" alt="quote image" className="quote-image" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi harum eum ratione
                                culpa sapiente aliquid!
                            </p>
                            <div className="rating"></div>
                            <img src="/images/user-1.png" alt="reviewer's avatar" className="avatar" />
                            <div className="name">Mable Stewart</div>
                        </div>
                        <div className="testimonial-card">
                            <img src="" alt="quote image" className="quote-image" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi harum eum ratione
                                culpa sapiente aliquid!
                            </p>
                            <div className="rating"></div>
                            <img src="/images/user-1.png" alt="reviewer's avatar" className="avatar" />
                            <div className="name">Mable Stewart</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="brands">
                <div className="container">
                    <div className="flex-brands">
                        <img src="/images/logo-paypal.png" alt="brand logo" />
                        <img src="/images/logo-paypal.png" alt="brand logo" />
                        <img src="/images/logo-paypal.png" alt="brand logo" />
                        <img src="/images/logo-paypal.png" alt="brand logo" />
                        <img src="/images/logo-paypal.png" alt="brand logo" />
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="grid-footer">
                        <div className="brand-signature">
                            <img src="/images/logo-white.png" alt="store logo" />
                            <p>
                                Here at Web3 Store we want to make the world a better place by providing technological
                                alternatives to the mainstream approach of how things are done. We invite you to join us
                                on this mission.
                            </p>
                        </div>
                        <div className="useful-links">
                            <ul>
                                <li>Coupons</li>
                                <li>Blog posts</li>
                                <li>Returns</li>
                                <li>Become an Affiliate</li>
                            </ul>
                        </div>
                        <div className="socials">
                            <a href="/" className="social-link">
                                <img src="/images/facebook.svg" alt="Facebook link" />
                            </a>
                            <a href="/" className="social-link">
                                <img src="/images/facebook.svg" alt="Twitter link" />
                            </a>
                            <a href="/" className="social-link">
                                <img src="/images/instagram.svg" alt="Instagram link" />
                            </a>
                            <a href="/" className="social-link">
                                <img src="/images/youtube.svg" alt="YouTube link" />
                            </a>
                        </div>
                        <div className="copyright">
                            <p>Copyright &copy; RicoTech 2021</p>
                            <a href="https://www.flaticon.com/packs/social-logo-3">Logos from flaticon.com</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
