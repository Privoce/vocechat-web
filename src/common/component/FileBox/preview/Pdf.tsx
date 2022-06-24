import styled from "styled-components";
import { FC } from "react";

const Styled = styled.div`
  padding: 8px;
  /* height: 218px; */
  overflow: hidden;
  embed {
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  url: string;
}

const Pdf: FC<Props> = ({ url }) => {
  // const [content, setContent] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);
  // const [numPages, setNumPages] = useState(null);
  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };
  return (
    <Styled>
      <embed src={url} type="application/pdf" />
      {/* <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document> */}
    </Styled>
  );
};

export default Pdf;
