import React, { useEffect, useLayoutEffect, useState } from 'react';
import { VisualTheme } from '../../App';
import './Verizon.scss';
import { COLLAB_BOARD_EXPERIENCE } from './verizon-experience';
import { Modal } from '@mui/material';

interface ImageModal {
  src: string,
  alt: string,
  caption: string,
}

export default function Verizon({ theme }: { theme: VisualTheme }) {
  const [selectedProject, setSelectedProject] = useState('collab');
  const [imageModal, setImageModal] = useState<ImageModal>(null);

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
      const images = document.querySelectorAll('.collab-experience-image') as NodeListOf<HTMLElement>;
      const text = document.querySelectorAll('.collab-experience-text') as NodeListOf<HTMLElement>;

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
      {COLLAB_BOARD_EXPERIENCE.map((feature, idx) => <div key={idx} className="collab-experience-section">
        <div style={{ "--resume-text-accent": theme === 'light' ? 'rgb(40, 50, 210)' : 'rgb(150, 230, 255)' } as React.CSSProperties} className="collab-experience-text">
          <div><span className="problem-solution">Problem:</span>{feature.problem}</div>
          <div><span className="problem-solution">Solution:</span>{feature.solution}</div>
        </div>
        <div className="collab-experience-image">
          <img src={feature.image} alt={feature.imageAlt} />
        </div>
      </div>)}
    </>
    )
  }

  function Studio() {
    return (<div style={{ "--resume-text-accent": theme === 'light' ? 'rgb(40, 50, 210)' : 'rgb(150, 230, 255)' } as React.CSSProperties}>
      {!!imageModal && <Modal
        open={true}
        onClose={() => {setImageModal(null)}}
        onClick={() => setImageModal(null)}
        aria-labelledby={imageModal?.alt}
        aria-describedby={`${imageModal?.alt} enlarged`}
      >
        <div className="studio-modal-background">
          <div className="studio-modal-content">
            <img src={imageModal.src} alt={imageModal.alt} />
            <div className="studio-modal-caption">
              {imageModal.caption}
            </div>
          </div>
        </div>
      </Modal>}

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
      <div className="studio-experience-section">
        <p>
          <span className="problem-solution">Background:</span>
          After a few small tasks in my first weeks getting familiar with Studio, another front-end developer
          and I were assigned to build a new dashboard for Studio users. Studio was a premium product built
          on top of BlueJeans Events, a multi-presenter event webcast platform without the rich, professional
          news broadcast quality layering features that Studio introduced. Events had three participant types:
          Moderators who controlled what could be seen and heard in the event, presenters who participated in
          the live event, and attendees who could view the event and participate in chats, polls, and question
          and answer forums.
        </p>
        <p>
          <span className="problem-solution">Problem:</span>
          Presenters needed a refreshed UI that showcased the enhanced features that Studio offered over classic
          BlueJeans Events. Moderators had a new dashboard showing a preview of what the live stream would look like,
          and attendees saw the fully rendered live stream with all its enhancements. Presenters still landed on
          the classic Events dashboard that didn&apos;t display on-stream chat messages, nametags, tickers, or
          other enriched elements. Presenters needed an upgraded experience similar to the new moderator dashboard,
          but without the added complexity of having moderator controls.
        </p>
        <p>
          <span className="problem-solution">Solution:</span>
          With the help of one other front-end developer, I was tasked with building a new dashboard for presenters
          from a forked repository from the moderator dashboard. As I looked through the designs and specifications
          for the new presenter dashboard, as well as the product roadmap for Studio, I felt that using a forked
          repository would result in a lot of duplicate work when rolling out new features over subsequent sprints.
          The moderator dashboard and new presenter dashboard were stylistically identical and shared a lot of
          functionality, with just some moderator control panels removed and some presenter cues added.
        </p>
        <div className="studio-dashboard-image-group">
          <div className="studio-dashboard-image" onClick={
            () => setImageModal({
              src: './img/ModeratorDashboard.png', 
              alt: 'The Studio Moderator Dashboard',
              caption: 'Studio Moderator Dashboard'
              })}>
            <img src="./img/ModeratorDashboard.png" alt="The Studio Moderator Dashboard" />
            <div className="studio-dashboard-image-caption">
              Studio Moderator Dashboard
            </div>
          </div>
          <div onClick={
            () => setImageModal({
              src: './img/PresenterDashboard.png', 
              alt: 'The Studio Presenter Dashboard',
              caption: 'Studio Presenter Dashboard'
              })} className="studio-dashboard-image">
            <img src="./img/PresenterDashboard.png" alt="The Studio Presenter Dashboard" />
            <div className="studio-dashboard-image-caption">
              Studio Presenter Dashboard
            </div>
          </div>

        </div>

      </div>
    </div>)
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