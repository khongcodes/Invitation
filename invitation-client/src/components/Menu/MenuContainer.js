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
  }

  render() {
    return (
      <>
        <MenuIcon toggleMenu={this.toggleMenu} />
        {this.state.menuActive ?
          <ActiveMenu user={this.props.user}/>
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

const ActiveMenu = ({user}) => (
  Object.entries(user).length===0 ?
    <div>no user</div>
  :
    <div>user</div>
)

export default MenuContainer