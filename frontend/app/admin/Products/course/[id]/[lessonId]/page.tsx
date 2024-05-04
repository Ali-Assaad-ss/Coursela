"use client";
import React, { useEffect, useState } from 'react';

import TextPage from '../text/text';
import VideoPage from '../video/videoLesson';
import ImagePage from '../image/image';
import FilePage from '../file/page';
import PdfPage from '../pdf/page';

export default function Lesson({ params }: any) {
    // Use state to store the lesson data
    const [lesson, setLesson] = useState<any>(null);

    // Fetch the lesson data
    async function fetchLesson() {
        const response = await fetch(`/api/admin/courses/lessons/${params.lessonId}`);
        const data = await response.json(); // Await the JSON data
        setLesson(data); // Update the state with the fetched data
    }

    // Call fetchLesson on component mount
    useEffect(() => {
        fetchLesson();
    }, []);

    // Determine which component to render based on the lesson type
    let lessonComponent;
    if (lesson) {
        switch (lesson.type) {
            case 'text':
                lessonComponent = <TextPage lesson={lesson} />;
                break;
            case 'image':
                lessonComponent = <ImagePage lesson={lesson} />;
                break;
            case 'video':
                lessonComponent = <VideoPage lesson={lesson} />;
                break;
            case 'file':
                lessonComponent = <FilePage lesson={lesson} />;
                break;
            case 'pdf':
                lessonComponent = <PdfPage lesson={lesson} />;
                break;
            default:
                lessonComponent = null;
                break;
        }
    }

    // Return the lesson component
    return lessonComponent;
}
