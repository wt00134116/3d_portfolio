import {
    mobile,
    backend,
    creator,
    web,

    javascript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    git,
    docker,
    nav,
    sql,
    php,
    jquery,
    bootstrap,

    cat,
    anajakbakery,

    carrent,
    jobit,
    tripguide,
    purchase,
    timeattendance,

  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Application Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "UX / UI Developer",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Navision Business Central 365",
      icon: nav,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "Sql Server",
      icon: sql,
    },
    {
      name: "Jquery",
      icon: jquery,
    },
    {
      name: "Bootstrap",
      icon: bootstrap,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "docker",
      icon: docker,
    },
    {
      name: "Php",
      icon: php,
    },
  ];
  
  const experiences = [
    {
      title: "ทดลองงาน",
      company_name: "บริษัทโทรคมนาคมในเทศบาลนครหาดใหญ่",
      icon: cat,
      iconBg: "#FFFFFF",
      date: "เป็นเวลา 3 เดือน",
      points: [
        "แจ้งวิธีให้แก่ลูกค้าเพื่อแก้ปัญหาอินเตอร์เน็ตเบื้องต้น",
        "แจ้งทิกเก็ตเพื่อส่งงานให้ฝ่ายซ่อมบำรุงลงพื้นที่",
        "หมั่นตรวจสอบเส้นทางการจราจรของอินเตอร์เน็ต เพื่อไม่ให้เกิดปัญหา",
      ],
    },
    {
      title: "Programmer / IT Support",
      company_name: "บริษัท หาดใหญ่อาณาจักรเบเกอรี่ จำกัด",
      icon: anajakbakery,
      iconBg: "#FFF7F5",
      date: "Jul 2019 - ปัจจุบัน",
      points: [
        "เขียนและพัฒนาเว็บแอพลิเคชั่นเพื่อตอบสนองต่อการใช้งานของพนักงาน",
        "ตรวจสอบโฟล์วการทำงานของระบบ ERP",
        "ตรวจสอบระบบ Interface ระหว่าง 2 โปรแกรม",
        "เช็คและซ่อมบำรุงอุปกรณ์ฮาร์ดแวร์ทุกตัว",
        "บำรุงรักษาฐานข้อมูล SQL SERVER",
        "ทำระบบ API เชื่อมต่อระหว่างโปรแกรมเข้าด้วยกัน",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Purchase Web",
      description:
        "เป็นเว็บไซต์ที่สร้างมาเพื่อบริหารข้อมูลการคลัง การจัดซื้อสินค้าของบริษัท รวมทั้งระบบเช็คช่องราคา POS โปรโมชั่นและการทำโปรโมชั่นสินค้าแยกย่อยต่างๆมากมาย โดยมีการเชื่อมต่อ API ไปยัง Business Central DBC365 เพื่อเช็คกับใบสั่งซื้อในระบบ NAV ด้วย",
      tags: [
        {
          name: "php",
          color: "blue-text-gradient",
        },
        {
          name: "sqlserver",
          color: "green-text-gradient",
        },
        {
          name: "bootstrap",
          color: "pink-text-gradient",
        },
      ],
      image: purchase,
      source_code_link: "#",
    },
    {
      name: "Time Attendance",
      description:
        "เป็นเว็บแอพลิเคชั่นที่สร้างขึ้นมาเพื่อให้พนักงานสามารถเช็คเวลาในการแสกนเข้างาน แสกนออกงานได้",
      tags: [
        {
          name: "php",
          color: "blue-text-gradient",
        },
        {
          name: "sqlserver",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: timeattendance,
      source_code_link: "#",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };