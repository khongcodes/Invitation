import React, { Component } from 'react'

import ActiveMenu from './ActiveMenu'
import '../../style/Menu.css'

class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {menuActive: false}
  }

  toggleMenu = () => {
    this.setState(previousState => ({
      ...previousState,
      menuActive: !previousState.menuActive
    }))
  }

  render() {
    return (
      <>
        <MenuIcon toggleMenu={this.toggleMenu} />
        {this.state.menuActive ?
          <ActiveMenu 
            user = {this.props.user}
            toggleMenu = {this.toggleMenu}
            login = {this.props.login}
            logout = {this.props.logout}
          />
        :
        <></>}
      </>
    )
  }
}

const MenuIcon = ({ toggleMenu }) => (
  <div className='Menu icon' onClick={toggleMenu} >
    <div className='Menu icon-bar'></div>
    <div className='Menu icon-bar'></div>
    <div className='Menu icon-bar'></div>
  </div>
)

export default MenuContainer