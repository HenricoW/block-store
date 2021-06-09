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
                                <img src="/images/shopping-cart-empty-side-view.svg" alt="your account" />
                            </a>
                            {/* <a href="/cart">
                                <img src="/images/cart.png" alt="shopping cart" />
                            </a> */}
                        </div>
                    </nav>
                </div>
            </div>
            <section className="hero-section">
                <div className="container">
                    <div className="left-col">
                        <h1>Work out with new style</h1>
                        <p>Presenting a new way to shop with Web 3.0</p>
                        <a href="/products">Experience it now!</a>
                    </div>
                    <img src="/images/image1.png" alt="hero" />
                </div>
            </section>
            <section className="featured-products">
                <div className="container">
                    <h2>Featured Products</h2>
                    <div className="grid-featured">
                        <div className="product-card">
                            <img src="/images/product-3.jpg" alt="featured product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 129.95</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-1.jpg" alt="featured product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 129.95</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-9.jpg" alt="featured product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 129.95</p>
                            </div>
                        </div>
                        <div className="product-card hidden-sm">
                            <img src="/images/product-4.jpg" alt="featured product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 129.95</p>
                            </div>
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
            <section className="latest-products">
                <div className="container">
                    <h2>Latest Products</h2>
                    <div className="grid-latest">
                        <div className="product-card">
                            <img src="/images/product-5.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <img src="/images/product-2.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                        <div className="product-card hidden-sm">
                            <img src="/images/product-3.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                        <div className="product-card hidden-sm">
                            <img src="/images/product-4.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                        <div className="product-card hidden-sm">
                            <img src="/images/product-1.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                        <div className="product-card hidden-sm">
                            <img src="/images/product-6.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                        <div className="product-card hidden-sm">
                            <img src="/images/product-7.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                        <div className="product-card hidden-sm">
                            <img src="/images/product-8.jpg" alt="latest product" />
                            <div className="card-text">
                                <h4>Product Title</h4>
                                <div className="rating"></div>
                                <p>$ 99.95</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <div className="container">
                    <div className="grid-testimonial">
                        <div className="testimonial-card">
                            <img src="/images/quote-blue.png" alt="quote" className="quote-image" />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, reiciendis.
                                Laudantium libero harum error voluptatibus nisi nesciunt autem sequi laboriosam.
                            </p>
                            <div className="rating"></div>
                            <img src="/images/user-1.png" alt="reviewer's avatar" className="avatar" />
                            <div className="name">Mable Stewart</div>
                        </div>
                        <div className="testimonial-card">
                            <img src="/images/quote-blue.png" alt="quote" className="quote-image" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi harum eum ratione
                                culpa sapiente aliquid!
                            </p>
                            <div className="rating"></div>
                            <img src="/images/user-2.png" alt="reviewer's avatar" className="avatar" />
                            <div className="name">Deshawn Richards</div>
                        </div>
                        <div className="testimonial-card">
                            <img src="/images/quote-blue.png" alt="quote" className="quote-image" />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum porro ullam veritatis
                                doloremque itaque voluptate placeat, quidem provident.
                            </p>
                            <div className="rating"></div>
                            <img src="/images/user-3.png" alt="reviewer's avatar" className="avatar" />
                            <div className="name">Tracy McGregor</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="brands">
                <div className="container">
                    <div className="grid-brands">
                        <img src="/images/logo-oppo.png" alt="brand logo" />
                        <img src="/images/logo-coca-cola.png" alt="brand logo" />
                        <img src="/images/logo-paypal.png" alt="brand logo" />
                        <img src="/images/logo-philips.png" alt="brand logo" />
                        <img src="/images/logo-godrej.png" alt="brand logo" />
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="grid-footer">
                        <div className="brand-signature">
                            {/* <img src="/images/logo-white.png" alt="store logo" /> */}
                            <h1>
                                <span>Web3</span> Store
                            </h1>
                            <p>
                                Here at Web3 Store we want to make the world a better place by providing technological
                                alternatives to the mainstream approach of how things are done. We invite you to join us
                                on this mission.
                            </p>
                        </div>
                        <div className="footer-links">
                            <div className="useful-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li>
                                        <a href="/">Coupons</a>
                                    </li>
                                    <li>
                                        <a href="/">Blog posts</a>
                                    </li>
                                    <li>
                                        <a href="/">Returns</a>
                                    </li>
                                    <li>
                                        <a href="/">Join our Affiliates</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="socials">
                                <h4>Social Media</h4>
                                <div className="social-icons">
                                    <a href="/" className="social-link">
                                        <img src="/images/facebook.svg" alt="Facebook link" />
                                    </a>
                                    <a href="/" className="social-link">
                                        <img src="/images/twitter.svg" alt="Twitter link" />
                                    </a>
                                    <a href="/" className="social-link">
                                        <img src="/images/instagram.svg" alt="Instagram link" />
                                    </a>
                                    <a href="/" className="social-link">
                                        <img src="/images/youtube.svg" alt="YouTube link" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="copyright">
                            <p>Copyright &copy; RicoTech 2021</p>
                            <div>
                                Icons made by{" "}
                                <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">
                                    Pixel perfect
                                </a>{" "}
                                from{" "}
                                <a href="https://www.flaticon.com/" title="Flaticon">
                                    www.flaticon.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
