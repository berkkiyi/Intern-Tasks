import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddMovieModal = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Yeni Film Ekle"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onAdd}>
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
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMovieModal;