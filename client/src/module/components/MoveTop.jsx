import React, { useEffect } from 'react'
import { useState } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

export default function MoveTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div>

            {" "}
            {showTopBtn && (
                <BsFillArrowUpCircleFill
                    className="move-to-top"
                    onClick={goToTop}
                />
            )}{" "}
        </div>
    )
}
