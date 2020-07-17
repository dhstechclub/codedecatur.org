import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import PythonImage1 from '../images/python_install_1.png'
import PythonImage2 from '../images/extensions.png'



const CoursesPage = () => {

  return (
    <Layout>
      <SEO title="Courses" />
        <div className="nav-spacing margin">
            <p>If you don't have Python set up yet, you can learn how to <a href="/install-python">here</a>.</p>
            <div className="course-intro-frame">
                <h2>Web Scraping</h2>
                <p>Ever wanted...</p>
                <Link>Tutorial</Link><br/>
                <Link>Code</Link>
            </div>
            <div className="course-intro-frame">
                <h2>Discord Bot</h2>
                <p>Ever wanted...</p>
                <Link>Tutorial</Link><br/>
                <Link>Code</Link>
            </div>
            <div className="course-intro-frame">
                <h2>Statistics With Python</h2>
                <p>Ever wanted...</p>
                <Link>Tutorial</Link><br/>
                <Link>Code</Link>
            </div>
        
        </div>
      
    </Layout>
  );
}

export default CoursesPage
