import React from 'react'

export default function page() {
  let course = {
    title:"Harmony Flow Yoga Course",
    description:"Embark on a transformative journey of self-discovery and holistic wellness with our Harmony Flow Yoga Course. This comprehensive program is designed to nourish your mind, body, and spirit through the ancient practice of yoga. Guided by experienced instructors, you'll explore a variety of yoga styles, including Vinyasa, Hatha, and Restorative, allowing you to find the perfect balance for your unique needs.",
    image:"https://img.freepik.com/free-photo/yoga-group-classes-inside-gym_1303-14779.jpg?t=st=1712656773~exp=1712660373~hmac=1083f893399aca8c42b90e4b6133cef6a2fb80a160f664a6d5350d31c13415f6&w=1380"
  }
  return (
    <>
    <div className='text-2xl font-bold ml-2 my-4 '>{course.title}</div>
    {course.image ? <img src={course.image} alt="course" className='max-h-80 w-11/12  object-cover rounded-xl ml-2 my-3'/> : null}
    <div className='ml-2'> <strong>Description: </strong><br />{course.description}</div>
    </>
  )
}
