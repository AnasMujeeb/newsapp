import React, { Component } from 'react'
import News from "./Component/News.jsx"
import Header from "./Component/Header.jsx"
import {BrowserRouter,Route,Routes} from 'react-router-dom'

export default class App extends Component {

  render() {
    return (
      <>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route exact path="/" element={<News key="general" category="General"/>}/>
      <Route exact path="/entertainment" element={<News key="entertainment" category="Entertainment"/>}/>
      <Route exact path="/sports" element={<News key="sports" category="Sports"/>}/>
      <Route exact path="/business" element={<News key="business" category="Business"/>}/>
      <Route exact path="/politics" element={<News key="politics" category="politics"/>}/>
      <Route exact path="/health" element={<News key="health" category="Health"/>}/>
      <Route exact path="/science" element={<News key="science" category="Science"/>}/>
      <Route exact path="/technology" element={<News key="technology" category="Technology"/>}/>

      </Routes>
      </BrowserRouter>
      </>
    )
  }
}

