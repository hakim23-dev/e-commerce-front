import React from 'react'
import Title from '../components/Title'
import NewLetterBox from '../components/NewLetterBox'

export default function About() {
  return (
    <section>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src="./images/about.jpg" alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. 
            Our journey began with a simple idea: to provide a platform where customers can easily discover, axplore, 
            and purchase a wide range of products from teh comfort of their homes
          </p>
          <p>
            Since our inception, we've worked tirelessly to create to curate a diverse selection of hight-quality products that cater to every teste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission at forever is to empower customers with choice, concenience,
            and confidence. We've dedicated to providing a shopping experience that exceeds
            expectations, from browsing and ordering to delivery and beyond
          </p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assuarance:</b>
          <p className='text-gray-600'>
            We meticulously select and vit each product to ensure ir meets
            our stringent quality standars.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Concenience:</b>
          <p className='text-gray-600'>
            With our user-friendly interface and hassie-free ordering free
            ordering process, shopping has never been easier.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our team of dedicated professionals is here to assist you the way, ensuring
            your satisfaction is our top priority/
          </p>
        </div>
      </div>
      <NewLetterBox/>
    </section>
  )
}
