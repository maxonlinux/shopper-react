import Modal from "../Modal";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  IBaseProduct,
  InitialProduct,
} from "../../types/product";

interface IProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
}

function CreateArticleModal({ openState }: IProps) {
  //States
  const [isSubmitDisabled, setIsSibmitDisabled] = useState(true);
  const [newArticle, setNewArticle] = useState<IBaseProduct>(InitialProduct);

  // Two-way binding
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  // Hooks
  useEffect(() => {
    if (!newArticle.title || !newArticle.content || !newArticle.description) {
      setIsSibmitDisabled(true);
    } else {
      setIsSibmitDisabled(false);
    }
  }, [newArticle]);

  return (
    <Modal title="Create Article" openState={openState}>
      <form
        className="flex flex-col w-full max-w-md gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await createArticle(newArticle);
          setNewArticle(InitialArticle);
          openState[1](false);
        }}
      >
        <label>
          <div className="text-xs text-gray-600 mb-2 ml-2">Title</div>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title"
            value={newArticle.title}
            onChange={handleChange}
          />
        </label>
        <label>
          <div className="text-xs text-gray-600 mb-2 ml-2">Description</div>
          <textarea
            className="textarea w-full"
            placeholder="Description"
            name="description"
            value={newArticle.description}
            onChange={handleChange}
          />
        </label>
        <label>
          <div className="text-xs text-gray-600 mb-2 ml-2">Content</div>
          <textarea
            className="textarea w-full"
            placeholder="Text"
            name="content"
            value={newArticle.content}
            onChange={handleChange}
          />
        </label>
        <div
          className="flex gap-4
        max-sm:flex-col"
        >
          <button
            className="button-md bg-accent bg-opacity-20 text-accent w-full
            disabled:opacity-50"
            disabled={isSubmitDisabled}
          >
            Create article
            <span className="ic">east</span>
          </button>
          <button
            className="button-md bg-red-50 text-red-400"
            onClick={() => {
              openState[1](false);
            }}
          >
            Cancel
            <span className="ic">close</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateArticleModal;