import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const FeedbackForm = ({ row, onClose }) => {
    const [feedback, setFeedback] = useState({
        user_name: '',
        audio_path: row.audio_path || '',
        column_name: '',
        feedback_text: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', feedback);
        // TODO: Connect with backend
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-n-8 rounded-2xl w-full max-w-lg mx-4 relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-n-6">
                    <h3 className="text-lg font-medium text-color-2">Add Feedback</h3>
                    <button 
                        onClick={onClose}
                        className="text-n-3 hover:text-color-2 transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm text-n-2 mb-2">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-n-6 border border-n-6 rounded-lg px-4 py-2.5 text-n-1 
                                     focus:outline-none focus:border-color-3 transition-colors"
                            value={feedback.user_name}
                            onChange={e => setFeedback(prev => ({
                                ...prev,
                                user_name: e.target.value
                            }))}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-n-2 mb-2">Audio Path</label>
                        <input
                            type="text"
                            readOnly
                            className="w-full bg-n-7 border border-n-6 rounded-lg px-4 py-2.5 text-n-3"
                            value={feedback.audio_path}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-n-2 mb-2">Column</label>
                        <select
                            required
                            className="w-full bg-n-6 border border-n-6 rounded-lg px-4 py-2.5 text-n-1
                                     focus:outline-none focus:border-color-3 transition-colors"
                            value={feedback.column_name}
                            onChange={e => setFeedback(prev => ({
                                ...prev,
                                column_name: e.target.value
                            }))}
                        >
                            <option value="">Select column</option>
                            {Object.keys(row).map(col => (
                                <option key={col} value={col}>{col}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-n-2 mb-2">Feedback</label>
                        <textarea
                            required
                            className="w-full bg-n-6 border border-n-6 rounded-lg px-4 py-2.5 text-n-1 
                                     focus:outline-none focus:border-color-3 transition-colors"
                            rows="4"
                            value={feedback.feedback_text}
                            onChange={e => setFeedback(prev => ({
                                ...prev,
                                feedback_text: e.target.value
                            }))}
                            placeholder="Enter your feedback here..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-n-6 text-n-2 
                                     hover:text-color-2 hover:border-color-2 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 rounded-lg bg-color-3 text-white 
                                     hover:bg-color-2 transition-colors"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;