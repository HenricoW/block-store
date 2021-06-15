import React, { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scroll(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
