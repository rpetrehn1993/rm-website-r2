'use client';

import { useState } from 'react';

export default function TestFigma() {
  const [fileKey, setFileKey] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testFigmaConnection = async () => {
    if (!fileKey) {
      alert('Please enter a Figma file key');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/figma?fileKey=${fileKey}&action=file`);
      const data = await response.json();
      
      if (data.error) {
        setResult({ error: data.error });
      } else {
        // Also get design tokens
        const tokensResponse = await fetch(`/api/figma?fileKey=${fileKey}&action=tokens`);
        const tokensData = await tokensResponse.json();
        
        setResult({ 
          file: data.file, 
          tokens: tokensData.tokens || tokensData.error 
        });
      }
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Figma Integration Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Connection</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Figma File Key
              </label>
              <input
                type="text"
                value={fileKey}
                onChange={(e) => setFileKey(e.target.value)}
                placeholder="Enter your Figma file key (from the URL)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={testFigmaConnection}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            {result.error ? (
              <div className="text-red-600">
                <p className="font-medium">Error:</p>
                <p>{result.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">File Name:</h3>
                  <p className="text-gray-600">{result.file.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Design Tokens:</h3>
                  <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-96">
                    {JSON.stringify(result.tokens, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">How to get your Figma File Key:</h3>
          <ol className="text-blue-800 text-sm space-y-1">
            <li>1. Open your Figma file</li>
            <li>2. Copy the URL from your browser</li>
            <li>3. The file key is the part after `/file/` and before the next `/`</li>
            <li>4. Example: `https://figma.com/file/abc123def456/My-Design` → key is `abc123def456`</li>
          </ol>
        </div>

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">✅ Fixed Issues:</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Moved Figma API calls to server-side API route</li>
            <li>• Client-side page now uses fetch to call the API</li>
            <li>• No more Node.js module conflicts in browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
}