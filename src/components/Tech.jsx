import { TechBalls } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return <TechBalls technologies={technologies} />;
}

export default SectionWrapper(Tech, "");
