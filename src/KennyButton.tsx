import React from 'react';
import './KennyButton.scss';

export type KennyButtonProps = {
   callback: () => any,
   text: string
}

function KennyButton(props: KennyButtonProps) {
   return <>
      <div className="heagle-button" onClick={props.callback}>{props.text}
      </div>
   </>
}

export default KennyButton;