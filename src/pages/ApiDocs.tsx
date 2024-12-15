import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileText, Code } from 'lucide-react';

export const ApiDocs = () => {
  const exampleCode = `
// Store data
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    data: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  })
});

// Retrieve data
fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': 'your-api-key'
  }
});
`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <FileText className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Authentication</h2>
            <p className="text-gray-600 mb-4">
              All API requests must include your API key in the X-API-Key header.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Endpoints</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Store Data</h3>
                <p className="text-gray-600 mb-2">POST /data</p>
                <p className="text-gray-600 mb-4">
                  Store your data in our secure database.
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Retrieve Data</h3>
                <p className="text-gray-600 mb-2">GET /data</p>
                <p className="text-gray-600 mb-4">
                  Retrieve all your stored data.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              <Code className="h-6 w-6 inline-block mr-2" />
              Example Usage
            </h2>
            <SyntaxHighlighter language="javascript" style={tomorrow}>
              {exampleCode}
            </SyntaxHighlighter>
          </section>
        </div>
      </div>
    </div>
  );
};