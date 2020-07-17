import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import PythonImage1 from '../images/python_install_1.png'
import PythonImage2 from '../images/extensions.png'



const InstallPythonPage = () => {

  return (
    <Layout>
      <SEO title="Install Python" />
        <div id="python-install-frame">
            <h1>Local installation</h1>
            <img src={PythonImage1}></img>
            <p>
                To install Python onto your local system, navigate to  <Link target="_blank" to="https://www.python.org/downloads/" rel="norefferer">https://www.python.org/downloads/</Link>.
            </p>
            <p>
                Click on "Download Python" and start the executable.
            </p>
            <p>
                Make sure to add python to your PATH, otherwise you won't be able to use the 'python' command in your terminal.
            </p>
            <h3>
                Now that you've installed Python, you're ready to install an IDE, or Integrated Development Environment.
            </h3>
            <p>
                Any IDE that works will Python will do.<br/>
                Personally, I like Visual Studio Code, as it is very flexible and allows me to work with more than just Python.
                You can install VS Code <Link to="https://code.visualstudio.com/" target="_blank" rel="norefferer">here</Link>.<br/>
                Click "Download for Windows" and install VS Code.
            </p>
            <p>
                <br/>
                <h4>When you open VS Code, you'll see on the left side of the screen there is 4 boxes with one box slightly pushed away.</h4><br/>
                <img src={PythonImage2}></img> Clicking that icon will bring you to the extensions page. This can also be accessed with <b>Ctrl+Shift+X</b>.<br/>
                Search for python and install the extension. This will give you a Linter for python. The linter allows you to code much easier with formatting and shortcuts.<br/>
                It will also point out errors in your code, but you won't need that feature because you're a perfect programmer.
            </p>
            <p>
                At this point, you can probably figure out the rest. Simply create a .py file and open in in VS Code to start working!
            </p>
        </div>
      
    </Layout>
  );
}

export default InstallPythonPage
