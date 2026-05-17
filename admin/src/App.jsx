import React from 'react'

import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

import Add from './pages/Add/Add.jsx'
import Orders from './pages/Orders/Orders.jsx'
import List from './pages/List/List.jsx'
import Login from './components/Login/Login.jsx'

import 'react-toastify/dist/ReactToastify.css';

import {
  ToastContainer,
  toast
} from 'react-toastify';


const App = () => {

  // TOKEN
  const token = localStorage.getItem("token");


  // TOAST
  const handleAddItem = () => {

    toast.success(
      "Item added successfully!",
      {
        position: "top-right",
        autoClose: 2000,
      }
    );
  };


  return (

    <div>

      {
        token

          ?

          // =================================
          // ADMIN PANEL
          // =================================

          <>

            <Navbar />

            <hr />

            <div className="app-content">

              <Sidebar />

              <Routes>

                <Route
                  path='/add'
                  element={
                    <Add
                      onAddItem={handleAddItem}
                    />
                  }
                />

                <Route
                  path='/list'
                  element={<List />}
                />

                <Route
                  path='/orders'
                  element={<Orders />}
                />

                {/* DEFAULT REDIRECT */}
                <Route
                  path='*'
                  element={<Navigate to='/add' />}
                />

              </Routes>

            </div>

          </>

          :

          // =================================
          // LOGIN PAGE
          // =================================

          <Routes>

            <Route
              path='/login'
              element={<Login />}
            />

            {/* DEFAULT REDIRECT */}
            <Route
              path='*'
              element={<Navigate to='/login' />}
            />

          </Routes>
      }

      <ToastContainer />

    </div>
  )
}

export default App