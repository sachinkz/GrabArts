import React,{useState} from 'react'

import './MainNavigation.css'
import MainHeader from './MainHeader'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../UIElements/Backdrop'

function MainNavigation(props) {


  const [opensideDrawer, setOpensideDrawer] = useState(false)

    const closesideDrawer=()=>{
        setOpensideDrawer(false)
  }

  return (
    <React.Fragment>
      {opensideDrawer && <BackDrop close={closesideDrawer} />}

      <SideDrawer
        className={"side-drawer"}
        show={opensideDrawer}
        onClick={closesideDrawer}
        classNames={"slide-in-left"}
      >
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setOpensideDrawer(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <h1 className="main-navigation__title">
          <Link to="/"> Grab Arts </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks/>
        </nav>
        
      </MainHeader>
    </React.Fragment>
  )
}

export default MainNavigation
