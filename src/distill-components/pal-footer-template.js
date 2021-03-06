import logo from '../assets/pal-logo.base64';

export const palFooterTemplate = `
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.footer-container .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.footer-container .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.footer-container .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.footer-container {
  grid-column: text;
}

.footer-container .nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.footer-container .nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='footer-container'>

  <a href="/" class="logo">
    <img src="data:image/png;base64,${logo}" alt="PAL logo">
    Predictive Analytics Laboratory
  </a> does innovative machine learning research

  <div class="nav">
    <a href="https://predictive-analytics-lab.com/#important_dates">About</a>
    <a href="https://predictive-analytics-lab.com/#projects">Projects</a>
    <a href="https://predictive-analytics-lab.com/#teampics">Team</a>
    <a href="https://predictive-analytics-lab.com/publications">Publications</a>
    <a href="https://predictive-analytics-lab.com/reading">Reading Group</a>
    <a href="https://predictive-analytics-lab.com/#contactUs">Contact</a>
    <a href="https://github.com/predictive-analytics-lab">GitHub</a>
  </div>

</div>

`;
