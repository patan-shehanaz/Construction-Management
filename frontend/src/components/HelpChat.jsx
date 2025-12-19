import React, { useState } from "react";
import { faqItems } from "../data/faqData";

/**
 * Simple rule-based "chat" component.
 * - We do NOT use AI here.
 * - It just searches known FAQ questions for a match.
 */
function HelpChat() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = (event) => {
    event.preventDefault();
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      setAnswer("Please type a question or use one of the examples below.");
      return;
    }

    // Very simple matching: check if the query includes a keyword
    const match = faqItems.find((item) =>
      item.question.toLowerCase().includes(trimmed)
    );

    if (match) {
      setAnswer(match.answer);
    } else {
      setAnswer(
        "I don't have a saved answer for that yet. Try asking about 'accuracy', 'rooms', or 'residential vs commercial'."
      );
    }
  };

  return (
    <div className="help-chat">
      <form onSubmit={handleAsk} className="help-form">
        <input
          type="text"
          placeholder="Ask a question (e.g., accuracy, rooms, types)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>
      {answer && <p className="help-answer">{answer}</p>}

      <div className="help-suggestions">
        <p className="label">Example questions:</p>
        <ul>
          {faqItems.map((item) => (
            <li key={item.question}>{item.question}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HelpChat;


