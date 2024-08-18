/* eslint-disable no-unused-vars */
import React from "react"
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./app/store"
import Auth from "./components/Auth"
import Blog from "./components/Blog"
import BlogList from "./components/BlogList"
import BlogUpdate from "./components/BlogUpdate"
import CreateBlog from "./components/CreateBlog"
import Header from "./components/Header"
import MyBlogs from "./components/MyBlogs"
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/auth/login" element={<Auth type="login" />} />
          <Route path="/auth/register" element={<Auth type="register" />} />
          <Route path="/" element={<BlogList />}/>
          <Route path="/blogs/:id" element={<Blog />}/>
          <Route path="/update-blog/:id" element={<BlogUpdate />}/>
          <Route path="myblogs" element={<MyBlogs />}/>
          <Route path="/create-blog" element={<CreateBlog />}/>
        </Routes>
      </Router>
    </Provider>
    
  )
}

export default App
