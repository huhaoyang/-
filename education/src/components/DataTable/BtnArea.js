import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { Button , Pagination } from 'antd';
import styles from './DataTable.less'
export default class BtnArea extends Component
{
  constructor(props) {
    super(props)
    this.state = {...props}
  }


  showLi (item) {
    if (item.disabled === true) {
      return (
        <Button className={styles.btn} size="large" onClick={item.onClick} disabled>{item.text}</Button>
      )
    } else {
      return (
        <Button className={styles.btn} size="large" onClick={item.onClick}>{item.text}</Button>
      )
    }
  }

  render() {
    const _this = this
    return (
      <div className={styles.btnArea}>
        {
          this.props.btnGroupList.map(function (item){return (
            _this.showLi(item)
          )})
        }
        <Pagination className={styles.pagination} simple {...this.state.pagination}/>
      </div>
    )
  }
}
