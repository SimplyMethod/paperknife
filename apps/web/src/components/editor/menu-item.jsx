import "./MenuItem.scss";

import React from "react";
import "remixicon/fonts/remixicon.css";

function MenuItem({ icon, title, action, isActive = null }) {
  return <button
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}
    type="button"
  >
    <i className={`ri-${icon}`} />
  </button>
};

export default MenuItem;
