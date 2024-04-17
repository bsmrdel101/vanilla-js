import { Component } from "./library/Component";
import "./styles/styles.scss";

function main() {
  return Component(`
    <h1>Hello World!</h1>
  `);
}

document.body.appendChild(main());
