import React, { Component } from 'react'
import styles from './MessageList.less'
export default class Item extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      defaultSize:3,
      styles: {
        display: (this.props.status == 1) ? "none": "block"
      }
    }
  }

  shouldComponentUpdate(nextProps){
    this.setState({
      styles:{
        display: (nextProps.status == 1) ? "none": "block"
      }
    })
    return true
  }

  showLi(index) {
    if(parseInt(index)>this.state.defaultSize){
      return (
        <li style={this.state.styles} key={ this.props.id }>
          { this.props.name }
          {
            this.props.new ?  <img className={styles.newIcons} src="../imgs/new.png"/> : null
          }
        </li>
      )
    }else{
      return (
        <li key={ this.props.id }>
          { this.props.name }
          {
            this.props.new ?  <img className={styles.newIcons} src="../imgs/new.png"/> : null
          }
        </li>
      )
    }
  }

  render() {
    return this.showLi(this.props.id)
  }
}
