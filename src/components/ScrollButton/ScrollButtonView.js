import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as ScrollToTopButton } from '../../assets/icons/Scroll_to_top.svg';

const Button = styled.div`
   position: fixed; 
   right: 0;
   bottom: 0;
   height: 80px;
   width: 80px;
   z-index: 10;
   cursor: pointer;
   transition: all 0.25s ease-out;
`;

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 200) {
            setVisible(true);
        } else if (scrolled <= 200) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
    }, []);

    return (
        <Button onClick={scrollToTop}
                style={visible 
                    ? {
                        opacity: 1,
                        visibility: "visible",
                    } 
                    : {
                        opacity: 0,
                        visibility: "hidden",
                    }}>
            <ScrollToTopButton />
        </Button>
    );
};

export default ScrollButton;
