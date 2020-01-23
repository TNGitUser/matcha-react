import React from 'react';
import { Menu, Image, Visibility } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';

const menuStyle = {
  borderRadius: 0,
  //transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}


export class MenuBar extends React.Component {

    constructor(props) {
      var i_r, i_l, i_a, link;
  
      super(props);

      i_r = !(props['items_right']) ? null : props['items_right'].slice();
      i_l = !(props['items_left']) ? null : props['items_left'].slice();
      link = !(props['path']) ? null : props['path'].slice();
      i_a = null;
      this.state = {
        cur : 0,
        activeItem: i_a,
        items_left: i_l,
        items_right: i_r,
        icon: props['icon'],
        path: link,
        menuFixe: false,
      };
    }

    
    stickTopMenu = () => this.setState({ menuFixed: true })
    unStickTopMenu = () => this.setState({ menuFixed: false })
  
    updateCur = () => this.setState({cur: this.state.cur + 1})
    handleItemClick = (e, { name }) => this.setState({ activeItem: null })
  
    createMenu = (items, start) => {
      let output = [];
  
      if(!items) return ;
      for (let i = 0; i < items.length; i++) {
        output.push(<Menu.Item
            as={Link}
            to={this.state.path[start]}
            key={items[i]}
            name={items[i]}
            active={this.state.activeItem === items[i]}
            onClick={this.handleItemClick}
        >
          {items[i]}
        </Menu.Item>);
        start++;
      }
      return output;
    };
  
    show_icon = () => {
      if (this.state.icon) {
        return <Image src={this.state.icon} size='mini' ></Image>;
      }
    };

    render() {
      const { menuFixed } = this.state

      return (
      <Visibility
      onBottomPassed={this.stickTopMenu}
      onBottomVisible={this.unStickTopMenu}
      once={false}>
         <Menu
            borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            {this.show_icon()}
            {this.createMenu(this.state.items_left, 0)}
            <Menu.Menu position='right'>
                {this.createMenu(this.state.items_right, this.state.items_left.length)}
            </Menu.Menu>
          </Menu>
      </Visibility>
      )
    }
  }