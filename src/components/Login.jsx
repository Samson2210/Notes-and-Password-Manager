import React, { useState, useEffect } from 'react'
import { Link,resolvePath,useNavigate} from 'react-router-dom'
import { useAuth } from '../context/auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const {login,checkTokenExpiration}  = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginBtn, setLoginBtn]  = useState(true);
  const navigator = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response  = await toast.promise(
      login(username,password),
      {
        pending: {
          render(){
            setLoginBtn(false);
            return "Please wait loading"
          },
          icon: true,
          position: "bottom-center",
          theme: "colored",
        },
      }
    )

    setLoginBtn(true);
    if(response){
        props.showAlert("Logged in Successfully", "success");
        navigator("/");
      }
      else{
          props.showAlert("Invalid credential", "warn");
      }
  }



  return (
    <div className="row justify-content-center my-5">
      <div className="col-lg-7">
        <div className="card">
          <h2 className='my-3 text-primary text-center'>Login to continue</h2>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"> Username</label>
                <input type="text" className="form-control" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} id="password" />
              </div>
              <button type="submit" disabled={!loginBtn} className="btn btn-primary" >Login</button>
            </form>
          </div>
          <div className="text-center mb-3">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login