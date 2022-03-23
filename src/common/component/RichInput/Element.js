const Element = ({ attributes, children, element }) => {
  console.log("element type", element);
  switch (element.type) {
    case "del":
      return <del {...attributes}>{children}</del>;
    case "italic":
      return <i {...attributes}>{children}</i>;
    case "bold":
      return <strong {...attributes}>{children}</strong>;
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
