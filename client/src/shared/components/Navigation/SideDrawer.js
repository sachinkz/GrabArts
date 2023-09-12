import React from "react"
import "./SideDrawer.css"
import { CSSTransition } from "react-transition-group"

function SideDrawer(props) {
  return (
    <CSSTransition
      in={props.show}
      timeout={400}
      classNames={props.classNames}
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={props.onClick} className={`side-drawer-common ${props.className}`}>{props.children}</aside>
    </CSSTransition>
  )}

export default SideDrawer
