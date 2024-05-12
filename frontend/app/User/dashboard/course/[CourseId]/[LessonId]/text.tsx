import { Checkbox } from "@/components/ui/checkbox";

export function TextLesson() {
  let Lesson = {
    id: 1,
    title: "Introduction",
    text: `Physical Wellness:
      One of the most well-known aspects of yoga is its ability to enhance physical health and vitality. Through a combination of asanas (poses) and pranayama (breathing techniques), yoga promotes strength, flexibility, and balance in the body. Regular practice of yoga can alleviate chronic pain, improve posture, and boost circulation, leading to a greater sense of well-being and vitality.
      
      Mental Clarity and Emotional Balance:
      In addition to its physical benefits, yoga is renowned for its profound impact on mental and emotional well-being. The practice of mindfulness cultivated in yoga encourages practitioners to be present in the moment, fostering a deep sense of inner peace and tranquility. Yoga also offers powerful tools for managing stress, anxiety, and depression, helping individuals navigate life's challenges with grace and resilience.`,
  };

  return (
    <div>
      <div className="flex justify-between items-center"><div className="text-2xl font-bold ml-2 my-4 ">{Lesson.title}</div> <div className="flex items-center gap-1"><Checkbox />Mark Complete</div> </div>

      <div className="ml-3 text-xl">{Lesson.text}</div>
    </div>
  );
}
