import { ELEMENT_HR } from "@udecode/plate";
// import { jsx } from "@udecode/plate-test-utils";
import { createList, getNodesWithRandomId } from "./utils";

const align = (
  <>
    <hh1 align="right">Alignment</hh1>
    <hp align="right">This block text is aligned to the right.</hp>
    <hh2 align="center">Center</hh2>
    <hp align="justify">This block text is justified.</hp>
  </>
);

const indent = (
  <>
    <hh1>Changing block indentation</hh1>
    <hp indent={1}>
      Use the toolbar buttons to control the indentation of specific blocks. You
      can use these tools to highlight an important piece of information,
      communicate a hierarchy or just give your content some room.
    </hp>
    <hp indent={2}>
      For instance, this paragraph looks like it belongs to the previous one.
    </hp>
  </>
);

const horizontalRule = (
  <>
    <hp>This is a paragraph.</hp>
    <element type={ELEMENT_HR}>
      <htext />
    </element>
    <hp>And this is another paragraph.</hp>
    <element type={ELEMENT_HR}>
      <htext />
    </element>
    <hp>But between those paragraphs are horizontal rules.</hp>
  </>
);

const mediaEmbed = (
  <>
    <hh2>🎥 Media Embed</hh2>
    <hp>
      In addition to simple image nodes, you can actually create complex
      embedded nodes. For example, this one contains an input element that lets
      you change the video being rendered!
    </hp>
    <hmediaembed url="https://player.vimeo.com/video/26689853">
      <htext />
    </hmediaembed>
    <hp>
      Try it out! This editor is built to handle Vimeo embeds, but you could
      handle any type.
    </hp>
  </>
);

const image = (
  <>
    <hh2>📷 Image</hh2>
    <hp>
      In addition to nodes that contain editable text, you can also create other
      types of nodes, like images or videos.
    </hp>
    <himg url="https://source.unsplash.com/kFrdX5IeQzI" width="75%">
      <htext />
    </himg>
    <hp>
      This example shows images in action. It features two ways to add images.
      You can either add an image via the toolbar icon above, or if you want in
      on a little secret, copy an image URL to your keyboard and paste it
      anywhere in the editor! Additionally, you can customize the toolbar button
      to load an url asynchronously, for example showing a file picker and
      uploading a file to Amazon S3. You can also add a caption and resize the
      image.
    </hp>
  </>
);

const link = (
  <>
    <hh2>🔗 Link</hh2>
    <hp>
      In addition to block nodes, you can create inline nodes, like{" "}
      <ha url="https://en.wikipedia.org/wiki/Hypertext">hyperlinks</ha>!
    </hp>
    <hp>
      This example shows hyperlinks in action. It features two ways to add
      links. You can either add a link via the toolbar icon above, or if you
      want in on a little secret, copy a URL to your keyboard and paste it while
      a range of text is selected.
    </hp>
  </>
);

const autoformat = (
  <>
    <hh1>🏃‍♀️ Autoformat</hh1>
    <hp>
      The editor gives you full control over the logic you can add. For example,
      it's fairly common to want to add markdown-like shortcuts to editors.
    </hp>
    <hp>While typing, try these (mark rules):</hp>
    <hul>
      <hli>
        <hlic>
          Type <htext code>**</htext> or <htext code>__</htext> on either side
          of your text to add **bold* mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>*</htext> or <htext code>_</htext> on either side of
          your text to add *italic mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>`</htext> on either side of your text to add `inline
          code mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>~~</htext> on either side of your text to add
          ~~strikethrough~ mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Note that nothing happens when there is a character before, try
          on:*bold
        </hlic>
      </hli>
      <hli>
        <hlic>
          We even support smart quotes, try typing{" "}
          <htext code>"hello" 'world'</htext>.
        </hlic>
      </hli>
    </hul>
    <hp>
      At the beginning of any new block or existing block, try these (block
      rules):
    </hp>
    <hul>
      <hli>
        <hlic>
          Type <htext code>*</htext>, <htext code>-</htext> or{" "}
          <htext code>+</htext> followed by <htext code>space</htext> to create
          a bulleted list.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>1.</htext> or <htext code>1)</htext> followed by{" "}
          <htext code>space</htext> to create a numbered list.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>&gt;</htext> followed by <htext code>space</htext> to
          create a block quote.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>```</htext> to create a code block.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>---</htext> to create a horizontal rule.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>#</htext> followed by <htext code>space</htext> to
          create an H1 heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>##</htext> followed by <htext code>space</htext> to
          create an H2 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>###</htext> followed by <htext code>space</htext> to
          create an H3 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>####</htext> followed by <htext code>space</htext> to
          create an H4 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>#####</htext> followed by <htext code>space</htext>{" "}
          to create an H5 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>######</htext> followed by <htext code>space</htext>{" "}
          to create an H6 sub-heading.
        </hlic>
      </hli>
    </hul>
  </>
);

const pasteHtml = (
  <>
    <hh1>🍪 Deserialize HTML</hh1>
    <hp>
      By default, pasting content into a Slate editor will use the clipboard's{" "}
      <htext code>'text/plain'</htext> data. That's okay for some use cases, but
      sometimes you want users to be able to paste in content and have it
      maintain its formatting. To do this, your editor needs to handle{" "}
      <htext code>'text/html'</htext> data.
    </hp>
    <hp>This is an example of doing exactly that!</hp>
    <hp>
      Try it out for yourself! Copy and paste some rendered HTML rich text
      content (not the source code) from another site into this editor and it's
      formatting should be preserved.
    </hp>
  </>
);

const pasteMd = (
  <>
    <hh1>🍩 Deserialize Markdown</hh1>
    <hp>
      By default, pasting content into a Slate editor will use the clipboard's{" "}
      <htext code>'text/plain'</htext> data. That's okay for some use cases, but
      sometimes you want users to be able to paste in content and have it
      maintain its formatting. To do this, your editor needs to handle{" "}
      <htext code>'text/html'</htext> data.
    </hp>
    <hp>This is an example of doing exactly that!</hp>
    <hp>
      Try it out for yourself! Copy and paste Markdown content from{" "}
      <ha url="https://markdown-it.github.io/">
        https://markdown-it.github.io/
      </ha>
    </hp>
  </>
);

const basicMarks = [
  <hp key="d">
    The basic marks consist of text formatting such as bold, italic, underline,
    strikethrough, subscript, superscript, and code.
  </hp>,
];
const basicElements = [
  <hblockquote key="3">Blockquote</hblockquote>,
  <hcodeblock key="4" lang="javascript">
    <hcodeline>const a = 'Hello';</hcodeline>
    <hcodeline>const b = 'World';</hcodeline>
  </hcodeblock>,
];

const playground = [...basicMarks, ...basicElements];

export const VALUES = {
  playground,
};
