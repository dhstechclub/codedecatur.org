import React from "react"
import { Link } from "gatsby"
import SmartSlider from "react-smart-slider";
import Layout from "../components/layout"
import SEO from "../components/seo"
import hexa from "../images/promo/hexa.png"
import host from "../images/promo/host.png"
import portfolio from "../images/promo/redditwedidit.png"
import mte from "../images/promo/miditoearsketch.png"
import spotlight from "../images/promo/spotlight.png"


const projects = [
    {"url": "https://codedecatur.org/", "name": "Code Decatur", "author": "Hayden Carpenter", "redirect": false},
    {"url": "https://dev.dance", "name": "Portfolio Website", "author": "Hayden Carpenter"},
    {"url": "https://codedecatur.org/Karten/", "name": "Karten (Flashcards)", "author": "Hayden Carpenter", "redirect": false},
    {"url": "https://frc4026.com", "name": "Scout Janssen", "author": "Hayden Carpenter"},
    {"url": "http://cleverlynamedwebsite.pw/hexa", "name": "Hexa (Game)", "author": "Carter Semrad"},
    {"url": "http://cleverlynamedwebsite.pw/soccer/webSoccer/", "name": "Web Soccer (Game)", "author": "Carter Semrad"},
    {"url": "https://veryclevername3.github.io/DifferentialEquations/", "name": "Differential Equations Modeling", "author": "Carter Semrad"},
    {"url": "https://veryclevername3.itch.io/host", "name": "HOST (Game)", "author": "Carter Semrad"},
    {"url": "https://frc4026.com", "name": "Scout Janssen: Graphs and Statistics", "author": "Carter Semrad"},

]

const DummyCaption = ({ caption }) => (<div className="image-slider-caption">{caption}</div>)
   
const slidesArray = [
{
    url: host,
    childrenElem: <DummyCaption caption="'HOST' by Carter Semrad" />
},
{
    url: mte,
    childrenElem: <DummyCaption caption="'Midi To Earksetch' by Hayden Carpenter and Carter Semrad" />
},
{
    url: hexa,
    childrenElem: <DummyCaption caption="'Hexa' by Carter Semrad and Quinn O'Keefe" />
},
{
    url: portfolio,
    childrenElem: <DummyCaption caption="'Scout Janssen' by Hayden Carpenter" />
},
{
    url: spotlight,
    childrenElem: <DummyCaption caption="'Spotlight' by Carter Semrad and Hayden Carpenter" />
},
];

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
        <div>
            <div className="outer-slideshow-promo-container">
                <div className="slideshow-promo-container">
                    <SmartSlider slides={slidesArray} autoSlide={false} />
                </div>
            </div>
        </div>
        <table className="projects-table">
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