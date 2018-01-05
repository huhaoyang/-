import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import { Button, Row, Input, Tabs } from 'antd'

const TabPane = Tabs.TabPane
import { config } from 'utils'
import dynamic from 'dva/dynamic'
import Front from 'routes/front'
import styles from './index.less'
import Application from 'routes/application'

const Index = ({ loading, dispatch,children,app,match }) => {
  const frame = [
    {
      path: '/front',
      models: () => [
        import(match.url+'models/message'),
        import(match.url+'models/company'),
      ],
      component: () => import(match.url+'routes/front/'),
    },
    {
      path: '/course',
      models: () => [
        import(match.url+'/models/course'),
      ],
      component: () => import(match.url+'/routes/application/'),
    },
  ]

  function callback (key) {
    console.log(key)
  }

  return (
    <div className="card">
      {
        frame.map(({ path, ...dynamics }, key) => (
          <Route key={key}
                 path={path}
                 component={dynamic({
                   app,
                   ...dynamics,
                 })}
          />
        ))
      }
    </div>
  )
}

export default connect(({ loading }) => ({ loading }))(Index)
