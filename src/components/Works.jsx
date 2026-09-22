import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import {
  github,
  html,
  css,
  javascript,
  reactjs,
  tailwind,
  nodejs,
  sql,
  nav,
  php,
  jquery,
  bootstrap,
  git,
  docker,
  typescript,
  redux,
  mongodb,
  figma,
  threejs,
} from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// Every image dropped into src/assets/projects/ is picked up automatically
const projectImages = import.meta.glob("../assets/projects/*", { eager: true, import: "default" });
const getProjectImage = (image) => projectImages[`../assets/projects/${image}`] ?? image;

// Tag name -> tech icon. Tags without a match simply render as text.
const techIcons = {
  html, html5: html,
  css, css3: css,
  javascript, js: javascript,
  typescript, ts: typescript,
  reactjs, react: reactjs,
  tailwind, tailwindcss: tailwind,
  nodejs, node: nodejs,
  sql, sqlserver: sql, mssql: sql,
  nav, businesscentral: nav, dbc365: nav,
  php,
  jquery,
  bootstrap,
  git,
  docker,
  redux,
  mongodb,
  figma,
  threejs,
};
const iconFor = (tagName) => techIcons[tagName.toLowerCase().replace(/[\s._-]/g, "")];

const tagName = (tag) => (typeof tag === "string" ? tag : tag.name);

const ProjectRow = ({
  index,
  name,
  description,
  category,
  year,
  tags = [],
  highlights = [],
  image,
  images,
  stats = [],
  source_code_link,
}) => {
  const gallery = images?.length ? images : image ? [image] : [];
  const [active, setActive] = useState(0);
  const imageFirst = index % 2 === 0;
  const meta = [category, year].filter(Boolean).join(" · ");

  return (
    <motion.div
      variants={fadeIn(imageFirst ? "right" : "left", "spring", 0.1, 0.9)}
      // Each row animates on its own entry: the section can be many screens tall
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`flex flex-col ${imageFirst ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-14 items-center`}
    >
      <div className="w-full lg:w-1/2">
        {(gallery.length > 0 || stats.length > 0) && (
          <div className="bg-tertiary rounded-2xl overflow-hidden shadow-card">
            <div className="flex items-center gap-2 px-4 py-3 bg-black-200">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            {gallery.length > 0 ? (
              <img
                src={getProjectImage(gallery[active])}
                alt={name}
                className="w-full aspect-[16/10] object-cover object-top"
              />
            ) : (
              // Back-end work with nothing to screenshot: show its key numbers in the same frame
              <div className="w-full aspect-[16/10] grid grid-cols-2 gap-px bg-black-200">
                {stats.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="bg-tertiary flex flex-col justify-center px-6">
                    <span className="text-white font-black text-[36px] sm:text-[48px] leading-none">{stat.value}</span>
                    <span className="mt-3 text-secondary text-[14px]">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {gallery.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {gallery.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`ดูรูปที่ ${i + 1} ของ ${name}`}
                aria-current={i === active}
                className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-opacity ${
                  i === active ? "border-[#915EFF]" : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img src={getProjectImage(img)} alt="" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2">
        {meta && <p className="text-secondary text-[14px] uppercase tracking-wider">{meta}</p>}

        <h3 className="text-white font-bold text-[28px] sm:text-[34px] mt-1">{name}</h3>

        <p className="mt-4 text-secondary text-[16px] leading-[28px]">{description}</p>

        {highlights.length > 0 && (
          <ul className="mt-6 flex flex-col gap-3">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-white-100 text-[15px] leading-[26px]">
                <span className="text-[#915EFF] leading-[26px]">▸</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {tags.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {tags.map((tag) => {
              const label = tagName(tag);
              const icon = iconFor(label);
              return (
                <span
                  key={label}
                  className="flex items-center gap-2 bg-tertiary rounded-lg px-3 py-2 text-secondary text-[13px]"
                >
                  {icon && <img src={icon} alt="" className="w-4 h-4 object-contain" />}
                  {label}
                </span>
              );
            })}
          </div>
        )}

        {source_code_link && source_code_link !== "#" && (
          <button
            type="button"
            onClick={() => window.open(source_code_link, "_blank")}
            className="mt-7 flex items-center gap-2 bg-tertiary hover:bg-black-200 transition-colors rounded-lg px-5 py-3 text-white text-[14px]"
          >
            <img src={github} alt="" className="w-5 h-5 object-contain" />
            ดูซอร์สโค้ด
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          ผลงาน
        </p>
        <h2 className={styles.sectionHeadText}>
          โปรเจค
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          โปรเจคข้างต้นที่แสดง เป็นการแสดงถึงความสามารถและประสบการณ์ผ่านงานของจริง ซึ่งในแต่ละโปรเจคจะเป็นการอธิบายแบบคร่าวๆเท่านั้น
        </motion.p>
      </div>

      <div className="mt-20 flex flex-col gap-20 lg:gap-28">
        {projects.map((project, index) => (
          <ProjectRow key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "work")
