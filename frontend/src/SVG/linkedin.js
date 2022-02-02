import React from "react";

const LinkedIn = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      width="32"
      height="32"
      viewBox="0 0 16 16"
    >
      <path d="M2.758 1C1.793 1 1 1.793 1 2.758v9.488C1 13.207 1.793 14 2.758 14h9.488c.961 0 1.754-.793 1.754-1.754V2.758C14 1.793 13.207 1 12.246 1zm0 1h9.488c.422 0 .754.332.754.758v9.488a.747.747 0 01-.754.754H2.758A.748.748 0 012 12.246V2.758C2 2.332 2.332 2 2.758 2zM4 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM3 6v6h2V6zm3 0v6h2V9.32c0-.832.078-1.578 1.078-1.578.985 0 .922.895.922 1.633V12h2V9.04C12 7.32 11.64 6 9.691 6c-.937 0-1.41.375-1.668.875H8V6z"></path>
    </svg>
  );
};

export default LinkedIn;
