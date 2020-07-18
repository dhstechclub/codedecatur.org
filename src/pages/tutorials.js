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
                            <th className="tutorial-list-table-element"><h3><Link to="/python">Intro to Python</Link></h3></th>
                            <td className="tutorial-list-table-element"><p>Want to learn Python with no coding experience?</p></td>
                        </tr>
                        <tr>
                            <th className="tutorial-list-table-element"><h3><Link to="/tutorials/web-scraper">Web Scraping</Link></h3></th>
                            <td className="tutorial-list-table-element"><p>Ever wanted to scrape data off a web page and put it into your greedy little hands?<br/>Here you go!</p></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="language-section">
                <h1>Javascript</h1>
                <hr/>
                <p>If you don't have Javascript set up yet, you can learn how to <a href="/" className="purple">here</a>.</p>
                <div className="tutorial-intro-frame">
                    <table>
                        <tr>
                            <th className="tutorial-list-table-element"><h3><Link to="/javascript">Intro to Javascript</Link></h3></th>
                            <td className="tutorial-list-table-element"><p>Want to learn Javascript with some coding experience?</p></td>
                            
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
                            <th className="tutorial-list-table-element"><h3><Link to="/java">Intro to Java</Link></h3></th>
                            <td className="tutorial-list-table-element"><p>Want to learn Java with some more coding experience?</p></td>
                            
                        </tr>
                    </table>
                </div>
            </div>
            <div class="language-section">
                <h1>C#</h1>
                <hr/>
                <p>If you don't have C# set up yet, you can learn how to <a href="/" className="purple">here</a>.</p>
                <div className="tutorial-intro-frame">
                    <table>
                        <tr>
                            <th className="tutorial-list-table-element"><h3><Link to="/csharp">Intro to C#</Link></h3></th>
                            <td className="tutorial-list-table-element"><p>Want to learn C#?</p></td>
                            
                        </tr>
                    </table>
                </div>
            </div>
            <div class="language-section">
                <h1>C++</h1>
                <hr/>
                <p>If you don't have C++ set up yet, you can learn how to <a href="/" className="purple">here</a>.</p>
                <div className="tutorial-intro-frame">
                    <table>
                        <tr>
                            <th className="tutorial-list-table-element"><h3><Link to="/cplusplus">Intro to C++</Link></h3></th>
                            <td className="tutorial-list-table-element"><p>Want to learn C++?</p></td>
                            
                        </tr>
                    </table>
                </div>
            </div>
            <div class="language-section">
                <h1>Assembly</h1>
                <hr/>
                <p>If you don't have Assembly set up yet, you can learn how to <a href="/" className="purple">here</a>.</p>
                <div className="tutorial-intro-frame">
                    <table>
                        <tr>
                            <th className="tutorial-list-table-element"><h3><Link to="/assembly">Intro to ASM</Link></h3></th>
                            <td className="tutorial-list-table-element"><p>Want to learn ASM? Why?</p></td>
                            
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
    );
}

export default TutorialsPage