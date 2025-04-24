import React, { useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { Star } from 'lucide-react';


function ReviewForm (){
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && rating > 0) {
      onSubmit({ text, rating });
    }
  };

  return (
    <div className='w-full h-screen mt-20 flex items-center justify-center bg-red-400'>
    <form onSubmit={handleSubmit} className=" w-1/3 h-auto p-4 bg-white border-1 rounded-xl">
      <div className="space-y-2">
        <div className='flex justify-between'>
        <label htmlFor="rating" className="block text-lg font-medium text-gray-700">
          Rating
        </label>
        {/* <RxCrossCircled className='size-6 cursor-pointer'/> */}
        </div>
       
        {/* <StarRating rating={rating} setRating={setRating} /> */}
        <div className='flex'>
        {[...Array(5)].map((_,indx)=>(
            <Star className={`${indx<rating? 'fill-yellow-400 text-yellow-400': 'text-gray-300'}`} onClick={()=>{setRating(indx+1); console.log(indx)}}/>
            ))}
        </div>
        {rating === 0 && (
          <p className="text-xs text-red-500 mt-1">Please select a rating</p>
        )}
      </div>

      <div className="mt-2 mb-2">
        <label htmlFor="review" className="block text-sm font-medium text-gray-700">
          Your Review
        </label>
        <textarea
          id="review"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-all duration-200"
          required
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
        //   onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                    border-gray-300 rounded-md shadow-sm hover:bg-gray-50 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!text.trim() || rating === 0}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                    rounded-md shadow-sm hover:bg-blue-700 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    disabled:bg-blue-300 disabled:cursor-not-allowed
                    transition-all duration-200"
        >
          Post Review
        </button>
      </div>
    </form>
    </div>
   
  );
};

export default ReviewForm;
