import React, { useEffect, useState } from 'react';
import './FormFilm.css';
import { Modal, Row, Col, Form, Input, Button, Upload, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import logo from '../../../../asset/images/logo.png';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { insertFilmAction, updateFilmAction } from '../../../../redux/actions/ListMovieActions';
const { TextArea } = Input;
export default function FormEditFilm(props) {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const filmUpdate = props.filmUpdate;

  useEffect(() => {
    if (props.type == 'update') {
      form.setFieldsValue({
        maPhim: filmUpdate.maPhim,
        tenPhim: filmUpdate.tenPhim,
        biDanh: filmUpdate.biDanh,
        trailer: filmUpdate.trailer,
        ngayKhoiChieu: moment(filmUpdate.ngayKhoiChieu, 'YYYY-MM-DD'),
        danhGia: filmUpdate.danhGia,
        moTa: filmUpdate.moTa
      });
    } else {
      form.setFieldsValue({
        maPhim: '',
        biDanh: '',
        tenPhim: '',
        trailer: '',
        ngayKhoiChieu: '',
        danhGia: '',
        moTa: ''
      });
    }

  }, [props.type, filmUpdate])


  const onFinish = (values) => {

    // console.log('success', values['hinhAnh'][0])
    if (props.type == 'update') {
      let data = {
        ...values,
        'hinhAnh': values['hinhAnh'][0].originFileObj,
        'ngayKhoiChieu': moment(values['ngayKhoiChieu']).format("DD/MM/YYYY"),
        'maNhom': 'GP03'

      }
      console.log('update', data);
      var form_data = new FormData();
      for (var key in data) {
        form_data.append(key, data[key]);
      }
      dispatch(updateFilmAction(form_data));
    } else {
      let data = {
        ...values,
        'hinhAnh': values['hinhAnh'][0].originFileObj,
        'ngayKhoiChieu': moment(values['ngayKhoiChieu']).format("DD/MM/YYYY"),
        'maNhom': 'GP03'
      }
      var form_data = new FormData();
      for (var key in data) {
        form_data.append(key, data[key]);
      }
      dispatch(insertFilmAction(form_data));
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Modal title={<div className="modalTitle">
      <img className="modalImg" src={logo} />
      <span className="modalInform">{props.type == 'update' ? 'CH???NH S???A PHIM' : 'TH??M PHIM'}</span>
    </div>} visible={props.show}
      footer={null} onCancel={props.close}
    >
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        initialValues={{}}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="M?? Phim"
              name="maPhim"
              rules={[{ required: true, message: 'H??y nh???p m?? phim!' }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="T??n Phim"
              name="tenPhim"
              rules={[{ required: true, message: 'H??y nh???p t??n phim!' }]}
              labelCol={{ span: 0 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hinhAnh"
              label="H??nh ???nh:"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'H??y t???i h??nh ???nh phim!' }]}
              labelCol={{ span: 8 }}
            >
              <Upload listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="B?? Danh"
              name="biDanh"
              // rules={[{ required: true, message: 'H??y nh???p b?? danh!' }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayKhoiChieu" label="Ng??y K/C" labelCol={{ span: 8 }} rules={[{ required: true, message: 'H??y ch???n ng??y chi???u!' }]}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="????nh Gi??"
              name="danhGia"
              rules={[{ required: true, message: 'H??y nh???p ????nh gi??!' }]}
              labelCol={{ span: 8 }}
            >
              {/* <InputNumber min={1} max={10} defaultValue={3}  /> */}
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Trailer"
          name="trailer"
          rules={[{ required: true, message: 'H??y nh???p trailer!' }]}
          labelCol={{ span: 4 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="M?? T???"
          name="moTa"
          rules={[{ required: true, message: 'H??y nh???p m?? t???!' }]}
          labelCol={{ span: 4 }}
        >
          <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            Submit
          </Button>
          <Button onClick={props.close}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  )
}
