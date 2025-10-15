import { formatDistanceToNow } from "date-fns";
import { AlertCircle, CheckCircle, Info, AlertTriangle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    default:
      return <Info className="h-5 w-5 text-primary" />;
  }
};

export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  return (
    <div
      className={`p-4 hover:bg-secondary/50 transition-colors cursor-pointer ${
        !notification.is_read ? "bg-secondary/30" : ""
      }`}
      onClick={() => !notification.is_read && onMarkAsRead(notification.id)}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm line-clamp-1">
              {notification.title}
            </h4>
            {!notification.is_read && (
              <Circle className="h-2 w-2 fill-primary text-primary flex-shrink-0 mt-1.5" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};
