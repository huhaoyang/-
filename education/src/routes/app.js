/* global window */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Loader } from 'components'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import { withRouter, Link } from 'dva/router'
import { Layout, Icon, Menu, Breadcrumb } from 'antd'
const MenuItem = Menu.Item;
const { Header, Content, Footer } = Layout
import '../themes/index.less'
import './app.less'
import Error from './error'

const { openPages } = config

let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, menu } = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { iconFontJS, iconFontCSS, logo } = config
  const href = window.location.href

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    user,
    location,
  }

  return (
    <div>
      <Loader fullScreen/>
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>
      <div>
        <Layout>
          <Header className="header">
            <div className="logo"/>
            <span className="name">企业名称</span>
            <div className="menu-board">
              <Icon type="picture" className="icon" />
              <span className="ve-line">|</span>
              <a  className="link" href="#">帮助中心</a>
              <span className="ve-line">|</span>
              <a className="link" href="#">进入官网</a>
              <span className="">|</span>
              <Icon type="user" className="icon" />
            </div>
          </Header>
          <Content className="container">
            <Menu
              mode="horizontal"
            >
              <MenuItem key="front">
                <Link to="/front">首页</Link>
              </MenuItem>
              <MenuItem key="contact">
                <Link to="/contact">通讯录</Link>
              </MenuItem>
              <MenuItem key="application">
                <Link to="/application">我的应用</Link>
              </MenuItem>
              <MenuItem key="company">
                <Link to="/company">我的企业</Link>
              </MenuItem>
            </Menu>
            <div className="card">
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
