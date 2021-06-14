import { Link } from "react-router-dom";

export const ButtonCTA = (props) => {
    const { to, isHero, fn } = props;

    const handleClick = (e) => {
        e.preventDefault();
        fn();
    };

    return (
        <Link to={to} className={`btn-cta ${isHero ? "btn-hero" : ""}`} onClick={handleClick}>
            {props.children}
        </Link>
    );
};
