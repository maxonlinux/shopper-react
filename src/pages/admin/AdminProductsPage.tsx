import { useState } from "react";

function AdminProductsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-bold text-xl px-4 mb-4">Manage articles (123)</h1>
      <button
        className="button-md bg-accent bg-opacity-20 text-accent mb-4"
        onClick={() => setShowCreateModal(true)}
      >
        <span className="ic">add</span>
        Create article
      </button>
      <div className="mx-auto w-full">
        <div className="border border-gray-200 px-4 rounded-lg">
          {/* <StateHandler status={status}>
          <StateHandler.Loading>
            <div className="text-center font-bold">Loading...</div>
          </StateHandler.Loading>
          <StateHandler.Error>
            <div className="flex flex-col items-center py-4">
              <h1 className="font-bold mb-4">
                Error in getting articles!
              </h1>
              <button
                className="button-md bg-gray-50 border border-gray-100"
                onClick={() => window.location.reload()}
              >
                <span className="ic">refresh</span>
                Reload page
              </button>
            </div>
          </StateHandler.Error>
          <StateHandler.Empty>
            <div className="flex justify-center p-4">
              <span className="font-bold">Empty...</span>
            </div>
          </StateHandler.Empty>
          <StateHandler.Success>
            <ArticlesTable
              articles={articles.items}
              callbacks={[deleteArticle, editArticle]}
            />
          </StateHandler.Success>
        </StateHandler> */}
        </div>
        {/* <Pagination
        currentPage={page}
        itemsPerPage={limit}
        totalItems={articles.total}
      /> */}
      </div>
    </div>
  );
}

export default AdminProductsPage;
