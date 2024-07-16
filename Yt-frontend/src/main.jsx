
/*const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}
        ></Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
  )
  */


  import React from 'react';
  import { Provider } from 'react-redux';
  import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
  import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
  
  import App from './App';
  import store from '../src/store/store'; // Ensure you have your Redux store configured properly
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} />
    )
  );
  
  // Use createRoot from react-dom/client instead of react-dom
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
  );
  