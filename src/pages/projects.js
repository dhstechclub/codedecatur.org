import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const projects = [
    {"url": "https://codedecatur.org/", "name": "Code Decatur", "author": "Hayden Carpenter", "redirect": false},
    {"url": "https://dev.dance", "name": "Portfolio Website", "author": "Hayden Carpenter"},
    {"url": "https://codedecatur.org/karten/", "name": "Karten (Flashcards)", "author": "Hayden Carpenter", "redirect": false},
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
    <div className="projects-frame nav-spacing">
        <h3>These projects have been created by Code Decatur members.</h3>
        <hr></hr>
        <table>
            {authorSectionsArray.map((data, index) => {
                return <tbody>
                    {data.map((project, index) => {
                        let target = "_blank"
                        if(project.redirect == false){
                            target = ""
                        }
                        if(index == 0){
                            return (
                            <tr>
                                <th rowSpan={data.length}>{project.author}</th>
                                <td><a target={target} rel="noreferrer" href={project.url}>{project.name}</a></td>
                            </tr>);
                        }
                        else {
                            return (
                            <tr>
                                <td><a target={target} rel="noreferrer" href={project.url}>{project.name}</a></td>
                            </tr>);
                        }
                    })}
                </tbody>
            })}
        </table>
        <br></br>
        <p>Ask and we'll add your project!</p>
    </div>
  </Layout>
)

export default ProjectsPage