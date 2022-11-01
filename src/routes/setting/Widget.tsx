// import { useState, MouseEvent } from "react";
// import dayjs from "dayjs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Row = ({ paramKey, paramDefault, remarks }: { paramKey: string, paramDefault: string | number, remarks: string }) => {
  return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {paramKey}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {paramDefault}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {remarks}
    </td>
  </tr>;
};
export default function Widget() {
  // const disableBtn = !reachLimit;
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="text-gray-600 ">
        Extending VoceChat by embedding vocechat widget SDK!
      </div>
      <label htmlFor="code" className="text-gray-500 text-sm mt-5">
        Code Example:
      </label>
      <SyntaxHighlighter id="code" language="html" style={vscDarkPlus}>
        {`<!-- put this code snippet into your html file -->\n<script \n  data-host-id="4" \n  data-origin="${location.origin}" \n  data-close-width="52" \n  data-close-height="52" \n  data-open-width="600" \n  data-open-height="800" \n  src="${location.origin}/widget.js" \n  async \n/>`}
      </SyntaxHighlighter>
      <div className="text-gray-500 text-sm mt-5 mb-2">
        Configuration Description:
      </div>
      <div className="w-[700px] border border-solid border-gray-300">

        <table className="min-w-full border table-auto">
          <thead className="border-b bg-gray-50">
            <tr>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Configuration Key
              </th>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Default Value
              </th>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {[{
              paramKey: "host-id",
              paramDefault: 1,
              remarks: "Assign the user chatting with visitor"
            }, {
              paramKey: "origin",
              paramDefault: 'location.origin',
              remarks: "The domain (with protocol) script load from"
            }, {
              paramKey: "close-width",
              paramDefault: `52(px)`,
              remarks: "The width while widget closed"
            }, {
              paramKey: "close-height",
              paramDefault: `52(px)`,
              remarks: "The height while widget closed"
            }, {
              paramKey: "open-width",
              paramDefault: `600(px)`,
              remarks: "The width while widget opened"
            }, {
              paramKey: "open-height",
              paramDefault: `800(px)`,
              remarks: "The height while widget opened"
            }
            ].map(row => <Row key={row.paramKey} {...row} />)}
          </tbody>
          <tfoot className="border-t border-solid border-gray-200">
            <div className="text-gray-400 px-5 py-3 text-sm">
              * <code className="bg-gray-700 text-white px-1">data-</code> prefixed
            </div>
          </tfoot>
        </table>
      </div>

    </div>
  );
}
