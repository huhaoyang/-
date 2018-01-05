import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Switch, Route, Redirect, routerRedux,Link, withRouter } from 'dva/router'
import dynamic from 'dva/dynamic'
import { Button, Row, Input, Tabs, Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu;
import styles from './index.less'

function Application ({ loading , dispatch, app, match }) {

  const routes = [
    {
      path: match.url+'/course',
      component: () => import('../../routes/course'),
    },
    {
      path: match.url+'/courseAdd',
      component: () => import('../../routes/course/add'),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <Menu mode="vertical" className={styles.sider}>
          <Menu.Item className={styles.bar} key="1"><Link to="/application/course">课程管理</Link></Menu.Item>
          <Menu.Item className={styles.bar} key="2">讲义管理</Menu.Item>
          <Menu.Item className={styles.bar} key="3">报道管理</Menu.Item>
          <Menu.Item className={styles.bar} key="4">签到管理</Menu.Item>
          <SubMenu key="5" className={styles.bar} title={<span>问卷管理</span>}>
            <Menu.Item className={styles.bar} key="5-1">问卷列表管理</Menu.Item>
            <Menu.Item className={styles.bar} key="5-2">问卷模版管理</Menu.Item>
          </SubMenu>
          <SubMenu key="6" className={styles.bar} title={<span>投票管理</span>}>
            <Menu.Item className={styles.bar} key="6-1">投票列表管理</Menu.Item>
            <Menu.Item className={styles.bar} key="6-2">投票模版管理</Menu.Item>
          </SubMenu>
          <SubMenu key="7" className={styles.bar} title={<span>作业管理</span>}>
            <Menu.Item className={styles.bar} key="7-1">作业列表管理</Menu.Item>
            <Menu.Item className={styles.bar} key="7-2">作业模版管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div className={styles.rightBar}>
        <Switch>
          <Route exact path={match.url} render={() => (<Redirect to={match.url+"/course"} />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                     path={path}
                     component={dynamic({
                       app,
                       ...dynamics,
                     })}
              />
            ))
          }
        </Switch>
      </div>
    </div>
  )
};

export default withRouter(connect(({ app, dispatch }) => ({ app, dispatch}))(Application))
