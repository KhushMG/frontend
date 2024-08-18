import React from 'react'

const RecCard = ({anime}) => {
  return (
    <div className="w-[20rem] max-w-[25rem] border-2 p-4 border-gray-300 rounded-md">
      <div className="flex text-left md:mt-4 w-full">
        <div className="font-semibold text-xl">{anime.Name}</div>
      </div>
      <div className="flex font-medium mt-1 w-full">
        {"Anime Rating: " + anime.Score}
      </div>
      <div className="flex mt-1 w-full">
        {"Similarity Score: " + anime.Similarity}
      </div>
    </div>
  );
}

export default RecCard;