import React from "react";
import { designIdeas } from "../data/designIdeas";

function DesignIdeas() {
  return (
    <div className="design-ideas">
      <ul>
        {designIdeas.map((idea) => (
          <li key={idea.title} className="design-item">
            <p className="label">{idea.title}</p>
            <p className="small-text">{idea.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DesignIdeas;


