import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'

const firebaseAuth = (Component) => {
  const AuthenticateComponent = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check to see if user is authenticated
      // if they are, allow them to see the home page
      // if not, redirect them to the login page
  
      const auth = getAuth();
      const user = auth.currentUser;
      
      if(!user) {
        navigate('/login');
      }
  
    }, [navigate]);
    
    return <Component/>
  }
  
  return AuthenticateComponent;
}

export default firebaseAuth;