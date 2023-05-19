import IconQuestion from "@/assets/icons/question.svg";

type Props = {
  link: string;
  text: string;
};

const HowToTip = ({ link, text }: Props) => {
  return (
    <div className="tip">
      <IconQuestion className="dark:fill-gray-300" />
      <a href={link} target="_blank" className="link" rel="noreferrer">
        {text}
      </a>
    </div>
  );
};

export default HowToTip;
