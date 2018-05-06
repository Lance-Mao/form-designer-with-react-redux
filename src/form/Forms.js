import React, {Component} from 'react';
import {Form, Icon, Input, Button, Modal, Radio} from 'antd';
import FormElement from './FormElement';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Forms extends Component {
    constructor() {
        super();
        this.state =
            {
                visible: false,
                value: 1,
                preview: true,
                formElements: []
            };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    showModalAdd = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log("aaa", this.state.value);

        let elem = this.state.value;

        let formElements = this.state.formElements;
        formElements.push(elem);

        this.setState({
            visible: false,
            formElements: formElements
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        console.log("数组长度",this.state.formElements);
        let elems = this.state.formElements.length !== 0 ? this.state.formElements.map((item, i) => <FormElement key={i} type={item}/>) : ""
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem>
                    <Button type="primary" onClick={this.showModalAdd}>添加字段</Button>
                    <Modal
                        title="选择创建类型"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <Radio value={1}>文本</Radio>
                            <Radio value={2}>日期</Radio>
                        </RadioGroup>
                    </Modal>
                    {elems}
                </FormItem>
            </Form>
        )
    }
}

const WrappedHorizontalLoginForm = Form.create()(Forms);

export default WrappedHorizontalLoginForm;