import React from "react";

export default function Message(props: any) {
  return (
    <p className={props.from? "m-2 flex bg-zinc-600 text-white rounded-3xl p-1 mr-auto":"m-2 ml-auto flex bg-blue-600 text-white rounded-3xl p-1"}>
      <p className="text-left ml-2">{props.text}</p> <p className="text-xs text-gray-200 align-bottom mx-2 mt-auto">{props.time}</p>
    </p>
  );
}
