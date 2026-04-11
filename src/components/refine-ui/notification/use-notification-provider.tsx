import type { NotificationProvider } from "@refinedev/core";
import { toast } from "sonner";
import { UndoableNotification } from "@/components/refine-ui/notification/undoable-notification";

export function useNotificationProvider(): NotificationProvider {
  return {
    close: (id) => {
      toast.dismiss(id);
    },
    open: ({ key, type, message, description, undoableTimeout, cancelMutation }) => {
      switch (type) {
        case "success":
          toast.success(message, {
            description,
            id: key,
            richColors: true,
          });
          return;

        case "error":
          toast.error(message, {
            description,
            id: key,
            richColors: true,
          });
          return;

        case "progress": {
          const toastId = key || Date.now();

          toast(
            () => (
              <UndoableNotification
                message={message}
                description={description}
                undoableTimeout={undoableTimeout}
                cancelMutation={cancelMutation}
                onClose={() => toast.dismiss(toastId)}
              />
            ),
            {
              duration: (undoableTimeout || 5) * 1000,
              id: toastId,
              unstyled: true,
            },
          );
          return;
        }

        default:
          return;
      }
    },
  };
}
