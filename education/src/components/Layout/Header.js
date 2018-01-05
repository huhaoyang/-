import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import classnames from 'classnames'
import styles from './Header.less'


const Header = ({ location, menu }) => {
  const menusProps = {
    menu,
    location,
  }
  return (
    <div className={styles.header} />
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object,
}

export default Header
