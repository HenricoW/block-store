import { Link } from "react-router-dom";

export const ButtonCTA = (props) => {
    const { to, isHero, fn } = props;

    return (
        <Link to={to} className={`btn-cta ${isHero ? "btn-hero" : ""}`} onClick={() => fn()}>
            {props.children}
        </Link>
    );
};
