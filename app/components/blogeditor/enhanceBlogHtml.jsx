import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

/**
 * Custom rehype plugin to add language label + copy button
 */
function addLanguageLabels() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "code" &&
        node.properties &&
        Array.isArray(node.properties.className)
      ) {
        const className = node.properties.className.find((c) =>
          c.startsWith("language-")
        );

        if (className && parent.tagName === "pre") {
          const lang = className.replace("language-", "");

          // Wrap <pre> with a div for label + copy
          const wrapper = {
            type: "element",
            tagName: "div",
            properties: { className: ["code-wrapper"] },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["code-header"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["code-language"] },
                    children: [{ type: "text", value: lang }],
                  },
                  {
                    type: "element",
                    tagName: "button",
                    properties: {
                      className: ["copy-button"],
                      onclick: "copyCode(this)",
                      type: "button",
                    },
                    children: [{ type: "text", value: "Copy" }],
                  },
                ],
              },
              parent.children[index], // original <pre>
            ],
          };

          // Replace <pre> with wrapper
          parent.children[index] = wrapper;
        }
      }
    });
  };
}

export async function enhanceBlogHtml(html) {
  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeHighlight)
    .use(addLanguageLabels)
    .use(rehypeStringify)
    .process(html);

  return String(file);
}
