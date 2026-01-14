import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus } from 'lucide-react';

const AddTask: React.FC = () => {
  const [priority, setPriority] = useState('High');

  return (
    <div className="bg-dark-800 p-6 rounded-2xl border border-white/5">
      <h3 className="text-lg font-semibold text-white mb-4">Add New Task</h3>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Enter task title..."
          className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
        />
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-2 block">Priority</label>
            <div className="flex bg-dark-900 rounded-xl p-1 border border-white/10">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 text-xs rounded-lg transition-all ${
                    priority === p 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-2 block">Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="dd-mm-yy"
                className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Task
        </motion.button>
      </div>
    </div>
  );
};

export default AddTask;