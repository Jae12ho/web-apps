import React, { useState, useCallback } from 'react'

const NicknameForm = ({ handleSubmitNickname }) => {
  const [nickname, setNickname] = useState("");

  const handleChangeNickname = useCallback(event => {
    setNickname(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    handleSubmitNickname(nickname);
    setNickname("");
  }, [handleSubmitNickname, nickname]);

  return (
    <form>
      <div className="flex justify-center items-center m-5">
        <input className="w-1/6 border-2 rounded-lg text-center" type="text" placeholder="닉네임을 입력하세요." maxLength={12} value={nickname} onChange={handleChangeNickname} 
        onKeyPress={event => {
          if (event.code === "Enter") {
             event.preventDefault();
             handleSubmit();
           }
         }}/>
        <button className="p-1 text-sm rounded-md" type="button" value="확인" onClick={handleSubmit}>확인</button>
      </div>
    </form>
  )
}

export default NicknameForm