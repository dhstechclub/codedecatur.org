import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Table = (props) => {
    return (<div className="flex-container center">
        <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=NjhuZnJsajNrZWYzNzd0NzFlZ3NlNmZpaGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%234285F4&amp;showCalendars=0&amp;showTz=0&amp;showPrint=0&amp;showDate=0&amp;showNav=0&amp;showTabs=0&amp;showTitle=0" style={{'border-width':'0'}} width="800" height="600" frameborder="0" scrolling="no"></iframe>

    </div>);
}


const SchedulePage = () => (
  <Layout>
    <SEO title="Schedule" />
    <Table/>
  </Layout>
)

export default SchedulePage
