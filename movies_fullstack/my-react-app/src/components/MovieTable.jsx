import React from 'react';
import { Table, Button } from 'antd';

const MovieTable = ({ movies, loading, onEdit }) => {
  const columns = [
    {
      title: 'Yıl',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Film Adı',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => onEdit(record)}>
          Düzenle
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={movies}
      rowKey="id"
      loading={loading}
      bordered
      pagination={{ pageSize: 5, showSizeChanger: false }}
    />
  );
};

export default MovieTable;