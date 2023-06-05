import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const withAuth = (Component) => {
  const AuthenticateComponent = () => {
    const navigate = useNavigate();

    useEffect(() =>{
      const checkAccess = async () => {
        const token = localStorage.getItem('accessToken');
        console.log('Authenticating...');

        try {
          const response = await axios.get('http://localhost:3001/allowAccess', {
            headers: {
              Authorization:`Bearer ${token}`,
            }
          });

          console.log(response.data);

          if (response.data === 'not allowed') {
            navigate('/login');
          }
        } catch (error) {
          console.error(error);
        }
      };

      checkAccess();
    }, [navigate]);

    return <Component/>
  }

  return AuthenticateComponent;
}

export default withAuth;