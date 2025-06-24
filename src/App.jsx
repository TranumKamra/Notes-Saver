import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'

import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const router = createBrowserRouter([
  /* Home -------------------------------------------------- */
  {
    path: '/',
    element: (
      <div className="page-wrapper">
        <Navbar />
        <Home />
      </div>
    ),
  },

  /* All pastes ------------------------------------------- */
  {
    path: '/pastes',
    element: (
       <div className="page-wrapper">
        <Navbar />
        <Paste />
      </div>
    ),
  },

  /* Single paste (VIEW page) ------------------------------ */
  {
    /* 👇 keep this exact path */
    path: '/pastes/:id',
    element: (
      <div className="page-wrapper">
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  


  return (
     <RouterProvider router={router}/>
  )
}

export default App
