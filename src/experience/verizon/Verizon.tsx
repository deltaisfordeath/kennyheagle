import React, { useEffect, useLayoutEffect, useState } from 'react';
import { VisualTheme } from '../../App';
import './Verizon.scss';
import { VERIZON_EXPERIENCE } from './verizon-experience';

export default function Verizon({ theme }: { theme: VisualTheme }) {
  const [selectedProject, setSelectedProject] = useState('collab');

  useEffect(() => {
    const scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) };

    function handleImageAnimation(el: HTMLElement) {
      const { top, bottom } = el.getBoundingClientRect();
      const image = el.children[0] as HTMLElement

      if (top > window.innerHeight - 100) {
        slideElementBottom(image);
      } else if (bottom < 180) {
        slideElementRight(image);
      } else clearAnimationStyles(image);

    }

    function handleTextAnimation(el: HTMLElement) {
      const { top, bottom } = el.getBoundingClientRect();

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
        <p>
        The first assignment I was placed on with Verizon was contributing to BlueJeans Collab Board, 
        a dynamic virtual whiteboard integrated with BlueJeans Meetings. Collab Board boasted an infinite canvas; 
        real time, low latency collaboration; and support for up to 1000 concurrent users. 
        Collab Board was built using React, TypeScript, SASS, MobX, RxJS, Material UI, and Node.js, 
        among other technologies. 
        </p>
        <p>
        Over the span of just a few short months, I had made considerable contributions 
        throughout the Collab Board component tree, and had become knowledgeable and competent with the app&apos;s 
        design patterns and architecture. My manager had some discussions with me about having me take over 
        technical leadership of Collab Board, but then word came from higher up the chain of command that 
        I was to be reassigned to Studio, a higher-priority BlueJeans project. 
        </p>
        Below is a small subset of my contributions to Collab Board.
      </div>
      {VERIZON_EXPERIENCE.map((feature, idx) => <div key={idx} className="verizon-experience-section">
        <div style={{ "--resume-text-accent": theme === 'light' ? 'rgb(40, 50, 210)' : 'rgb(150, 230, 255)' } as React.CSSProperties} className="verizon-experience-text">
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
      <div>
        <p>
          After proving myself on Collab Board, I was moved to a higher priority project, BlueJeans Studio.
          Studio is a virtual meeting platform that won the Enterprise Connect 2022 “Best Innovation
          for Virtual Meetings" award.
        </p>
        <p>Studio allowed for rich presentations by layering video and audio feeds
          from up to 9 concurrent panelists with overlays such as nametags, lower thirds, tickers,
          and other features commonly seen on professional news broadcasts. Additionally, studio offered
          real-time chat, interactive polling, and question and answer forums interwoven with the live
          meeting.
        </p>
        <p>
          Studio was built using React, TypeScript, SASS, MobX, RxJS, Material UI, Java, Spring,
          and CasparCG, among other technologies.
        </p>
      </div>

      <div>
        After a few small tasks in my first weeks getting familiar with Studio, another front-end developer
        and I were assigned to build a new dashboard for Studio users. Studio was a premium product built
        on top of BlueJeans Events, a multi-presenter event webcast platform without the rich, professional
        news broadcast quality layering features that Studio introduced. Events had three participant types:
        Moderators who controlled what could be seen and heard in the event, presenters who participated in
        the live event, and attendees who could view the event and participate in chats, polls, and question
        and answer forums.
      </div>
      <div>
        When I was brought onto the Studio project, development was solely focused on a dashboard for
        moderators who could add enhanced visuals to a live event. Attendees saw the enhancements in the
        fully rendered live feed, but presenters still awaited an upgraded experience that had the refreshed look
        and feel of the new moderator dashboard, but without the complexity of the moderator controls, and without
        the distracting delay of the fully rendered attendee live stream.
      </div>
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