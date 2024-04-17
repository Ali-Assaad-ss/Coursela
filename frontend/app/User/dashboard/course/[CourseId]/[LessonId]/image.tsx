import React from 'react'

export function ImageLesson() {
    let lesson = {
        id:1,
        title:"Tutorial",
        description:"Embark on a transformative journey of self-discovery and holistic wellness with our Harmony Flow Yoga Course. This comprehensive program is designed to nourish your mind, body, and spirit through the ancient practice of yoga. Guided by experienced instructors, you'll explore a variety of yoga styles, including Vinyasa, Hatha, and Restorative, allowing you to find the perfect balance for your unique needs.",
        image:"https://img.freepik.com/free-psd/meditation-mindfulness-social-media-post_23-2148570905.jpg?t=st=1712670701~exp=1712674301~hmac=a827bce11267ac0152ec0e8b32eaa86d3ffcb9059ce679e3ab0613650dfbffcd&w=1380"
    }
  return (
    <>
    <div className='text-2xl font-bold ml-2 my-4 '>{lesson.title}</div>
    {lesson.image ? <img src={lesson.image
    } alt="lesson" className='max-h-80 w-11/12  object-cover rounded-xl ml-2 my-3'/> : null}
    <div className='ml-2'> <strong>Description: </strong><br />{lesson.description}</div>
    </>
  )
}
