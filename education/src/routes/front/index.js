import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Input, Tabs } from 'antd'
import styles from './index.less'
import {MessageList,DirectLink,CompanyBoard} from 'components'

function Front ({ loading , dispatch }) {
  const defaultProps = {
    dispatch
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <MessageList {...defaultProps}/>
        <p className={styles.title}>常用入口</p>
        <DirectLink src="../imgs/front-icon-1.png" link="/frame" text="课程管理"/>
        <DirectLink src="../imgs/front-icon-2.png" link="/frame" text="报名管理"/>
        <DirectLink src="../imgs/front-icon-3.png" link="/frame" text="签到管理"/>
      </div>
      <div className={styles.rightBar}>
        <CompanyBoard/>
      </div>
    </div>
  )
};

export default connect(({ loading, dispatch }) => ({ loading, dispatch}))(Front)
