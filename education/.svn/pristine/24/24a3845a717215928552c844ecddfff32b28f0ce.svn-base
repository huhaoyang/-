import React, { Component } from 'react'
import { connect } from 'dva';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Loader from '../Loader'
import styles from './MessageList.less'
import Item from './Item'

const MessageList = ({message,state,dispatch}) => {

  const sizeChange = () =>{
    const text = (state.status==1) ? "隐藏列表" : "显示全部"
    const status = (state.status==1) ? 0 : 1
    dispatch({type:'message/changeState',payload:{text:text,status:status}})
  }

  return (
    <div className={styles.messageBox}>
      <p className={styles.title}>中午好，姚磊</p>
      <p className={styles.notice}>您有{message.length}条消息</p>
      <ul className={styles.listStyle}>
        {
          message.map(function (item) {return (<Item {...item} status={state.status} key={ item.id } />)})
        }
        <p className={styles.showBtn} onClick={sizeChange}>{state.text}</p>
      </ul>
    </div>

  )
}

function mapStateToProps(state) {
  return {
    state: state.message,
    message:state.message.data
  };
}

export default connect(mapStateToProps)(MessageList);
