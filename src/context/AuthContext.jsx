/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { saveSession, clearSession, updateProfile } from "../services/authService";
import { Loader2, Camera, X } from "lucide-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login
  const login = (data) => {
    saveSession(data); // your existing function
    setUser(data.user);
  };

  // Logout
  const logout = () => {
    clearSession();
    setUser(null);
  };

  const updateUser = (updatedProps) => {
    const newUser = { ...user, ...updatedProps };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
      {user?.is_first_login && <FirstLoginModal onComplete={updateUser} />}
    </AuthContext.Provider>
  );
};

const FirstLoginModal = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setError("Please upload a profile picture to continue.");
    
    setLoading(true);
    setError("");
    try {
      const res = await updateProfile({ profile_picture: image });
      onComplete(res.user || { is_first_login: false, profile_picture: image });
    } catch (err) {
      setError(err.message || "Failed to upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 text-center animate-in zoom-in-95 relative">
        {/* Close Button */}
        <button 
          onClick={() => onComplete({ is_first_login: false })}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
        <p className="text-gray-500 mb-6 font-medium">Please upload a profile picture to complete your setup.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mx-auto w-32 h-32 relative flex items-center justify-center bg-gray-100 rounded-full border-4 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer overflow-hidden group">
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          
          {error && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl">{error}</div>}
          
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/30">
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Uploading..." : "Save and Continue"}
            </button>
            
            <button 
              type="button"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await updateProfile({ is_skipped: true });
                  onComplete(res.user || { is_first_login: false });
                } catch (err) {
                  setError(err.message || "Failed to skip.");
                } finally {
                  setLoading(false);
                }
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold transition-all"
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};