import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './DataTable.less'
import {TableHead,BtnArea,TableBody} from './index'

const DataTable = ({state,dispatch,headProps,btnProps,tableProps}) => {
  const defaultProps = {
    pagination: {
      current: state.data.page,
      total:state.data.total,
      pageSize:state.data.pageSize,
      onChange:function(page, pageSize){
        dispatch({type:"course/fetch",payload: {page,pageSize}})
      }
    }
  }

  return (
    <div className={styles.table}>
      <TableHead {...headProps}/>
      <BtnArea {...btnProps}{...state}{...defaultProps}/>
      <TableBody {...tableProps}{...state}{...defaultProps}/>
      <BtnArea {...btnProps}{...state}{...defaultProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    state: state.course
  };
}

export default connect(mapStateToProps)(DataTable);
