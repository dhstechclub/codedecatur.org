import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const CoursesPage = () => {

  return (
    <Layout>
      <SEO title="Courses" />
        <div className="nav-spacing margin">
            <p>If you don't have Python set up yet, you can learn how to <a href="/install-python">here</a>.</p>
            <div className="course-intro-frame">
                <h2>Web Scraping</h2>
                <p>Ever wanted to scrape data off a web page and put it into your greedy little hands?<br/>Here you go!</p>
                <Link to="/courses/web-scraper">Tutorial</Link><br/>
                <Link>Code</Link>
            </div>
        
        </div>
      
    </Layout>
  );
}

export default CoursesPage
