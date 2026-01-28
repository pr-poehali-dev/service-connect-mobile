import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService?: {
    name: string;
    icon: string;
    price: string;
    time: string;
  } | null;
}

const BookingModal = ({ open, onOpenChange, selectedService }: BookingModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleBooking = () => {
    setStep(3);
    setTimeout(() => {
      onOpenChange(false);
      setStep(1);
      setSelectedTime('');
      setNotes('');
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Запись на сервис</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {selectedService && (
                <div className="p-4 rounded-2xl glass-effect border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center">
                      <Icon name={selectedService.icon as any} size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedService.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-primary font-semibold">{selectedService.price}</span>
                        <span className="text-muted-foreground">• {selectedService.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-base font-semibold mb-3 block">Выберите дату</Label>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-2xl border"
                  />
                </div>
              </div>

              <Button 
                className="w-full gradient-purple text-white"
                size="lg"
                onClick={() => setStep(2)}
                disabled={!date}
              >
                Далее
                <Icon name="ArrowRight" size={20} />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Выберите время</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>{date?.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Доступное время</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className={selectedTime === time ? 'gradient-purple' : ''}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-base font-semibold mb-3 block">
                  Комментарий (необязательно)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Опишите проблему или особые пожелания..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  <Icon name="ArrowLeft" size={20} />
                  Назад
                </Button>
                <Button 
                  className="flex-1 gradient-purple text-white"
                  size="lg"
                  onClick={handleBooking}
                  disabled={!selectedTime}
                >
                  Записаться
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="py-8 text-center animate-scale-in">
            <div className="w-20 h-20 gradient-purple rounded-full mx-auto mb-6 flex items-center justify-center">
              <Icon name="Check" size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Готово!</h3>
            <p className="text-muted-foreground mb-4">
              Ваша запись создана
            </p>
            <div className="p-4 rounded-2xl bg-muted/50 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Услуга:</span>
                <span className="font-semibold">{selectedService?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Дата:</span>
                <span className="font-semibold">
                  {date?.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Время:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
            </div>
            <Badge className="mt-4 gradient-purple text-white border-0">
              Уведомление отправлено
            </Badge>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
