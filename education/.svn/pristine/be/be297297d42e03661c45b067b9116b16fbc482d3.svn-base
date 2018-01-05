import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { Form, Input, Button, Radio, Select  } from 'antd';
import styles from './DataTable.less'
const FormItem = Form.Item;
const Option = Select.Option;
class TableHead extends Component
{
  constructor(props) {
    super(props);
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onSubmitHandler(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.tableHead}>
        <span className={styles.title}>课程列表</span>
        <Form layout="inline" className={styles.FormArea} onSubmit={this.onSubmitHandler}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: false, message: 'Please input your username!' }],
            })(
              <Input style={{ width: '200px' }} placeholder="搜索课程编号、名称、讲师" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('date', {
              rules: [{ required: false, message: 'Please input your username!' }],
            })(
              <Input style={{ width: '200px' }} placeholder="搜索时间区间" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('status', {
              rules: [{ required: false, message: 'Please input your username!' }],
              initialValue: ""
            })(
              <Select style={{ width: 120 }}>
                <Option value="">全部状态</Option>
                <Option value="1">有效</Option>
                <Option value="0">无效</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" icon="search" htmlType="submit"></Button>
          </FormItem>
      </Form>
      </div>
    )
  }
}
TableHead=Form.create({})(TableHead)
export default TableHead
