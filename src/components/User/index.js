import React, { useRef, useEffect, useState } from 'react';
import { Tooltip } from 'antd';

export const User = ({ user }) => {
  const { photo, name, position, email, phone } = user;
  const [tipShow, setTipShow] = useState(false);
  let spanRef = useRef(null);
  let parentRef = useRef(null);
  useEffect(() => {
    window.addEventListener('resize', () => {
      
      if (
        textWidth(spanRef.current.innerText) > parentRef.current.offsetWidth
      ) {
        setTipShow(true);
      }
    });
    if (textWidth(spanRef.current.innerText) > parentRef.current.offsetWidth) {
      setTipShow(true);
    }
  }, [setTipShow]);
  return (
    <div className="User" ref={parentRef}>
      <div className="User__avatar">
        <img src={photo} alt={name} />
      </div>
      <h3 className="User__name">{name}</h3>
      <span className="User__position">{position}</span>
      <Tooltip
        placement="bottom"
        className="User__email"
        title={tipShow ? email : ''}
        
      >
      <span ref={spanRef}>
      {email}
      </span>
        
      </Tooltip>
      <span className="User__phone">{phone}</span>
    </div>
  );
};

function textWidth(text, fontProp) {
  var tag = document.createElement('div');
  tag.style.position = 'absolute';
  tag.style.left = '-99in';
  tag.style.whiteSpace = 'nowrap';
  tag.style.font = fontProp;
  tag.innerHTML = text;

  document.body.appendChild(tag);
  var result = tag.clientWidth;
  document.body.removeChild(tag);
  return result;
}
