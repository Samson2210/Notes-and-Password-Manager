import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();
    // const history = useHistory(); 
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const response = await fetch(`/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username:username, password:password}),
          });
          
          const json = await response.json();
          console.log(json)
          if(json){
            //Save the auth token and redirect
            console.log("User authenticated")
            localStorage.setItem('token',json.jwtToken);
            navigator("/")
            props.showAlert("Loged in Successfully","success")
          }
          else{
            props.showAlert("Invalid credential", "danger");
          }
    }


    return (
        <div className='mt-'>
          <h2 className='my-3'>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"> Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={username}  onChange={e=>setUsername(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={password}  onChange={e=>setPassword(e.target.value)}  id="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login