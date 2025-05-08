import { Link, useNavigate } from 'react-router-dom'; 
import { useState, useContext } from 'react'; 
import axios from 'axios'; 
import { UserContext } from "../context/UserContext";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { login } = useContext(UserContext); // Get login function from context
    const navigate = useNavigate(); // To redirect after login

    const submit = async (e) => {
        e.preventDefault();
        setLoading('Please Wait....');
        try {
            const data = new FormData();
            data.append('email', email);
            data.append('password', password);

            // Use Axios to post data
            const response = await axios.post('https://parm3nas.pythonanywhere.com/api/signin', data);
            setSuccess(response.data.message);
            setLoading('');

            // If sign-in is successful, set user context and navigate to home
            if (response.data.user) {
                login(response.data.user); // Login the user in context
                navigate('/'); // Redirect to homepage
            }
        } catch (error) {
            setLoading('');
            setError(error.message);
        }
    };

    return (
        <div className='signin-container signup-background'>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6 card shadow p-4 col-lg-6">
                    <h1 className="text-center" id="signin-heading">SIGN IN</h1>
                    {loading && <div className="alert alert-info text-center">{loading}</div>}
                    {success && <div className="alert alert-success text-center">{success}</div>}
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <form onSubmit={submit}>
                        <input type="email" placeholder="Enter Your Email Address" required className="form-control" onChange={(e) => setEmail(e.target.value)} /><br />
                        {email}               
                        <input type="password" placeholder="Enter Your Password" className="form-control" onChange={(e) => setPassword(e.target.value)} /><br />   
                        {password}   
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>   
                        </div>                              
                        <button type='submit' className='btn btn-primary w-100 btn-custom btn-block'>Sign In</button><br /> <br />
                        <p className="text-center">Don't have an account?<Link to='/signup'>Create One</Link></p>
                    </form>                    
                </div>            
            </div>
        </div>
    );
};

export default Signin;
