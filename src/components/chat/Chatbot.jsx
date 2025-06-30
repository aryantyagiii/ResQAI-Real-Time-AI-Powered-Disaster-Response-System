import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaRobot } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

// Train the classifier with sample data
classifier.addDocument('Where is the nearest shelter?', 'shelter');
classifier.addDocument('I need medical help', 'medical');
classifier.addDocument('How do I report a disaster?', 'report');
classifier.addDocument('What should I do in case of flood?', 'flood');
classifier.addDocument('Earthquake safety tips', 'earthquake');
classifier.train();

function Chatbot({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Classify the message
    const classification = classifier.classify(message);
    let response = '';

    switch (classification) {
      case 'shelter':
        response = 'The nearest shelter can be found using the map feature. Click on the "Map" tab and look for shelter icons.';
        break;
      case 'medical':
        response = 'For medical emergencies, use the panic button or call emergency services. Medical teams will be dispatched to your location.';
        break;
      case 'report':
        response = 'To report a disaster, use the "Report Incident" feature or press the panic button. Share your location and any photos if possible.';
        break;
      case 'flood':
        response = 'In case of flood: 1) Move to higher ground 2) Avoid walking through water 3) Follow evacuation orders 4) Stay tuned to alerts';
        break;
      case 'earthquake':
        response = 'During an earthquake: 1) Drop, Cover, and Hold On 2) Stay away from windows 3) If inside, stay inside 4) If outside, move to an open area';
        break;
      default:
        response = 'I understand you need help. Please use the panic button for immediate assistance or provide more details about your situation.';
    }

    const botMessage = {
      type: 'bot',
      content: response,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, botMessage]);

    // Store the conversation in Supabase
    if (user) {
      await supabase.from('chat_messages').insert([
        {
          user_id: user.id,
          message: message,
          response: response
        }
      ]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg ${
          darkMode 
            ? 'bg-primary-600 hover:bg-primary-700' 
            : 'bg-primary-500 hover:bg-primary-600'
        } text-white`}
      >
        <FaRobot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-20 right-4 w-96 rounded-lg shadow-xl ${
          darkMode ? 'bg-neutral-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">ResQAI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs rounded-lg px-4 py-2 ${
                  msg.type === 'user'
                    ? darkMode 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-primary-500 text-white'
                    : darkMode 
                      ? 'bg-neutral-700 text-white' 
                      : 'bg-neutral-100 text-neutral-900'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-2 rounded-lg ${
                  darkMode 
                    ? 'bg-neutral-700 text-white placeholder-neutral-400' 
                    : 'bg-neutral-100 text-neutral-900 placeholder-neutral-500'
                }`}
              />
              <button
                onClick={handleSend}
                className={`p-2 rounded-lg ${
                  darkMode 
                    ? 'bg-primary-600 hover:bg-primary-700' 
                    : 'bg-primary-500 hover:bg-primary-600'
                } text-white`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;