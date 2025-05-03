"use client";

import { Project } from "@/lib/contentful-types";
import { motion } from "motion/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import ProjectIngredients from "@/components/project-ingredients";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import ProjectLink from "@/components/project-link";

export default function WorkClient({ project }: { project: Project }) {
  const hasLinks = project.fields.links && project.fields.links.length > 0;

  const Bold = ({ children }: { children: React.ReactNode }) => (
    <p className="font-bold inline">{children}</p>
  );

  const Italic = ({ children }: { children: React.ReactNode }) => (
    <p className="italic inline">{children}</p>
  );

  const Underline = ({ children }: { children: React.ReactNode }) => (
    <p className="underline inline">{children}</p>
  );

  const Strikethrough = ({ children }: { children: React.ReactNode }) => (
    <p className="line-through inline">{children}</p>
  );

  const Code = ({ children }: { children: React.ReactNode }) => (
    <p className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-sm">{children}</p>
  );

  const Subscript = ({ children }: { children: React.ReactNode }) => (
    <p className="sub inline">{children}</p>
  );

  const Superscript = ({ children }: { children: React.ReactNode }) => (
    <p className="sup inline">{children}</p>
  );

  const Heading1 = ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-bold">{children}</h1>
  );

  const Heading2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold">{children}</h2>
  );

  const Heading3 = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-bold">{children}</h3>
  );

  const Heading4 = ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-md font-bold">{children}</h4>
  );

  const Heading5 = ({ children }: { children: React.ReactNode }) => (
    <h5 className="text-sm font-bold">{children}</h5>
  );

  const Heading6 = ({ children }: { children: React.ReactNode }) => (
    <h6 className="text-xs font-bold">{children}</h6>
  );

  const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-base inline">{children}</p>
  );

  const EmbeddedAsset = ({ node }: { node: any }) => (
    <Image
      src={`https:${node.data.target.fields.file.url}`}
      alt={node.data.target.fields.title}
      width={node.data.target.fields.file.details.image.width}
      height={node.data.target.fields.file.details.image.height}
    />
  );

  const Quote = ({ children }: { children: React.ReactNode }) => (
    <blockquote className="text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-sm">
      {children}
    </blockquote>
  );

  const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="list-disc list-inside">{children}</li>
  );

  const OrderedList = ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside">{children}</ol>
  );

  const UnorderedList = ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside">{children}</ul>
  );

  const Table = ({ children }: { children: React.ReactNode }) => (
    <table className="table-auto border-collapse border border-zinc-200 dark:border-zinc-800">
      {children}
    </table>
  );

  const TableRow = ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-zinc-200 dark:border-zinc-800">
      {children}
    </tr>
  );

  const TableCell = ({ children }: { children: React.ReactNode }) => (
    <td className="p-2">{children}</td>
  );

  const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
    <th className="p-2">{children}</th>
  );

  const Hyperlink = ({
    children,
    node,
  }: {
    children: React.ReactNode;
    node: any;
  }) => (
    <a
      href={node.data.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-600"
    >
      {children}
    </a>
  );

  const content = documentToReactComponents(project.fields.description, {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <Italic>{text}</Italic>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <Underline>{text}</Underline>
      ),
      [MARKS.STRIKETHROUGH]: (text: React.ReactNode) => (
        <Strikethrough>{text}</Strikethrough>
      ),
      [MARKS.CODE]: (text: React.ReactNode) => <Code>{text}</Code>,
      [MARKS.SUBSCRIPT]: (text: React.ReactNode) => (
        <Subscript>{text}</Subscript>
      ),
      [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => (
        <Superscript>{text}</Superscript>
      ),
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <Heading1>{children}</Heading1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <Heading2>{children}</Heading2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <Heading3>{children}</Heading3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <Heading4>{children}</Heading4>
      ),
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
        <Heading5>{children}</Heading5>
      ),
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
        <Heading6>{children}</Heading6>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <Paragraph>{children}</Paragraph>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: React.ReactNode) => (
        <EmbeddedAsset node={node} />
      ),
      [BLOCKS.HR]: () => <hr />,
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <Quote>{children}</Quote>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
        <ListItem>{children}</ListItem>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <OrderedList>{children}</OrderedList>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <UnorderedList>{children}</UnorderedList>
      ),
      [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
        <Table>{children}</Table>
      ),
      [BLOCKS.TABLE_ROW]: (node: any, children: React.ReactNode) => (
        <TableRow>{children}</TableRow>
      ),
      [BLOCKS.TABLE_CELL]: (node: any, children: React.ReactNode) => (
        <TableCell>{children}</TableCell>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: React.ReactNode) => (
        <TableHeaderCell>{children}</TableHeaderCell>
      ),
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <Hyperlink node={node}>{children}</Hyperlink>
      ),
    },
    preserveWhitespace: true,
  });

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full gap-4 pb-16">
      <motion.div
        className="w-full h-3/4 max-h-110 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 p-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={`https:${project.fields.image.fields.file.url}`}
          alt={project.fields.title}
          width={1024}
          height={1024}
          quality={100}
          className="object-cover rounded-sm w-full h-full"
        />
      </motion.div>
      <ProjectIngredients project={project} />
      {content}
      <div className="flex flex-row flex-wrap gap-x-4 pt-8">
        {hasLinks &&
          project.fields.links.map((link) => (
            <ProjectLink
              url={link}
              size={16}
              textClassName="text-md"
              showFullName
            />
          ))}
      </div>
    </div>
  );
}
