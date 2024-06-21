import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    //Not send when refresh page F5
    e.preventDefault();
    setLoading(true);

    //Public Key
    //YQWVZ0qQ2W2AlgyN0

    //Template Email
    //template_kdet8oe

    //Services ID Email
    //service_2i3zxe2

    emailjs.send(
      'service_2i3zxe2',
      'template_kdet8oe',
      {
        from_name: form.name,
        to_name: 'Pop',
        from_email: form.email,
        to_email: 'popandcat@hotmail.com',
        message: form.message,
      },
      'YQWVZ0qQ2W2AlgyN0'
    )
    .then(() => {
      setLoading(false);
      alert('ขอบคุณสำหรับความสนใจ ผมจะรีบติดต่อกลับไปโดยทันทีครับ');

      setForm({
        name: '',
        email: '',
        message: '',
      })
    }, (error) => {
      setLoading(false)

      console.log(error);

      alert('มีบางอย่างผิดปกติ กรุณาลองใหม่อีกครั้งครับ')
    })
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] bg-black-100 p-8 roudend-2xl">
        <p className={styles.sectionSubText}>ติดต่อ</p>
        <h3 className={styles.sectionHeadText}>ข้อมูลติดต่อ</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          {/* Name */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              ชื่อ
            </span>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder='ชื่อของคุณ' className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              อีเมลล์
            </span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="อีเมลล์ของคุณ" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          {/* Message */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              ข้อความ
            </span>
            <textarea rows="7" name="message" value={form.message} onChange={handleChange} placeholder="ข้อความของคุณ" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          <button type="submit" className="bg-tertiary py-3 px-8 outline-nonee w-fit text-white font-bold shadow-md shadow-primary rounded-xl">{loading ? 'Sending...' : 'Send'}</button>
        </form>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")