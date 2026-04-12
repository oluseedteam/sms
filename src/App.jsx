import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from '../src/routes/AppRoutes'

const App = () => {
  return (
    <AuthProvider>
       <AppRoutes/>
    </AuthProvider>
  )
}

export default App