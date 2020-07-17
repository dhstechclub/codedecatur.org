import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const projects = [
    {"url": "https://codecatur.com/", "name": "Code Decatur", "author": "Hayden Carpenter", "redirect": false},
    {"url": "https://dev.dance", "name": "Portfolio Website", "author": "Hayden Carpenter"},
    {"url": "https://github.com/xHayden/Karten", "name": "Karten (Flashcards)", "author": "Hayden Carpenter", "redirect": false},
    {"url": "http://cleverlynamedwebsite.pw/hexa", "name": "Hexa (Game)", "author": "Carter Semrad"},
    {"url": "http://cleverlynamedwebsite.pw/soccer/webSoccer/", "name": "Web Soccer (Game)", "author": "Carter Semrad"},
    {"url": "https://veryclevername3.github.io/DifferentialEquations/", "name": "Differential Equations Modeling", "author": "Carter Semrad"},
    {"url": "https://veryclevername3.itch.io/host", "name": "HOST (Game)", "author": "Carter Semrad"},


]
let authorSections = {}
projects.map((data, index) => {
    if(authorSections[data.author] == undefined){
        authorSections[data.author] = [{"url": data.url, "name": data.name, "author": data.author, "redirect": data.redirect}]
    }
    else {
        authorSections[data.author].push({"url": data.url, "name": data.name, "author": data.author, "redirect": data.redirect})
    }
})

let authorSectionsArray = []
for(let key in authorSections){
    authorSectionsArray.push(authorSections[key])
}

const ProjectsPage = () => (
  <Layout>
    <SEO title="Projects" />
    <div className="projects-frame">
        <h1>Projects</h1>
        <h3>These projects have been created by Code Decatur members.</h3>
        <table>
            {authorSectionsArray.map((data, index) => {
                return <div>
                    {data.map((project, index) => {
                        let target = "_blank"
                        if(project.redirect == false){
                            target = ""
                        }
                        if(index == 0){
                            return (
                            <tr>
                                <th rowSpan={data.length}>{project.author}</th>
                                <td><Link target={target} rel="noreferrer" to={project.url}>{project.name}</Link></td>
                            </tr>);
                        }
                        else {
                            return (
                            <tr>
                                <td><Link target={target} rel="noreferrer" to={project.url}>{project.name}</Link></td>
                            </tr>);
                        }
                    })}
                </div>
            })}
        </table>
        <br></br>
        <p>Ask and we'll add your project!</p>
    </div>
  </Layout>
)

export default ProjectsPage