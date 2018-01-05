import React, { Component } from 'react'
import { connect } from 'dva';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon,DatePicker,Input
} from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
import  './style.less'

class CourseAdd extends React.Component {


  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
    };
    return (
      <div className="form">
        <div className="title">
          课程新建
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="课程编号">
            {getFieldDecorator('code', {
              rules: [{
                required: true,
                message: '请输入课程编号',
              }],
            })(
              <Input placeholder="请输入课程编号" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="课程封面"
            extra="格式：jpg、bmp、png 尺寸：130*130"
          >
            {getFieldDecorator('covorUrl', {
              valuePropName: 'multipartfile',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="课程名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入课程名称',
              }],
            })(
              <Input placeholder="请输入课程名称" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="课程时间">
            {getFieldDecorator('endTime', {
              rules: [{
                required: true,
                message: '请选择课程结束时间',
              }],
            })(
              <RangePicker
                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="校区"
            hasFeedback
          >
            {getFieldDecorator('campusId', {
              rules: [
                { required: true, message: '请选择校区' },
              ],
            })(
              <Select placeholder="请选择校区">
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="教室"
            hasFeedback
          >
            {getFieldDecorator('classroomId', {
              rules: [
                { required: true, message: '请选择教室' },
              ],
            })(
              <Select placeholder="请选择教室">
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="讲师"
          >
            {getFieldDecorator('lecturerId', {
              rules: [
                { required: true, message: '请至少选择一位讲师', type: 'array' },
              ],
            })(
              <Select mode="multiple" placeholder="请选择讲师">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="助教"
          >
            {getFieldDecorator('assistantId', {
              rules: [
                { required: true, message: '请至少选择一位助教', type: 'array' },
              ],
            })(
              <Select mode="multiple" placeholder="请选择助教">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="课程类型"
            hasFeedback
          >
            {getFieldDecorator('type', {
              rules: [
                { required: true, message: '请选择课程类型' },
              ],
            })(
              <Select placeholder="请选择课程类型">
                <Option value="">不设置</Option>
                <Option value="required">必修</Option>
                <Option value="optional">选修</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="学分"
          >
            {getFieldDecorator('input-number', { initialValue: 1 })(
              <InputNumber min={1} />
            )}
          </FormItem>

          <FormItem
            wrapperCol={{ span: 6, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">保存</Button>
            <Button>取消</Button>
          </FormItem>
        </Form>
      </div>

    )
  }
}

const CourseAdds = Form.create()(CourseAdd);

export default CourseAdds
