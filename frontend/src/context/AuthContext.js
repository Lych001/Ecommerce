import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await fetch('http://192.168.1.7:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      const data = await response.json();
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('tipo_usuario', user.tipo_usuario);
      setUser(user);
      return null; 
    } catch (error) {
      return error.message;
    }
  };

  const logout = async () => {
    try {
      await fetch('http://192.168.1.7:5000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token'); 
      localStorage.removeItem('tipo_usuario'); 
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://192.168.1.7:5000/auth/verify-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          setUser(data.user); 
          localStorage.setItem('tipo_usuario', data.user.tipo_usuario);
        } else {
          localStorage.removeItem('token'); 
          localStorage.removeItem('tipo_usuario'); 
          setUser(null);
        }
      })
      .catch(error => {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('tipo_usuario');
        setUser(null);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
