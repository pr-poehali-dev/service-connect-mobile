import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsPanel = ({ open, onOpenChange }: NotificationsPanelProps) => {
  const notifications = [
    {
      id: 1,
      type: 'progress',
      title: 'Замена масла завершена на 65%',
      message: 'Механик Иван Петров работает над вашим автомобилем',
      time: '5 минут назад',
      icon: 'Wrench',
      color: 'text-primary',
      read: false
    },
    {
      id: 2,
      type: 'ready',
      title: 'Ваш автомобиль готов!',
      message: 'Toyota Camry готова к выдаче. Время работы: 1 час 20 минут',
      time: '2 часа назад',
      icon: 'CheckCircle',
      color: 'text-green-500',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Напоминание о записи',
      message: 'Завтра в 14:00 у вас запись на диагностику',
      time: '1 день назад',
      icon: 'Clock',
      color: 'text-accent',
      read: true
    },
    {
      id: 4,
      type: 'started',
      title: 'Работа начата',
      message: 'Механик приступил к диагностике двигателя',
      time: '2 дня назад',
      icon: 'Play',
      color: 'text-secondary',
      read: true
    },
    {
      id: 5,
      type: 'payment',
      title: 'Оплата получена',
      message: 'Оплата за замену колодок подтверждена - 4500 ₽',
      time: '3 дня назад',
      icon: 'CreditCard',
      color: 'text-green-500',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            Уведомления
            {unreadCount > 0 && (
              <Badge className="gradient-purple text-white border-0">
                {unreadCount}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Check" size={16} />
              Отметить все
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Settings" size={16} />
              Настроить
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)] pr-4">
            <div className="space-y-3">
              {notifications.map((notification, idx) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer animate-fade-in ${
                    notification.read 
                      ? 'border-border/50 bg-muted/20' 
                      : 'border-primary/30 bg-primary/5'
                  }`}
                  style={{animationDelay: `${idx * 50}ms`}}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      notification.read ? 'bg-muted' : 'gradient-purple'
                    }`}>
                      <Icon 
                        name={notification.icon as any} 
                        size={20} 
                        className={notification.read ? 'text-muted-foreground' : 'text-white'}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm leading-tight">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
