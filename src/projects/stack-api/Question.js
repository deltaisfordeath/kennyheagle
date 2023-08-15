import React, { useState } from 'react';
import Answer from './Answer';
import Loader from './Loader';
import { getAnswers } from './requests';
import './Question.css';

export default function Question(props) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  let question = props.question;
  let score = question.score;
  let numAnswers = question.answer_count;
  let numViews = question.view_count;
  let askDate = new Date(question.creation_date * 1000);
  let answerList = question.answers;
  let hasAnswers = numAnswers > 0;

  async function handleClick() {
    setShowAnswers(!showAnswers);
    if (hasAnswers && !answers.length) {
      setLoading(true);
      let response = await getAnswers(answerList);
      setAnswers(response);
      setLoading(false);
    }
  }

  function answerSection() {
    if (loading) {
      return <Loader />;
    } else if (hasAnswers) {
      return answers.map((a) => <Answer answer={a} key={a.answer_id} />);
    } else {
      return <Answer answer={{ body: null }} key="empty" />;
    }
  }

  //dangerouslySetInnerHTML - HTML needs to be sanitized! **********
  return (
    <div className="Question" onClick={handleClick}>
      <div
        className="Question-title"
        dangerouslySetInnerHTML={{ __html: question.title }}
      ></div>
      <div
        className="Question-body"
        dangerouslySetInnerHTML={{ __html: question.body }}
      ></div>
      <div className="Question-footer">
        <div className="Question-stats">
          <span>Score: {score}</span>
          <span>Views: {numViews}</span>
          <span>Answers: {numAnswers}</span>
          <strong>Asked on: {askDate.toDateString()}</strong>
        </div>
        <div className="Question-tags">
          <strong>Tags:</strong>
          {question.tags.map((tag, idx) => (
            <span className="Question-tag" key={idx}>{` ${tag} `}</span>
          ))}
        </div>
      </div>
      {showAnswers ? answerSection() : ''}
    </div>
  );
}
