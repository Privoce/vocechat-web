import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ChatContext } from '@/types/common';

// Base selectors - these extract raw data from the store
const selectMessageStore = (state: RootState) => state.message;
const selectChannelMessages = (state: RootState) => state.channelMessage;
const selectUserMessages = (state: RootState) => state.userMessage;

// Create a memoized selector for visible messages
// This selector will only recompute when the specific messages change, not when any message in the store changes
export const makeSelectVisibleMessages = () => {
  return createSelector(
    [
      selectMessageStore,
      (_: RootState, mids: number[]) => mids
    ],
    (messageStore, mids) => {
      // Create a stable object that only changes when the actual message content changes
      const messages: Record<number, any> = {};
      mids.forEach(mid => {
        if (messageStore[mid]) {
          messages[mid] = messageStore[mid];
        }
      });
      return messages;
    },
    {
      // Use custom equality check to prevent unnecessary recomputation
      memoizeOptions: {
        resultEqualityCheck: (a, b) => {
          // Check if the message objects are the same
          const aKeys = Object.keys(a);
          const bKeys = Object.keys(b);
          if (aKeys.length !== bKeys.length) return false;

          for (const key of aKeys) {
            if (a[key] !== b[key]) return false;
          }
          return true;
        }
      }
    }
  );
};

// Create a memoized selector for message IDs
export const makeSelectMessageIds = () => {
  return createSelector(
    [
      selectChannelMessages,
      selectUserMessages,
      (_: RootState, context: ChatContext, id: number) => ({ context, id })
    ],
    (channelMessages, userMessages, { context, id }) => {
      return context === 'dm'
        ? userMessages.byId[id] ?? []
        : channelMessages[id] ?? [];
    }
  );
};
