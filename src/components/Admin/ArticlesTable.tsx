import { IArticle, TDeleteArticle, TEditArticle } from "../../types/article";
import ArticleRow from "./ArticleRow";

interface IProps {
  articles: IArticle[];
  callbacks: [TDeleteArticle, TEditArticle]
}

function ArticlesTable({ articles, callbacks }: IProps) {
  // Mapped articles component
  const ArticlesMap = () =>
    articles.map((article) => (
      <ArticleRow
        key={article._id}
        article={article}
        callbacks={callbacks}
      />
    ));

  return (
    <>
      <table
        className="w-full
      max-md:block"
      >
        <thead
          className="text-left
        max-md:hidden"
        >
          <tr
            className="border-b border-gray-200 text-gray-500
          [&>th]:py-4 [&>th]:px-2 [&>th]:text-xs  [&>th]:font-[500]"
          >
            <th>Created</th>
            <th>Updated</th>
            <th>Title</th>
            <th>Description</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody
          className="text-left
          md:divide-y md:divide-gray-200
          max-md:block"
        >
          <ArticlesMap />
        </tbody>
      </table>
    </>
  );
}
export default ArticlesTable;
