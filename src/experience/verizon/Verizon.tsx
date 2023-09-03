import React, { useEffect, useLayoutEffect, useState } from 'react';
import { VisualTheme } from '../../App';
import './Verizon.scss';

export default function Verizon({ theme }: { theme: VisualTheme }) {
    const [selectedProject, setSelectedProject] = useState('collab');
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useLayoutEffect(() => {
        const images = document.querySelectorAll('.verizon-experience-image > img') as NodeListOf<HTMLImageElement>;
        for (let i = 0; i < images.length; ++i) {
            slideElementBottom(images[i]);
        }
    }, [])

    useEffect(() => {
        const scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)};

        function handleElementAnimation(el: HTMLElement) {
            const {top, bottom} = el.getBoundingClientRect();

            const text = el.children[0] as HTMLElement;
            const image = el.children[1].children[0] as HTMLElement;
            console.log(text, image);
            if (top >= 0 && bottom <= window.innerHeight) {
                console.log('clearing animation styles');
                clearAnimationStyles(text);
                clearAnimationStyles(image);
                return;
            } else if (top < 0) {
                slideElementRight(image);
            } else {
                slideElementBottom(image);
            }
            text.style.opacity = '0';

        }

        const sections = document.querySelectorAll('.verizon-experience-section') as NodeListOf<HTMLDivElement>;

        function scrollAnimationLoop() {
            for (let i = 0; i < sections.length; ++i) {
                handleElementAnimation(sections[i]);
            }
        
            scroll(scrollAnimationLoop);
        }

        scrollAnimationLoop();
        
    }, [imagesLoaded]);

    function slideElementRight(el: HTMLElement) {
        el.style.left = window.innerWidth - el.clientWidth + 'px';
    }

    function slideElementBottom(el: HTMLElement) {
        el.style.top = window.innerHeight - el.clientHeight + 'px';
    }

    function clearAnimationStyles(el: HTMLElement) {
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.opacity = '1';
    }

    function CollabBoard() {
        return (<>
            <div>
                The first assignment I was placed on with Verizon was contributing to BlueJeans Collab Board, a dynamic virtual whiteboard integrated with BlueJeans Meetings. Collab Board boasted an infinite canvas; real time, low latency collaboration; and support for up to 1000 concurrent users.
            </div>
            <div className="verizon-experience-section">
                <div className="verizon-experience-text">
                    I coded a feature that enabled easy alignment of groups of shapes.
                </div>
                <div className="verizon-experience-image">
                    <img src="./img/GroupAlign.gif" alt="Easily align groups of images" />
                </div>
            </div>
            <div className="verizon-experience-section">
                <div className="verizon-experience-text">
                    I coded a feature making it easy to draw straight lines.
                </div>
                <div className="verizon-experience-image">
                    <img src="./img/Penstroke.gif" alt="Easily draw perfectly straight lines" />
                </div>
            </div>
            <div className="verizon-experience-section">
                <div className="verizon-experience-text">
                    I coded a feature making it easy to draw straight lines.
                </div>
                <div className="verizon-experience-image">
                    <img src="./img/PerfectShape.gif" alt="Easily draw perfectly straight lines" />
                </div>
            </div>
            <div className="verizon-experience-section">
                <div className="verizon-experience-text">
                    I coded a feature making it easy to draw straight lines.
                </div>
                <div className="verizon-experience-image">
                    <img onLoad={() => setImagesLoaded(true)} src="./img/SwitchShape.gif" alt="Easily draw perfectly straight lines" />
                </div>
            </div>
        </>
        )
    }

    function Studio() {
        return (<>
            This page is under active development, check back soon!
        </>)
    }

    return <div className={`verizon-experience-container page-container ${theme}`}>
        <div className="verizon-project-navigation">
            <div onClick={() => setSelectedProject('collab')} className={`verizon-project-button ${theme} ${selectedProject === 'collab' ? 'selected' : ''}`}>BlueJeans Collab Board</div>
            <div onClick={() => setSelectedProject('studio')} className={`verizon-project-button ${theme} ${selectedProject === 'studio' ? 'selected' : ''}`}>BlueJeans Studio</div>
        </div>
        {selectedProject === 'collab' ?
            <CollabBoard />
            :
            <Studio />
        }
    </div>
}