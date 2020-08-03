import React, { useState, } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"



const toggleLanguage = (langArr, lang, checkboxName) => {
    langArr[lang] = !langArr[lang]
    let currentState = langArr[lang]
    
    let langElements = document.getElementsByClassName(lang);
    for(let i = 0; i < langElements.length; i++){
        if(currentState){
            langElements[i].style.display = 'block';
            document.getElementById(checkboxName).style["backgroundColor"] = 'rgba(0, 255, 0, 0.2)';
            
        }
        else {
            langElements[i].style.display = 'none';
            document.getElementById(checkboxName).style["backgroundColor"] = 'rgba(255, 0, 0, 0.2)';
        }
        
    }
    return langArr
}

const LanguageCheckbox = (props) => {
    let checkboxName = `${props.language}-checkbox`;
    let labelName = `${props.language}-label`;
    let langUpper = props.language.charAt(0).toUpperCase() + props.language.slice(1)
    if(langUpper == "Csharp"){
        langUpper = "C#";
    }
    else if(langUpper = "Cplusplus"){
        langUpper = "C++";
    }
    return (
        <button style={{'marginRight': "20px", 'backgroundColor': 'rgba(0, 255, 0, 0.2)'}} onClick={() => props.setlangs(toggleLanguage(props.langs, props.language, checkboxName))} id={checkboxName}><p htmlFor={checkboxName} id={labelName} style={{'marginBottom': 0}}>{langUpper}</p></button>
    )
}



const NewTutorialPage = () => {
    const [languages, setLanguages] = useState({"javascript": true, "python": true, "java": true, "csharp": true, "cplusplus": true});

    return <Layout>
    <SEO title="Tutorials" />
    <div className="nav-spacing margin">
        <h1 className="pixel-font">Tutorials</h1>
        <div>
            <LanguageCheckbox langs={languages} setlangs={setLanguages} language="python"/>
            <LanguageCheckbox langs={languages} setlangs={setLanguages} language="javascript"/>
            <LanguageCheckbox langs={languages} setlangs={setLanguages} language="java"/>
            <LanguageCheckbox langs={languages} setlangs={setLanguages} language="csharp"/>
            <LanguageCheckbox langs={languages} setlangs={setLanguages} language="cplusplus"/>
        </div>
        <table>
            <StaticQuery query={graphql`  
                            query CoursesQuery {
                                allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/courses/"}}, sort: {fields: frontmatter___difficulty, order: ASC}) {
                                    nodes {
                                        frontmatter {
                                            slug
                                            date
                                            author
                                            title
                                            language
                                            difficulty
                                            description
                                        }
                                    }
                                }
                            }
                        `}
            render={data => {
                return <tbody>
                    {data.allMarkdownRemark.nodes.map((node) => {
                        let slug;
                        if(node.frontmatter.slug == undefined || node.frontmatter.slug == ""){
                            slug = `/tutorials/${node.frontmatter.language}/${node.frontmatter.title}`;
                            slug = slug.replace(/\s/g, '-').toLowerCase();
                            slug = encodeURI(slug);
                        }
                        else {
                            slug = node.frontmatter.slug;
                        }
                        let stars = 'Difficulty: '
                        for(let i = 0; i < node.frontmatter.difficulty; i++){
                            stars += '⭐';
                        }
                        return <tr>
                                <td className={`blog-preview ${node.frontmatter.language}`}>
                                <div>
                                
                                    <Link className="link-to-blog" to={slug} key={slug}>{node.frontmatter.title}</Link><br/>
                                    {node.frontmatter.date}<br/>
                                    By {node.frontmatter.author}<br/>
                                    {stars}<br/>
                                    {node.frontmatter.description}
                                </div>
                            </td>
                        </tr>
                    })}
                    
                </tbody>
            }}  
            />
        </table>
    </div>
    </Layout>
 }

export default NewTutorialPage
