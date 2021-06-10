import React from "react";

export const Footer = () => {
    return (
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
                            alternatives to the mainstream approach of how things are done. We invite you to join us on
                            this mission.
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
        </footer>
    );
};
