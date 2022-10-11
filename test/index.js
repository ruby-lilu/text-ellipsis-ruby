import { ellipsis } from "../src/main.js";

ellipsis.config({
  lineNum: 1,
  fontSize: "16px",
});

const ells = document.querySelectorAll(".ell");

ellipsis.watch(ells);
