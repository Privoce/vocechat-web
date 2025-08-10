import { FC } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
export interface PreviewImageData {
  originUrl: string;
  thumbnail?: string;
  downloadLink?: string;
  name?: string;
  type?: string;
}

interface Props {
  download?: boolean;
  data?: PreviewImageData;
  closeModal: () => void;
}

const ImagePreviewModal: FC<Props> = ({ download = true, data, closeModal }) => {
  if (!data) return null;
  const { originUrl, downloadLink, name, type } = data;
  return (
    <Lightbox
      open
      close={closeModal}
      styles={{
        navigationNext: {
          display: "none",
        },
        navigationPrev: {
          display: "none",
        },
      }}
      slides={[
        {
          src: originUrl,
          alt: name,
          title: name,
          description: name,
          download: downloadLink || originUrl,
        },
      ]}
      plugins={download ? [Captions, Fullscreen, Zoom, Download] : [Captions, Fullscreen, Zoom]}
      captions={{ descriptionTextAlign: "center" }}
    />
  );
};

export default ImagePreviewModal;
