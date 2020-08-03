// Netlify CMS exposes two React method "createClass" and "h"
import htm from 'htm';
import markdownIt from "markdown-it";
import markdownItKatex from "@iktakahiro/markdown-it-katex";
import { CMS, h, createClass } from 'netlify-cms-app';
import Prism from "prismjs";
const html = htm.bind(h); 
 
let options = {
    html: true,
    typographer: true,
    linkify: true,
    highlight: function (str, lang) {
      var languageString = "language-" + lang;
      if (Prism.languages[lang]) {
        return '<pre class="language-' + lang + '"><code class="language-' + lang + '">' + Prism.highlight(str, Prism.languages[lang], lang) + '</code></pre>';
      } else {
        return '<pre class="language-' + lang + '"><code class="language-' + lang + '">' + Prism.util.encode(str) + '</code></pre>';
      }
    }
  };
var customMarkdownIt = new markdownIt(options);

let Tutorial = createClass({
    render() {
      const entry = this.props.entry;
      const title = entry.getIn(["data", "title"], null);
      const body = entry.getIn(["data", "body"], null);
      const bodyRendered = customMarkdownIt.render(body || '');
  
      return html`
      <body>
        <main>
          <article>
            <h1>${title}</h1>
            <div dangerouslySetInnerHTML=${{__html: bodyRendered}}></div>
          </article>
        </main>
      </body>
      `;
    }
  });
  
CMS.registerPreviewTemplate('tutorial', Tutorial);

export default Tutorial;