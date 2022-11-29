// import { useState, MouseEvent } from "react";
// import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation("setting", { keyPrefix: "widget" });
  // const disableBtn = !reachLimit;
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="text-gray-600 ">
        {t('tip')}
      </div>
      <label htmlFor="code" className="text-gray-500 text-sm mt-5">
        {t('code')}:
      </label>
      <SyntaxHighlighter id="code" language="html" style={vscDarkPlus} className="rounded">
        {`<!-- ${t('code_comment')} -->\n<script \n  data-host-id="1" \n  data-close-width="48" \n  data-close-height="48" \n  data-open-width="380" \n  data-open-height="680" \n  src="${location.origin}/widget.js" \n  async \n/>`}
      </SyntaxHighlighter>
      <div className="text-gray-500 text-sm mt-5 mb-2">
        {t('config')}:
      </div>
      <div className="w-[700px] border border-solid border-gray-300 rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="border-b bg-gray-50">
            <tr>
              {[t('param_key'), t('default_value'), t('remark')].map(title => <th key={title} scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                {title}
              </th>)}
            </tr>
          </thead>
          <tbody>
            {[{
              paramKey: "host-id",
              paramDefault: 1,
              remarks: t("param_host")
            }, {
              paramKey: "close-width",
              paramDefault: `48(px)`,
              remarks: t("param_open_width")
            }, {
              paramKey: "close-height",
              paramDefault: `48(px)`,
              remarks: t("param_close_height")
            }, {
              paramKey: "open-width",
              paramDefault: `380(px)`,
              remarks: t("param_open_width")
            }, {
              paramKey: "open-height",
              paramDefault: `680(px)`,
              remarks: t("param_open_height")
            }
            ].map(row => <Row key={row.paramKey} {...row} />)}
          </tbody>
          <tfoot className="border-t border-solid border-gray-200" >
            <tr>
              <td colSpan={3} className="text-gray-400 px-5 py-3 text-sm">
                * All the parameters are optional, and prefixed by <i className="bg-gray-700 text-white px-1">data-</i>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  );
}
