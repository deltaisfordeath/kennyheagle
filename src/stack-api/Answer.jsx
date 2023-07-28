import React from 'react';
import './Answer.css';

export default function Answer(props) {
  if (!props.answer.body) {
    return <div className="Answer">This question has not been answered.</div>;
  }

  let answer = props.answer;
  let answerDate = new Date(props.answer.creation_date * 1000);
  //dangerouslySetInnerHTML - HTML needs to be sanitized! **********
  return (
    <div className={`Answer ${answer.is_accepted ? 'accepted' : ''}`}>
      {answer.is_accepted ? (
        <div className="accepted-header">Accepted Answer</div>
      ) : (
        ''
      )}
      <div
        className={`Answer-body ${answer.is_accepted ? 'accepted' : ''}`}
        dangerouslySetInnerHTML={{ __html: answer.body }}
      ></div>
      <div className="Answer-footer">
        Answered by{' '}
        <span
          dangerouslySetInnerHTML={{ __html: answer.owner.display_name }}
        ></span>
        {' on '}
        {answerDate.toDateString()}
      </div>
    </div>
  );
}
