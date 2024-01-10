import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logov2.webp';
import "../App.css";
import front from '../assets/front.png';
import back from '../assets/back.png';

const Home = () => {
    const history = useHistory();
    const HandleLogin = () => {
        history.push('/login');
    }
    const handleAddNew = () => {
        history.push("/register");
    };

    return (
        <section className="hero has-background-cyan is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-desktop">
                            <img src={front} alt="front" className="image-1" />
                            <div className="box px-6 is-relative">
                                <img className="logo" src={logo} alt="logo CV Katalis Indonesia" />
                                <h1 className="heading">ChatGPT Katalismedia</h1>
                                <h3 className='button is-normal is-link is-capitalized'>revolusi Belajar With AI</h3>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth" onClick={HandleLogin}>
                                        Login
                                    </button>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-warning is-fullwidth" onClick={handleAddNew}>
                                        Registrasi
                                    </button>
                                </div>
                            </div>
                            <img src={back} alt="Logo" className="image-2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;