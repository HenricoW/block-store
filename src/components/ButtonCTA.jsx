// import React, { Children } from "react";

export const ButtonCTA = (props) => {
    const { to, isHero } = props;

    return (
        <a href={to} className={`btn-cta ${isHero ? "btn-hero" : ""}`}>
            {props.children}
        </a>
    );
};
