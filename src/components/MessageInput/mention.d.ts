export type MentionElement = {
  type: "mention";
  character: string;
  children: {
    text: string;
  }[];
};
