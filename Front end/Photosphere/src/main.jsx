import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AxiosContext, { axiosInstance } from '../Contexts/AxioContext.jsx';
import { Provider } from 'react-redux'
import store from '../Store/AuthRedux.jsx';
import AuthContext from '../Contexts/AuthContext.jsx';
import { WebSocketProvider } from '../Contexts/WebSocketContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="429647005200-4ge95uarifr8s24bjgm780m91m8s2mkv.apps.googleusercontent.com">
        <AxiosContext.Provider value={axiosInstance}>
          <WebSocketProvider>
            <AuthContext>
              <App />
            </AuthContext>
          </WebSocketProvider>
        </AxiosContext.Provider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
