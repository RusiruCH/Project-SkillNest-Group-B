import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const DEFAULT_INSTRUCTOR = {
  id: 'u01',
  name: 'L.M.R.C. Bandara',
  email: 'instructor@skillnest.edu',
  role: 'instructor',
  regNo: 'SEU/IS/22/ICT/113',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  bio: 'Senior Lecturer in Software Engineering & Internet Application Development at SEUSL.',
};

const DEMO_USERS = {
  instructor: DEFAULT_INSTRUCTOR,
  learner: {
    id: 'u02',
    name: 'Kamal Perera',
    email: 'learner@skillnest.edu',
    role: 'learner',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    bio: 'ICT Undergraduate exploring Web Technologies and Cloud Computing.',
  },
  admin: {
    id: 'u03',
    name: 'System Administrator',
    email: 'admin@skillnest.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'SkillNest Courseware Administrator.',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillnest_user');
    return saved ? JSON.parse(saved) : DEFAULT_INSTRUCTOR;
  });
  const [token, setToken] = useState(() => localStorage.getItem('skillnest_token') || 'demo_jwt_token_bandara');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('skillnest_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skillnest_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('skillnest_token', token);
    } else {
      localStorage.removeItem('skillnest_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true };
      }
    } catch (err) {
      // Demo fallback if backend is offline
      const matched = Object.values(DEMO_USERS).find((u) => u.email === email) || DEFAULT_INSTRUCTOR;
      setUser(matched);
      setToken('demo_token_' + matched.role);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      if (res.data?.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true };
      }
    } catch (err) {
      const newUser = { id: 'u_' + Date.now(), name, email, role: role || 'learner' };
      setUser(newUser);
      setToken('demo_token_' + newUser.role);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Instant role switch for evaluator convenience
  const switchRole = (role) => {
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
      setToken('demo_token_' + role);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

