import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Key, Copy, Table } from "lucide-react";
import toast from "react-hot-toast";
import { apiKeysService } from "../services/apiKeys.service";
import { dataService } from "../services/data.service";
export const Dashboard = () => {
  const { user, setUser } = useAuthStore();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    fetchApiKey();
    fetchData();
  }, [apiKey]);

  const fetchApiKey = async () => {
    const response = await apiKeysService.list();

    if (response.apiKeys.length) setApiKey(response.apiKeys[0].api_key);
  };
  const fetchData = async () => {
    if (!apiKey) return;

    try {
      const response = await dataService.retrieve(apiKey);
      setData(response.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const generateApiKey = async () => {
    setIsLoading(true);
    try {
      const { apiKey: newApiKey } = await apiKeysService.generate();
      setApiKey(newApiKey);
      setUser({ ...user!, apiKey: newApiKey });
      toast.success("API key generated successfully!");
    } catch (error) {
      toast.error("Failed to generate API key");
    } finally {
      setIsLoading(false);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey || "");
    toast.success("API key copied to clipboard!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">API Key</h2>
          {!apiKey ? (
            <button
              onClick={generateApiKey}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              <Key className="h-5 w-5 mr-2" />
              {isLoading ? "Generating..." : "Generate API Key"}
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <code className="bg-gray-100 px-4 py-2 rounded-md">{apiKey}</code>
              <button
                onClick={copyApiKey}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Stored Data</h2>
          <Table className="h-6 w-6 text-gray-600" />
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No data stored yet. Use your API key to start sending data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <pre className="text-xs">
                        {JSON.stringify(item.data, null, 2)}
                      </pre>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
