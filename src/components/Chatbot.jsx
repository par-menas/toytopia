import React, { useState, useEffect, useRef } from "react";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! Welcome to ToyTopia. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const faqResponses = [
    {
      question: "what products do you have",
      answer:
        "We have three categories of products: Kid's Toys, Board Games, and Gaming Consoles. Would you like a list from any category?",
    },
    {
      question: "list me the products that you have in store",
      answer:
        "Our categories include:\n- Kid's Toys\n- Board Games\n- Gaming Consoles\nWould you like a list from one of these categories?",
    },
    {
      question: "Give me a list of the kid's toys",
      answer:
        "Here are some Kid's Toys:\n- Teddy Bear\n- Toy Car\n- Barbie Doll\n- Action Figure\n- Puzzle Set",
    },
    {
      question: "Give me a list of the board games",
      answer:
        "Here are some Board Games:\n- Monopoly\n- Scrabble\n- Chess Set\n- Ludo\n- Snakes and Ladders",
    },
    {
      question: "Give me a list of the gaming consoles",
      answer:
        "Here are some Gaming Consoles:\n- PlayStation 5\n- Xbox Series X\n- Nintendo Switch",
    },
    {
      question: "how do i make a payment",
      answer:
        "To make a payment, just click 'Purchase Item' on the product, and you’ll be redirected to our checkout page.",
    },
    {
      question: "how can i upload a product",
      answer:
        "Click on 'Upload' in the navigation bar. Fill in the form with your product details and submit.",
    },
    {
      question: "do i need an account to purchase",
      answer: "Yes, please sign in or sign up to purchase an item.",
    },
    {
      question: "how do i sign up",
      answer: "Click on 'Sign Up' in the navbar and fill out the registration form.",
    },
    {
      question: "how do i sign in",
      answer: "Click on 'Sign In' and enter your credentials to log in.",
    },
    {
      question: "how do i search for products",
      answer:
        "Use the search bar at the top of the products page to find items by name or category.",
    },
    {
      question: "where can i find board games",
      answer: "Click on Products > Board Games in the navbar, or scroll down on the products page.",
    },
    {
      question: "can i buy multiple items",
      answer: "Currently, you can purchase one item at a time. Bulk purchases are coming soon!",
    },
    {
      question: "can i contact support",
      answer: "Visit our links to our social media platforms to get to know more on our store!",
    },
    {
      question: "thank you",
      answer: "You're welcome! Come back any time. Welcome again, to where the fun begins!",
    },
  ];

  const getBotResponse = (userInput) => {
    const cleanedInput = userInput.toLowerCase().trim();
    const match = faqResponses.find(({ question }) =>
      cleanedInput.includes(question)
    );

    return (
      match?.answer ||
      "I'm not sure I understand that. You can ask me about products, sign up, or payments."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botResponse = getBotResponse(input);

    setMessages((prev) => [...prev, userMsg, { from: "bot", text: botResponse }]);
    setInput("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div className="chat-widget">
          <div className="chat-header">
            💬 ToyTopia Chatbot
            <button className="chat-close-btn" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>{msg.text}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <button className="chat-fab" onClick={toggleChat}>💬</button>
      )}
    </>
  );
};

export default Chatbot;
