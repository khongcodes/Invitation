import React, { Component } from 'react'

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
    console.log(this.state)
  }

  render() {
    return (
      <MenuIcon toggleMenu={this.toggleMenu} />
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