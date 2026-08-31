import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";

function QuickLink() {
  const navigate = useNavigate();
  const [pageName, setPageName] = useState("");
  const [links, setLinks] = useState([]);

  const addLink = () => {
    if (!pageName.trim()) return;
    setLinks((current) => [...current, pageName.trim()]);
    setPageName("");
  };

  return (
    <section className="quick-link-page">
      <div className="holiday-tab current-tab">
        <span>Quick Link</span>
        <button
          onClick={() => navigate("/attendance")}
          aria-label="Close Quick Link"
        >
          <FaTimes />
        </button>
      </div>
      <div className="quick-link-content">
        <h2>Quick Link</h2>
        <div className="quick-link-entry">
          <input
            value={pageName}
            onChange={(event) => setPageName(event.target.value)}
            placeholder="Page Name"
            aria-label="Page Name"
            onKeyDown={(event) => event.key === "Enter" && addLink()}
          />
          <button onClick={addLink} aria-label="Add quick link">
            <FaPlus />
          </button>
        </div>
        <table className="quick-link-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Page Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={`${link}-${index}`}>
                <td>{index + 1}</td>
                <td>{link}</td>
                <td>
                  <button
                    onClick={() =>
                      setLinks((current) =>
                        current.filter((_, linkIndex) => linkIndex !== index),
                      )
                    }
                    aria-label={`Delete ${link}`}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default QuickLink;
