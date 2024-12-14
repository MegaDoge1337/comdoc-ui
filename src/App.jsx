import { BrowserRouter, Routes, Route } from "react-router-dom"
import './app.css'

import DefaultLayout from './layouts/DefaultLayout'
import Index from "./pages/Index"
import Single from "./pages/Single"
import CompareDocuments from "./pages/CompareDocuments"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<Index/>}/>
          <Route path="/view/:id" element={<Single/>}/>
          <Route path="/compare" element={<CompareDocuments/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
