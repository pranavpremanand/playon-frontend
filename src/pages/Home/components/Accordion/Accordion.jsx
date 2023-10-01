import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "./Accordion.scss"

export const Accordion = ({ content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-box">
      <div
        className="question"
        aria-controls="accordion-description"
        aria-expanded={open}
        onClick={() => setOpen(!open)} 
      >
        <span>{content}</span>
        {open ? (
          <AiFillCaretUp className="icon"/>
        ) : (
          <AiFillCaretDown className="icon"/>
        )}
      </div>
      <Collapse in={open}>
        <div id="accordion-description">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </div>
  );
};
