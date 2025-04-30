import React, { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";

function ReviewForm({ isOpen, onClose, onSubmit }) {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const modalRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && rating > 0) {
            onSubmit({ text, rating });
            setText("");
            setRating(0);
            onClose(); // close after submit
        }
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    
    console.log("Inside the review form")

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <form
                ref={modalRef}
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg space-y-4 relative"
            >
                <div>
                    <label className="block text-lg font-medium text-gray-700">
                        Rating
                    </label>
                    <div className="flex mt-1">
                        {[...Array(5)].map((_, indx) => (
                            <Star
                                key={indx}
                                onClick={() => setRating(indx + 1)}
                                className={`cursor-pointer ${
                                    indx < rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                    {rating === 0 && (
                        <p className="text-xs text-red-500 mt-1">
                            Please select a rating
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Your Review
                    </label>
                    <textarea
                        rows="4"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim() || rating === 0}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        Post Review
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReviewForm;
