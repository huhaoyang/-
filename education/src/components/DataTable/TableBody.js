import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { Table } from 'antd';
import styles from './DataTable.less'
export default class TableBody extends Component
{
  constructor(props) {
    super(props);

    this.state = {...props}
  }

  render() {
    return (
      <Table className={styles.tableBody} rowKey={record => record.id}  pagination={this.props.pagination} rowSelection={this.props.rowSelection} columns={this.props.columns} dataSource={this.props.data.items} />
    )
  }
}
