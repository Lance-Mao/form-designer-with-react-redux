import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setFormElements} from '../action';
import {Form, Icon, Input, Button, Modal, Radio} from 'antd';
import FormElement from './FormElement';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Forms extends Component {

    static defaultProps = {
        formElements : []
    };

    constructor() {
        super();
        this.state =
            {
                visible: false,
                value: 1,
                preview: true,
                switchingViewsStatus: true
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
        let elem = this.state.value;

        let formElements = this.props.formElements;
        formElements.push(elem);

        this.setState({
            visible: false,
        });
        this.props.setFormElements(frameElement);
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
    };

    delThisItem(key) {
        let formElements = this.props.formElements.splice(key, 1);
        this.setState({
            ormElements: formElements
        })
    }

    switchingViews() {
        let switchingViewsStatus = this.state.switchingViewsStatus;
        this.setState({
            switchingViewsStatus: !switchingViewsStatus
        })
    }


    render() {
        let elems = this.props.formElements.length !== 0
            ? this.props.formElements.map((item, i) =>
                <FormElement
                    index={i}
                    switchingViewsStatus={this.state.switchingViewsStatus}
                    key={i}
                    type={item}
                    delItem={this.delThisItem.bind(this)}/>)
            : "";
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem>
                    {
                        this.state.switchingViewsStatus ?
                            <Button type="primary" onClick={this.showModalAdd}>添加字段</Button>
                            : ""

                    }
                    {
                        this.props.formElements.length === 0 ? "" :
                            <Button type="primary"
                                    onClick={this.switchingViews.bind(this)}>
                                {this.state.switchingViewsStatus ? "预览" : "编辑"}
                            </Button>
                    }
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

const mapStatToProps = state => {
    return {
        formElements: state.formElements
    }
};


const mapDispatchToProps = dispatch => ({
    setFormElements: data => dispatch(setFormElements(data))
});

export default connect(mapStatToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);