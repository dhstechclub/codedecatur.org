import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"


const TutorialsPage = () => {
    return (
    <Layout>
        <SEO title="Tutorials" />
        <div className="nav-spacing margin">
            <div class="language-section">
                <h1>Python</h1>
                <hr/>
                <p>If you don't have Python set up yet, you can learn how to <a href="/install-python" className="purple">here</a>.</p>
                <div className="tutorial-intro-frame">
                    <table>
                        <tr>
                        <th><h3><Link to="/python">Intro to Python</Link></h3></th>
                            <td><p>Want to learn Python with no coding experience?</p></td>
                        </tr>
                        <tr>
                            <th><h3><Link to="/tutorials/web-scraper">Web Scraping</Link></h3></th>
                            <td><p>Ever wanted to scrape data off a web page and put it into your greedy little hands?<br/>Here you go!</p></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="language-section">
                <h1>Java</h1>
                <hr/>
                <p>If you don't have Java set up yet, you can learn how to <a href="/" className="purple">here</a>.</p>
                <div className="tutorial-intro-frame">
                    <table>
                        <tr>
                            <th><h3><Link to="/java">Intro to Java</Link></h3></th>
                            <td><p>Want to learn Java with some coding experience?</p></td>
                            
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
    );
}

export default TutorialsPage