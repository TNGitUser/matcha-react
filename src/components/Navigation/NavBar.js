import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom"; 

export class MenuBar extends React.Component {
    constructor(props) {
      var i_r, i_l, i_a;
  
      super(props);
      if (!props) {
        this.state = {
          activeItem: null,
          items_left: null,
          items_right: null,
        };
      } else {
        i_r = !(props['items_right']) ? null : props['items_right'].slice();
        i_l = !(props['items_left']) ? null : props['items_left'].slice();
        i_a = null;
        if (i_r || i_l) {
            
        }
        this.state = {
          activeItem: i_a,
          items_left: i_l,
          items_right: i_r,
        };
      }
    }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: null })
  
    createMenu = (items) => {
      let output = [];
  
      if(!items) return ;
      for (let i = 0; i < items.length; i++) {
        output.push(<Menu.Item
            as={Link}
            to={items[i]}
            key={items[i]}
            name={items[i]}
            active={this.state.activeItem === items[i]}
            onClick={this.handleItemClick}
        >
          {items[i]}
        </Menu.Item>);
      }
      return output;
    };
  
    render() {
  
      return (
            <Menu>
                {this.createMenu(this.state.items_left)}
                <Menu.Menu position='right'>
                    {this.createMenu(this.state.items_right)}
                </Menu.Menu>
            </Menu>
      )
    }
  }