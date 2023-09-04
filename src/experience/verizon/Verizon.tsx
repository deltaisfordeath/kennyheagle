import React, { useEffect, useLayoutEffect, useState } from 'react';
import { VisualTheme } from '../../App';
import './Verizon.scss';
import { VERIZON_EXPERIENCE } from './verizon-experience';

export default function Verizon({ theme }: { theme: VisualTheme }) {
    const [selectedProject, setSelectedProject] = useState('collab');

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
            if (top >= 0 && bottom <= window.innerHeight) {
                clearAnimationStyles(image);
                clearAnimationStyles(text);
                return;
            } else if (top < 0) {
                slideElementRight(image);
            } else {
                slideElementBottom(image);
            }

            if (top >= 0 && top < window.innerHeight) {
                clearAnimationStyles(text);
            } else {
                text.style.opacity = '0'
            };

        }

        const sections = document.querySelectorAll('.verizon-experience-section') as NodeListOf<HTMLDivElement>;

        function scrollAnimationLoop() {
            for (let i = 0; i < sections.length; ++i) {
                handleElementAnimation(sections[i]);
            }
        
            scroll(scrollAnimationLoop);
        }

        scrollAnimationLoop();
        
    }, [selectedProject, theme]);

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
            {VERIZON_EXPERIENCE.map((feature, idx) => <div key={idx} className="verizon-experience-section">
                <div style={{ "--resume-text-accent": theme === 'light' ? 'rgb(40, 50, 210)' : 'rgb(150, 230, 255)'} as React.CSSProperties} className="verizon-experience-text">
                    <div><span className="problem-solution">Problem:</span> {feature.problem}</div>
                    <div><span className="problem-solution">Solution:</span> {feature.solution}</div>
                </div>
                <div className="verizon-experience-image">
                    <img src={feature.image} alt={feature.imageAlt} />
                </div>
            </div>)}
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