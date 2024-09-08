import React, { useState, useMemo, useEffect } from 'react'

import CryptoJS from 'crypto-js';
import { useValidate } from '../context/validation/ValidateContext';
import { useNavigate } from 'react-router-dom';

const Validate = ({ showAlert }) => {
    const [masterKey, setMasterKey] = useState('');
    const { getValidationToken } = useValidate();
    const navigator = useNavigate()
    useEffect(() => {
        getValidationToken();
    })

    const salt = sessionStorage.getItem('salt');
    const validationToken = sessionStorage.getItem('validationToken')

    const handleSubmit = (e) => {
        e.preventDefault();
        const rederivedKey = CryptoJS.PBKDF2(masterKey, CryptoJS.enc.Hex.parse(salt), {
            keySize: 512 / 32
        });

        const newValidationToken = CryptoJS.SHA256(rederivedKey).toString();
        

        if (newValidationToken === validationToken) {
            sessionStorage.setItem('key', rederivedKey.toString());
            navigator("/")
        } else {
            showAlert('Incorrect master key.', "warn")
            console.log('Login failed. Incorrect master key.');
        }
    };



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Enter Your Master Key</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="masterKey" className='p-2'>Master Key</label>
                                    <input
                                        type="password"
                                        className="form-control p-2"
                                        id="masterKey"
                                        placeholder="Enter your master key"
                                        value={masterKey}
                                        onChange={(e) => setMasterKey(e.target.value)}
                                        required

                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Validate