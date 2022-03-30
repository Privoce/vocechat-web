import { useState } from "react";
import styled from "styled-components";
import { Document, Page } from "react-pdf";
const Styled = styled.div`
  height: 218px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export default function Pdf({ url = "" }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  if (!url) return null;
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  console.log("pdf url", url);
  return (
    <Styled>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </Styled>
  );
}
