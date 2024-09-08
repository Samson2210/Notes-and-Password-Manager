import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

const Signup = (props) => {
  const {signup } = useAuth();
  console.log(signup, 'sign');
  const [credential, setCredentials] = useState({ name: '', email: '', password: '', masterKey: '' })
  let navigator = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(signup(credential)){
      navigator("/login")
      props.showAlert("Account created successfully", "success")
    }
    else {
      props.showAlert("Something went wrong", "error")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-5'>
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow">
            <h2 className='mt-3 text-success text-center'>Signup</h2>
            <form className='card-body p-4' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name="username" id="username" onChange={onChange} aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={8} required />
              </div>
              <div className="mb-3">
                <label htmlFor="masterKey" className="form-label">Master Key</label>
                <input type="password" className="form-control" name="masterKey" id="masterKey" onChange={onChange} required minLength={(8)} />
                <div className="form-text">Master key will be used to access your notes and passwords</div>

              </div>
              <button type="submit" className="btn btn-success">Signup</button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup