import React from "react";

const PageContentWrapper = ({ children, "data-testid": dataTestId }) => (
  <div className="py-12" data-testid={dataTestId}>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 bg-white border-b border-gray-200">{children}</div>
      </div>
    </div>
  </div>
);

export default PageContentWrapper;
