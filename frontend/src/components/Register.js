import React from 'react';
import './Register.css';

function RegisterForm() {
    return (
        <div style={{position:'relative'}}>
            <section>
                <div className="color"></div>
                <div className="color"></div>
                <div className="color"></div>
                <div className="box">
                    <div className="square" style={{ '--i': 0 }}></div>
                    <div className="square" style={{ '--i': 1 }}></div>
                    <div className="square" style={{ '--i': 2 }}></div>
                    <div className="square" style={{ '--i': 3 }}></div>
                    <div className="square" style={{ '--i': 4 }}></div>
                    <div className="container">
                        <div className="form">
                            <h2>Register Form</h2>
                            <form>
                                <div className="inputBox">
                                    <input type="text" placeholder="Username" />
                                </div>
                                <div className="inputBox">
                                    <input type="password" placeholder="Password" />
                                </div>
                                <div className="inputBox">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="inputBox">
                                    <input type="tel" placeholder="Phone Number" />
                                </div>
                                <div className="inputBox">
                                    <button type="submit" className="register-button">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RegisterForm;