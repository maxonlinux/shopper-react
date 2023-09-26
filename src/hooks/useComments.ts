import { useCallback, useState } from "react";
import { ToastStatus } from "../types/toaster";
import { useToaster } from "../components/Context/ToasterContext";
import { useUser } from "../components/Context/UserContext";
import { IBaseComment, IComment } from "../types/comment";
import { GeneralError, ResponseStatus } from "../types/general";
import api from "../axios/config";
import { useError } from "./hooks/useError";

export const useComments = () => {
  // Context
  const { addToast } = useToaster();
  const { user } = useUser();

  // States
  const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.Loading);
  const [comments, setComments] = useState<IComment[]>([]);

  // Hooks
  const { handleError } = useError();

  // Get comments
  const getComments = useCallback(async (articleId: string) => {
    try {
      setStatus(ResponseStatus.Loading);
      const response = await api.get<IComment[]>(
        "/comments/article/" + articleId
      );

      if (response.data.length === 0) {
        return setStatus(ResponseStatus.Empty);
      }

      setComments(response.data);
      setStatus(ResponseStatus.Success);
    } catch (error) {
      handleError(error as GeneralError);
    }
  }, []);

  // Leave comment
  const createComment = async (comment: IBaseComment) => {
    try {
      await api.post("/comments", comment, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
      });
      addToast("Successfully commented", ToastStatus.Success);
    } catch (error) {
      handleError(error as GeneralError);
    }
  };

  // Delete comment
  const deleteComment = async (id: string) => {
    try {
      await api.delete("/comments/" + id, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "application/json",
        },
      });
      addToast("Successfully deleted comment", ToastStatus.Success);
    } catch (error) {
      handleError(error as GeneralError);
    }
  };

  return { status, comments, getComments, deleteComment, createComment };
};
