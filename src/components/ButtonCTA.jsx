export const ButtonCTA = (props) => {
    const { to, isHero, fn } = props;

    const handleClick = (e) => {
        e.preventDefault();
        fn();
    };

    return (
        <a href={to} className={`btn-cta ${isHero ? "btn-hero" : ""}`} onClick={handleClick}>
            {props.children}
        </a>
    );
};
