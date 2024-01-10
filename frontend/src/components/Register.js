import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logov2.webp';
import front from '../assets/front.png';
import back from '../assets/back.png';
import "../App.css";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name,
                email,
                password,
                confPassword,
            });
            alert('Registrasi Berhasil! Silahkan Anda login.');
            history.push('/login');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
            }
        }
    };

    const handleKembali = () => {
        history.push('/');
    };

    const handleLogin = () => {
        history.push('/login');
    };

    return (
        <section className="hero has-background-cyan is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-desktop">
                            <img src={front} alt="front" className="image-1" />
                            <form onSubmit={handleAuth} className="box px-6 is-relative">
                                <img className="logo" src={logo} alt="logo CV Katalis Indonesia" />
                                <h3 className='button is-normal is-link'>Buat Akun?</h3>
                                <div className="field mt-5">
                                    <label className="label">Nama</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Silahkan Masukkan Nama Anda.."
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Silahkan masukkan Email Anda.."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="Masukkan Password Anda.."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="Ulangi Password Anda.."
                                            value={confPassword}
                                            onChange={(e) => setConfPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <p className="has-text-centered danger" dangerouslySetInnerHTML={{ __html: msg }} />
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth is-uppercase">Register</button>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-primary is-fullwidth is-uppercase" onClick={handleLogin}>
                                        Login
                                    </button>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-danger is-fullwidth is-uppercase" onClick={handleKembali}>
                                        Back
                                    </button>
                                </div>
                            </form>
                            <img src={back} alt="Logo" className="image-2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
