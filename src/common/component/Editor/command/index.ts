import { EditorState, TextSelection, Transaction, Command } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { NodeType } from 'prosemirror-model';
import schema from '../schema';

export const bold: Command = toggleMark(schema.marks.strong);
export const italic: Command = toggleMark(schema.marks.em);
