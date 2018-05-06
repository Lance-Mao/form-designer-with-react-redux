import React, {Component} from 'react';
import {Form, Icon, Input, DatePicker, Button} from 'antd';

const FormItem = Form.Item;

class FormElement extends Component {
    constructor(props) {
        super(props);
    }

    delItem(){
        let key = this.props.index;
        this.props.delItem(key);
    }

    render() {
        const type = this.props.type;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        let item;

        if (type === 1) {
            item = <FormItem
                {...formItemLayout}
                label="文本">
                <Input style={{width:'30%'}}/>
                {this.props.switchingViewsStatus ?
                <Button onClick={this.delItem.bind(this)}
                        type="danger">删除
                </Button>
                    : ""}
            </FormItem>;
        } else {
            item = <FormItem
                {...formItemLayout}
                label="时间">
                <DatePicker style={{width:'30%'}} />
                {this.props.switchingViewsStatus ?
                <Button onClick={this.delItem.bind(this)}
                        type="danger">删除
                </Button>
                    : ""}
            </FormItem>;
        }
        return (
            <div>
                {item}
            </div>
        );
    }
}

export default FormElement;