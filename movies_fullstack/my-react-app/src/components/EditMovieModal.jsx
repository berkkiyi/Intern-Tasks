import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const EditMovieModal = ({ visible, onCancel, onEdit, initialValues }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Film Güncelle"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onEdit} initialValues={initialValues}>
        <Form.Item
          label="Yıl"
          name="year"
          rules={[{ required: true, message: 'Lütfen yıl bilgisini girin!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Film Adı"
          name="title"
          rules={[{ required: true, message: 'Lütfen film adını girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMovieModal;