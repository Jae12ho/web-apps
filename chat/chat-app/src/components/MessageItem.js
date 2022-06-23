import React from 'react'

function MessageItem({ message }) {
  const { nickname, content, time } = message;

  return (
    <div className="flex-col m-2">
        {nickname && <div className="text-gray-500 font-bold text-sm">{nickname} </div>}
            <div className="flex items-end">
            <div className="m-1 p-1 pl-3 pr-3 bg-blue-500 text-white rounded-lg">{content}</div>
            <div className="text-xs text-gray-500">{time}</div>
        </div>
    </div>
  )
}

export default React.memo(MessageItem)