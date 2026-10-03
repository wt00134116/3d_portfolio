import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.dev variants={fadeIn("right", "spring", 0.5 * index, 0.75)} className="green-pink-gradient p-[1px] flex rounded-[20px] shadow-card">
        <div options={{ max: 45, scale: 1, speed: 450 }} className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col min-w-[100%]">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </motion.dev>
    </Tilt>
  )
}

// คำนวณจากวันเกิดและวันเริ่มงานทุกครั้งที่เปิดเว็บ ตัวเลขจึงไม่ล้าสมัย
const BIRTH_DATE = new Date('1995-04-03');
const CAREER_START = new Date('2019-07-01');

const yearsSince = (date) => {
  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) years -= 1;
  return years;
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>แนะนำตัว</p>
        <h2 className={styles.sectionHeadText}>ประวัติส่วนตัว</h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
        สวัสดีครับ ผมสุภาพ บุญทะโกสุม (ป็อป) อายุ {yearsSince(BIRTH_DATE)} ปี จบอุตสาหกรรมบัณฑิต
        จากมหาวิทยาลัยพระจอมเกล้าพระนครเหนือ ปัจจุบันเป็น Programmer ที่บริษัท หาดใหญ่อาณาจักรเบเกอรี่ จำกัด
        มีประสบการณ์ {yearsSince(CAREER_START)} ปี ตั้งแต่ปี 2019
        <br />
        <br />
        งานที่ทำประจำคือพัฒนาเว็บแอปพลิเคชันที่พนักงานใช้งานจริงในบริษัท เขียน API เชื่อมระบบ ERP
        (Microsoft Dynamics 365 Business Central) เข้ากับระบบภายใน ดูแลฐานข้อมูล SQL Server
        รวมถึงงาน IT Support และซ่อมบำรุงฮาร์ดแวร์ นอกเวลางานก็ทำแอปมือถือด้วย React Native และ Swift
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")