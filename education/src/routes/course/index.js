import React, { Component } from 'react'
import { connect } from 'dva';
import {routerRedux} from 'dva/router'
import styles from 'components/DataTable/DataTable.less'
import {TableHead,BtnArea,TableBody} from 'components/DataTable/index'

const Course = ({dispatch,state,match}) => {
  const defaultProps = {
    pagination: {
      current: state.data.page,
      total:state.data.total,
      pageSize:state.data.size,
      onChange:function(page, pageSize){
        dispatch({type:"course/fetch",payload: {page,size}})
      }
    }
  }
  const btnProps={
    btnGroupList : [
      {
        text:"添加课程",
        onClick: function(e){
          console.log(1)
          dispatch(routerRedux.push('/application/courseAdd'))
        }
      },
      {
        text:"删除",
        disabled: state.btnGroup.delete,
        onClick: function(e){

        }
      },
      {
        text:"有效",
        disabled: state.btnGroup.active,
        onClick: function(e){
          dispatch({type:"course/updateState",payload: {ids:state.selected,state:"enable"}})
        }
      },
      {
        text:"无效",
        disabled: state.btnGroup.inactive,
        onClick: function(e){
          dispatch({type:"course/updateState",payload: {ids:state.selected,state:"disable"}})
        }
      },
    ]
  }

  const tableProps={
    columns: [
      {
        title: '编号',
        dataIndex: 'code',
        key: 'code'
      }, {
        title: '封面',
        dataIndex: 'coverUrl',
        key: 'coverUrl',
        render: text=><img className={styles.coverUrl} src={text}/>
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '时间',
        dataIndex: 'courseTimes',
        key: 'courseTimes',
        render: array=>(
          array.map(function(item){
            return <p>{item.startTime}-{item.endTime}</p>
          })
        )
      }, {
        title: '校区',
        dataIndex: 'campusName',
        key: 'campusName',
      }, {
        title: '教室',
        dataIndex: 'classroomName',
        key: 'classroomName',
      }, {
        title: '讲师',
        dataIndex: 'lecturerName',
        key: 'lecturerName',
      }, {
        title: '有效性',
        dataIndex: 'state',
        key: 'state',
      }
    ],
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        if(selectedRows.length===1){
          const btnActive = selectedRows[0].state === "有效"
          dispatch({type:"course/updateBtnGroup",payload: {active:btnActive,inactive:!btnActive}})
        }else if(selectedRows.length=== 0){
          dispatch({type:"course/updateBtnGroup",payload: {active:true,inactive:true,delete:true}})
        }
        dispatch({type:"course/selected",payload: selectedRowKeys.join(",")})
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        dispatch({type:"course/updateBtnGroup",payload: {active:false,inactive:false}})
      },
    },

  }

  const headProps={

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

export default connect(mapStateToProps)(Course);
