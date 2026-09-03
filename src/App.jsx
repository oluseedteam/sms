import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import AiAssistantModal from './components/AiAssistantModal';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
      <AiAssistantModal />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
};

export default App;