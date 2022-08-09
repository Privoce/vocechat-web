import { Options } from './types';
import reducer from './reducer';

export const defaultOptions: Options = {
  triggers: [
    {
      name: 'mention',
      trigger: /(@)$/,
      decorationAttrs: { nodeName: 'span', class: 'mention-active' },
    },
    {
      name: 'hashtag',
      trigger: /(#)$/,
      decorationAttrs: { nodeName: 'span', class: 'hashtag-active' },
    },
  ],
  reducer,
};
