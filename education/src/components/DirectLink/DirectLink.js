import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import styles from './DirectLink.less'
export default class DirectLink extends Component
{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    routerRedux.push(this.props.link)
  }

  getLink() {
    return (
      <div className={styles.btn} onClick={this.handleClick}>
        <img className={styles.iconImg} src={this.props.src} />
        {this.props.text}
      </div>
    )
  }

  render() {
    return this.getLink()
  }
}
