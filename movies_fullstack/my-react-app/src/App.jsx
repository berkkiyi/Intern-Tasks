import React, { useState } from 'react';
import axios from 'axios';
import { Button, Space, Input, message } from 'antd';
import MovieTable from './components/MovieTable';
import AddMovieModal from './components/AddMovieModal';
import EditMovieModal from './components/EditMovieModal';

const { Search } = Input; // Arama kutusu için gerekli

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Filmleri API'den çek
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  // Arama fonksiyonu
  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/search?title=${value}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Arama hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  // Yeni film ekleme fonksiyonu
  const handleAddMovie = async (values) => {
    try {
      await axios.post('http://localhost:5000/movies', values);
      message.success('Film başarıyla eklendi!');
      setIsAddModalVisible(false);
      fetchMovies(); // Film listesini yenile
    } catch (error) {
      message.error('Film eklenirken bir hata oluştu.');
      console.error('Film ekleme hatası:', error);
    }
  };

  // Film güncelleme fonksiyonu
  const handleEditMovie = async (values) => {
    try {
      await axios.put(`http://localhost:5000/movies/${selectedMovie.id}`, values);
      message.success('Film başarıyla güncellendi!');
      setIsEditModalVisible(false);
      fetchMovies(); // Film listesini yenile
    } catch (error) {
      message.error('Film güncellenirken bir hata oluştu.');
      console.error('Film güncelleme hatası:', error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Başlık Stili */}
      <h1 style={{ textAlign: 'left', marginBottom: 16, marginTop: -10 }}>
  Film Kütüphanesi
</h1>
      
      {/* Kontrol paneli */}
      <Space style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          onClick={fetchMovies} 
          loading={loading}
        >
          Filmleri Yükle
        </Button>

        {/* 2. Arama Kutusu */}
        <Search
          placeholder="Film ara..."
          allowClear
          enterButton="Ara"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />

        {/* 3. Buton: Yeni Film Ekle */}
        <Button 
          type="primary" 
          onClick={() => setIsAddModalVisible(true)}
        >
          Yeni Film Ekle
        </Button>
      </Space>

      {/* Film Tablosu */}
      <MovieTable
        movies={movies}
        loading={loading}
        onEdit={(record) => {
          setSelectedMovie(record);
          setIsEditModalVisible(true);
        }}
      />

      {/* Modal'lar */}
      <AddMovieModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onAdd={handleAddMovie}
      />
      <EditMovieModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onEdit={handleEditMovie}
        initialValues={selectedMovie}
      />
    </div>
  );
};

export default App;