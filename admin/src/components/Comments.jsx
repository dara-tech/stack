import React, { useEffect } from "react";
import useCommentStore from "../store/commentStore";
import useStore from "../store";
import { Modal, Loader, ScrollArea, Text, Button } from "@mantine/core";
import { useComments, useDeleteComment } from "../hooks/post-hook";
import NoProfile from "../assets/profile.png";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = () => {
  const { openComment, commentId, setOpen } = useCommentStore();
  const { user } = useStore();
  const { t } = useTranslation();

  const { data, mutate, isLoading, isError, error } = useComments();
  const useDelete = useDeleteComment(user?.token);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    useDelete.mutate(
      { id, postId: commentId },
      {
        onSuccess: () => {
          toast.success(t("Comment deleted successfully"));
          mutate(commentId); // Refetch comments after deletion
        },
        onError: () => {
          toast.error(t("Error deleting comment"));
        },
      }
    );
  };

  useEffect(() => {
    if (commentId) {
      mutate(commentId);
    }
  }, [commentId]);

  return (
    <>
      <Modal
        size="lg"
        opened={openComment}
        onClose={handleClose}
        title={`${t("Comments")} (${data?.data?.length || 0})`}
        centered
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <div className="w-full h-full pb-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader size="lg" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Text color="red">{t("Error loading comments")}</Text>
              <Button onClick={() => mutate(commentId)}>{t("Retry")}</Button>
            </div>
          ) : (
            <ScrollArea style={{ height: '400px' }}>
              <div className="w-full h-full flex flex-col gap-6 px-2">
                {data?.data?.map(({ _id, user: commentUser, desc, createdAt }) => (
                  <div key={_id} className="w-full flex gap-4">
                    <img
                      src={commentUser?.image || NoProfile}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="w-full">
                      <div className="w-full flex justify-between">
                        <div className="w-full flex items-center gap-2">
                          <p className="text-slate-600 dark:text-gray-400 font-medium">
                            {commentUser.name}
                          </p>
                          <span className="text-slate-700 dark:text-gray-500 text-xs italic">
                            {new Date(createdAt).toDateString()}
                          </span>
                        </div>

                        {user && (
                          <span
                            className="text-sm text-red-600 cursor-pointer"
                            onClick={() => handleDelete(_id)}
                          >
                            {t("Delete")}
                          </span>
                        )}
                      </div>

                      <span className="text-sm text-gray-700 dark:text-gray-500">
                        {desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Comments;
