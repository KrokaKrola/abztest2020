import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "antd";

export const User = ({ user }) => {
  const { photo, name, position, email, phone } = user;
  const [emailTipShow, setEmailTipShow] = useState(false);
  const [nameTipShow, setNameTipShow] = useState(false);
  let spanRef = useRef(null);
  let parentRef = useRef(null);
  let nameRef = useRef(null);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (
        textWidth(spanRef.current.innerText) > parentRef.current.offsetWidth
      ) {
        setEmailTipShow(true);
      }
      if (
        textWidth(nameRef.current.innerText) > parentRef.current.offsetWidth
      ) {
        setNameTipShow(true);
      }
    });
    if (textWidth(spanRef.current.innerText) > parentRef.current.offsetWidth) {
      setEmailTipShow(true);
    }
    if (textWidth(nameRef.current.innerText) > parentRef.current.offsetWidth) {
      setNameTipShow(true);
    }
  }, [setEmailTipShow, nameRef]);
  return (
    <div className="User" ref={parentRef}>
      <div className="User__avatar">
        <img src={photo || 'https://via.placeholder.com/70'} alt={name} />
      </div>
      <Tooltip title={nameTipShow ? name : ""} placement="bottom" className="User__name">
        <h3 ref={nameRef}>{name}</h3>
      </Tooltip>
      <span className="User__position">{position}</span>
      <Tooltip
        placement="bottom"
        className="User__email"
        title={emailTipShow ? email : ""}
      >
        <span ref={spanRef}>{email}</span>
      </Tooltip>
      <span className="User__phone">{phone}</span>
    </div>
  );
};

function textWidth(text, fontProp) {
  var tag = document.createElement("div");
  tag.style.position = "absolute";
  tag.style.left = "-99in";
  tag.style.whiteSpace = "nowrap";
  tag.style.font = fontProp;
  tag.innerHTML = text;

  document.body.appendChild(tag);
  var result = tag.clientWidth;
  document.body.removeChild(tag);
  return result;
}
