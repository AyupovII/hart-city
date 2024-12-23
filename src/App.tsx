import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AuthAuthorization from './components/auth/authAuthorization/AuthAuthorization'
import AuthPasswordRecovery from './components/auth/authPasswordRecovery/AuthPasswordRecovery'
import AuthLiveRequestRegistration from './components/auth/authLiveRequestRegistration/AuthLiveRequestRegistration'
import MainLayout from './components/mainLayout/MainLayout'
import Main from './pages/Main'
import { createContext, useEffect, useState } from 'react'
import ObjectsPage from './pages/ObjectsPage'
import ObjectIdPage from './pages/ObjectIdPage'
import MyRequestsPage from './pages/MyRequestsPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { observer } from 'mobx-react-lite'
import { AuthorizationStatus } from './assets/types/enum'
import NotFoundPage from './pages/NotFoundPage'
import ContactsPage from './pages/ContactsPage'
import NewsAndPromotions from './pages/NewsAndPromotions'
import ClientsPage from './pages/ClientsPage'
import ProfilePage from './pages/ProfilePage'
import { ToastContainer } from 'react-toastify'
import AuthChangePassword from './components/auth/authChangePassword/AuthChangePassword'
import AuthLayout from './components/auth/authLayout/AuthLayout'
import store from './store'
import Loading from './components/loading/Loading'

export type ContextType = {
  hiddenScroll: boolean;
  setHiddenScroll: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
};
export const Context = createContext<ContextType>({} as ContextType);

function App() {
  const [menuOpen, setMenuOpen] = useState(true)
  const [hiddenScroll, setHiddenScroll] = useState(false);
  const queryClient = new QueryClient();
  const authStore = store.authStore
  console.log(authStore.isAuth)
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('token'))
        authStore.setAuth(AuthorizationStatus.Auth)
      else
        authStore.setAuth(AuthorizationStatus.NoAuth)
    }
      , 1000)
  }, [authStore.isAuth])
  return (
    <Context.Provider value={{ hiddenScroll, setHiddenScroll, menuOpen, setMenuOpen }}>
      <QueryClientProvider client={queryClient}>
        <div className={hiddenScroll ? '_lock' : ''}>
          <Routes>
            {(authStore.isAuth === AuthorizationStatus.NoAuth)
              &&
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Navigate to="auth" replace />} />
                <Route path="auth">
                  <Route index element={<AuthAuthorization />} />
                  <Route path="password-recovery" element={<AuthPasswordRecovery />} />
                  <Route path="change-password" element={<AuthChangePassword />} />
                  <Route path="live-request-registration" element={<AuthLiveRequestRegistration />} />
                </Route>
                <Route path="*" element={<Navigate to="auth" replace />} />

              </Route>}
            {(authStore.isAuth === AuthorizationStatus.Auth)
              &&
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Main />} />
                <Route path="objects" >
                  <Route index element={<ObjectsPage />} />
                  <Route path=":objectId" element={<ObjectIdPage />} />
                </Route>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="my-requests" element={<MyRequestsPage />} />
                <Route path="auth" element={<Navigate to="/" replace />} />
                <Route path="clients" element={<ClientsPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="news-and-promotions" element={<NewsAndPromotions />} />
                <Route path="*" element={<NotFoundPage />} />

              </Route>}
            {
              (authStore.isAuth === AuthorizationStatus.Unknown) && <Route path="*" element={<Loading />} />
            }
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </Context.Provider>
  )
}

export default observer(App)
