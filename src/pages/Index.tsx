import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import BookingModal from '@/components/BookingModal';
import NotificationsPanel from '@/components/NotificationsPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const activeOrders = [
    {
      id: 1,
      service: 'Замена масла',
      car: 'Toyota Camry',
      status: 'В работе',
      progress: 65,
      time: 'Осталось ~45 мин',
      mechanic: 'Иван Петров'
    },
    {
      id: 2,
      service: 'Диагностика двигателя',
      car: 'BMW X5',
      status: 'Ожидание',
      progress: 20,
      time: 'Ожидание очереди',
      mechanic: 'Сергей Волков'
    }
  ];

  const services = [
    { name: 'Замена масла', icon: 'Droplet', price: 'от 2500 ₽', time: '1 час' },
    { name: 'Диагностика', icon: 'Search', price: 'от 1500 ₽', time: '30 мин' },
    { name: 'Шиномонтаж', icon: 'CircleDot', price: 'от 2000 ₽', time: '45 мин' },
    { name: 'Развал-схождение', icon: 'Gauge', price: 'от 3000 ₽', time: '1.5 часа' },
    { name: 'ТО', icon: 'Wrench', price: 'от 5000 ₽', time: '2 часа' },
    { name: 'Ремонт ходовой', icon: 'Settings', price: 'от 8000 ₽', time: '3 часа' }
  ];

  const history = [
    { date: '15 янв 2026', service: 'Замена колодок', price: '4500 ₽', status: 'Выполнено' },
    { date: '28 дек 2025', service: 'Замена масла', price: '2800 ₽', status: 'Выполнено' },
    { date: '10 ноя 2025', service: 'Диагностика', price: '1500 ₽', status: 'Выполнено' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-purple animate-gradient p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">ServiceConnect</h1>
            <p className="text-white/80 text-sm">Добро пожаловать!</p>
          </div>
          <button 
            className="glass-effect p-3 rounded-2xl relative"
            onClick={() => setNotificationsOpen(true)}
          >
            <Icon name="Bell" size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs font-bold flex items-center justify-center text-white animate-scale-in">
              2
            </span>
          </button>
        </div>

        <Card className="glass-effect border-white/20 p-4 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon name="Car" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white/70 text-xs">Ваш автомобиль</p>
              <p className="text-white font-semibold">Toyota Camry V70</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-white/10 rounded-xl p-2 text-center">
              <p className="text-white text-lg font-bold">12</p>
              <p className="text-white/60 text-xs">Визитов</p>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-2 text-center">
              <p className="text-white text-lg font-bold">45К</p>
              <p className="text-white/60 text-xs">км пробег</p>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-2 text-center">
              <p className="text-white text-lg font-bold">3</p>
              <p className="text-white/60 text-xs">Активных</p>
            </div>
          </div>
        </Card>
      </div>

      {activeTab === 'home' && (
        <div className="px-4 pt-6 space-y-6 animate-slide-up">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Активные заказы</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                Все
              </Button>
            </div>

            <div className="space-y-3">
              {activeOrders.map((order, idx) => (
                <Card key={order.id} className="p-4 border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] animate-scale-in" style={{animationDelay: `${idx * 100}ms`}}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{order.service}</h3>
                        <Badge className="gradient-purple text-white border-0">
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.car}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-semibold">{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>{order.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="User" size={14} />
                        <span>{order.mechanic}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Наши услуги</h2>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, idx) => (
                <Card 
                  key={idx} 
                  className="p-4 hover:scale-105 transition-transform cursor-pointer animate-scale-in" 
                  style={{animationDelay: `${idx * 50}ms`}}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="w-12 h-12 gradient-purple rounded-2xl flex items-center justify-center mb-3">
                    <Icon name={service.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{service.name}</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-primary font-semibold">{service.price}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {service.time}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="px-4 pt-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Все заказы</h2>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <Card key={order.id} className="p-4 border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{order.service}</h3>
                  <Badge className="gradient-purple text-white border-0">{order.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{order.car}</p>
                <Progress value={order.progress} className="h-2" />
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="px-4 pt-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Каталог услуг</h2>
          <div className="space-y-3">
            {services.map((service, idx) => (
              <Card key={idx} className="p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 gradient-purple rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon name={service.icon as any} size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{service.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="text-primary font-semibold">{service.price}</span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {service.time}
                    </span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="gradient-purple"
                  onClick={() => handleServiceClick(service)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="px-4 pt-6 animate-fade-in">
          <Card className="p-6 mb-6 text-center">
            <div className="w-20 h-20 gradient-purple rounded-full mx-auto mb-4 flex items-center justify-center">
              <Icon name="User" size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">Александр Иванов</h2>
            <p className="text-sm text-muted-foreground mb-4">+7 (999) 123-45-67</p>
            <Button className="gradient-purple w-full">
              Редактировать профиль
            </Button>
          </Card>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">История обслуживания</h3>
            {history.map((item, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{item.service}</h4>
                  <Badge variant="outline" className="text-green-500 border-green-500">{item.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.date}</span>
                  <span className="font-semibold text-foreground">{item.price}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs font-medium">Главная</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'orders' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="ClipboardList" size={24} />
            <span className="text-xs font-medium">Заказы</span>
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'services' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="Grid3x3" size={24} />
            <span className="text-xs font-medium">Услуги</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs font-medium">Профиль</span>
          </button>
        </div>
      </nav>

      <BookingModal 
        open={bookingModalOpen} 
        onOpenChange={setBookingModalOpen}
        selectedService={selectedService}
      />

      <NotificationsPanel 
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
      />
    </div>
  );
};

export default Index;