import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import Translation from "../AIOptions/Translation";
import { arrayItems } from '../AIOptions';
import logo from "../assets/logov2.webp";
import AdminSection from '../Sections/AdminSection';
import ApplicationSection from '../Sections/ApplicationSection';
/* eslint-disable */
const Dashboard = () => {
  const admin = 3;
  const [showAplikasi, setshowAplikasi] = useState(false);
  const [filterCondition, setFilterCondition] = useState('copywriting'); 
  const [name, setName] = useState('');
  const [token, setToken] = useState(''); 
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [option, setOption] = useState({});
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [myUserId, setMyUserId] = useState(null);
  const history = useHistory();
  const [click,setClick] = useState(null);

  const confirmDeleteUser = (userId, userName) => {
    const isConfirmed = window.confirm(`Apakah Kamu Yakin Menghapus ${userName}?`);
    if (isConfirmed) {
      deleteUser(userId);
    }
  };
  useEffect(() => {
    refreshToken();
    getUsers();
    fetchOpenaiApiKey();
  }, []);

  useEffect(() => {
    const myUser = users.find(user => user.name === name);
    if (myUser) {
      console.log('Informasi Pengguna Anda:', myUser.id);
      setClick(myUser.click);
      setMyUserId(myUser.id); 
    } else {
      console.log('Pengguna dengan nama Anda tidak ditemukan.');
    }
  }, [users]);

  // const handleFilterChange = (event) => {
  //   setFilterCondition(event.target.value);
  // };
  const handleFilterChange = (newFilter) => {
    setFilterCondition(newFilter);
  };


  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push('/');
      }
    }
  };
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOpenaiApiKey = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/openai-key');
      setOpenaiApiKey(response.data.openaiApiKey);
    } catch (error) {
      console.error('Error fetching OpenAI API key:', error);
    }
  };

  const selectOption = (item) => {
    setOption(item);
    setSelectedItem(item);
    console.log(item);
  };

  const handleAddNew = () => {
    history.push("/register");
  };

  const doStuff = async () => {
    try {
      if (click >= 0) {
        const clickResponse = await axios.post('http://localhost:5000/click', { id: myUserId, name: name });;
        if (clickResponse.data.success) {
          if (click > 0) {
            setClick(prevClick => prevClick - 1);
          }
          console.log('Click berhasil diperbarui!');
          
        } else {
          console.log('Gagal memperbarui click.');
        }
        const openaiResponse = await axios.post('http://localhost:5000/api/openai-request', {
          option: option.option,
          input: input,
        });
  
        setResult(openaiResponse.data.result);
      } else {
        alert('Token Anda habis. Silakan lakukan refresh atau sign in kembali.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat menjalankan doStuff:', error);
      alert('Terjadi kesalahan saat melakukan perintah. Mohon coba lagi nanti.');
    }
  };

  const resetOption = () => {
    setOption({});
  };

  const handleSignOut = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAplikasi = () => {
    setshowAplikasi(true);
  };

  const handleAdmin = () => {
    setshowAplikasi(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="nama has-text-centered	is-family-monospace">Selamat Datang : {name}</h1>
      <img className="logo" src={logo} alt="logo Katalismedia" />
      <h1 className="heading">ChatGPT Katalismedia</h1>
      <h4 className="button is-success is-light ">Token tersedia : {click}</h4>
      {Object.values(option).length > 0 && (
        <button className="button is-primary" onClick={resetOption}>
          Kembali Dashboard
        </button>
      )}
          {myUserId === admin ? (
        <AdminSection
          showAplikasi={showAplikasi}
          handleAdmin={handleAdmin}
          handleAplikasi={handleAplikasi}
          handleAddNew={handleAddNew}
          users={users}
          admin={admin}
          myUserId={myUserId}
          confirmDeleteUser={confirmDeleteUser}
          option={option}
          filterCondition={filterCondition}
          handleFilterChange={handleFilterChange}
          arrayItems={arrayItems}
          selectOption={selectOption}
        />
      ) : (
        <ApplicationSection
          option={option}
          filterCondition={filterCondition}
          handleFilterChange={handleFilterChange}
          arrayItems={arrayItems}
          selectOption={selectOption}
        />
      )}

      {Object.values(option).length !== 0 && (
        <Translation
          doStuff={doStuff}
          setInput={setInput}
          result={result}
          name={option.name}
          description={option.description}
          awal={option.awal}
          click={click}
        />
      )}

      <button className="button is-danger is-outlined" onClick={handleSignOut}>
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Dashboard;
/* eslint-disable */