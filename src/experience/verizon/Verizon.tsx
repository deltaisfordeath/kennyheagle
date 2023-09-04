import React, { useEffect, useLayoutEffect, useState } from 'react';
import { VisualTheme } from '../../App';
import './Verizon.scss';
import { VERIZON_EXPERIENCE } from './verizon-experience';

export default function Verizon({ theme }: { theme: VisualTheme }) {
    const [selectedProject, setSelectedProject] = useState('collab');

    useEffect(() => {
        const scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)};

        function handleImageAnimation(el: HTMLElement) {
            const {top, bottom} = el.getBoundingClientRect();
            const image = el.children[0] as HTMLElement

                        if (top > window.innerHeight - 100) {
                slideElementBottom(image);
            } else if (bottom < 180) {
                slideElementRight(image);
            } else clearAnimationStyles(image);

        }

        function handleTextAnimation(el: HTMLElement) {
            const {top, bottom} = el.getBoundingClientRect();

            if (top > window.innerHeight - 100) {
                el.style.opacity = '0';
            } else if (bottom < 120) {
                el.style.opacity = '0';
            } else el.style.opacity = '1';
        }

        function scrollAnimationLoop() {
            const images = document.querySelectorAll('.verizon-experience-image') as NodeListOf<HTMLElement>;
            const text = document.querySelectorAll('.verizon-experience-text') as NodeListOf<HTMLElement>;

            for (let i = 0; i < images.length; ++i) {
                handleImageAnimation(images[i]);
                handleTextAnimation(text[i]);
            }
        
            scroll(scrollAnimationLoop);
        }

        scrollAnimationLoop();
        
    }, [selectedProject, theme]);

    function slideElementRight(el: HTMLElement) {
        el.style.left = window.visualViewport.width + 'px';
    }

    function slideElementBottom(el: HTMLElement) {
        el.style.top = window.visualViewport.height + 'px';
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