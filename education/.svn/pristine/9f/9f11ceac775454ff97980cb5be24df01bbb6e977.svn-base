import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './CompanyBoard.less'

const CompanyBoard = ({state,dispatch}) => {

  return (
    <div className={styles.board}>
      <div className={styles.name}>
        {state.name}
      </div>
      <div className={styles.info}>
        <p>成员：{state.member.total}<span className={styles.red}>（未加入{state.member.disabled}人）</span></p>
        <p>部门：{state.department.total}</p>
      </div>
    </div>

  )
}

function mapStateToProps(state) {
  return {
    state: state.company
  };
}

export default connect(mapStateToProps)(CompanyBoard);
