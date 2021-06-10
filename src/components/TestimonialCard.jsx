import React from "react";

export const TestimonialCard = (props) => {
    const { text, image, name, hiddenSm } = props;

    return (
        <div className={`testimonial-card ${hiddenSm && "hidden-sm"}`}>
            <img src="/images/quote-blue.png" alt="quote" className="quote-image" />
            <p>{text}</p>
            <div className="rating"></div>
            <div className="reviewer">
                <img src={`/images/${image}`} alt="reviewer's avatar" className="avatar" />
                <div className="name">{name}</div>
            </div>
        </div>
    );
};
