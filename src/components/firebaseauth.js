import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { auth } from '../config/firebase-config'

const firebaseAuth = (Component) => {
  const AuthenticateComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const user = await new Promise((resolve, reject) => {
            // Subscribe to the auth state changes and wait for initial check
            const unsubscribe = auth.onAuthStateChanged((user) => {
              unsubscribe(); // Unsubscribe once the initial check is done
              resolve(user);
            }, reject);
          });

          if (user) {
            // User is authenticated, allow them to see the component
            setLoading(false);
          } else {
            // User is not authenticated, redirect them to the login page
            navigate('/login');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          // Handle the error accordingly (e.g., show an error message)
        }
      };

      checkAuthentication();
    }, [navigate]);

    // Render a loading state while the authentication state is being checked
    if (loading) {
      return (<div className="App">
        <div className="Body" style={{background: "#393646"}}>
        </div>
      </div>);
    }

    return <Component />;
  };

  return AuthenticateComponent;
}

export default firebaseAuth;
