// import { useState, useEffect } from "react";
import styled from "styled-components";
// import { Document, Page } from "react-pdf";
const Styled = styled.div`
  padding: 8px;
  /* height: 218px; */
  overflow: hidden;
  embed {
    width: 100%;
    height: 100%;
  }
`;
export default function Pdf({ url = "" }) {
  // const [content, setContent] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);
  // const [numPages, setNumPages] = useState(null);
  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };
  if (!url) return null;
  return (
    <Styled>
      <embed src={url} type="application/pdf" />
      {/* <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document> */}
    </Styled>
  );
}
