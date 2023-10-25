import {React,useState }from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const host = "http://localhost:8080"
  const [credential, setCredentials] = useState({name:'',email:'', password:'', cpassword:''})
  let navigator = useNavigate();
  const handleSubmit =async(e)=>{
    
    e.preventDefault();
    const {name, email,password, cpassword} = credential;
    const response = await fetch(`${host}/api/auth/careateUser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({name,email, password}),
      });
      
      const json = await response.json();
      console.log(json)
      if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        navigator("/")
        props.showAlert("Account created successfullu","sucess")
      }
      else{
        props.showAlert("Invalid credential","danger")
      }
}

  const onChange=(e)=>{
    setCredentials({...credential, [e.target.name]:e.target.value})
    console.log(credential)
  }
  return (
    <div className='container mt-3'>
      <h2 className='my-3'>Create an account to use the APP</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name="name" id="name"  onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" name="email" id="exampleInputEmail1"  onChange={onChange} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required />
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} required minLength={(5)} />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  )
}

export default Signup