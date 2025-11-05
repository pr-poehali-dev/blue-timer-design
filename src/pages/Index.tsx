import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(1 * 60);
  const [approvedAmount] = useState(() => {
    const amounts = [15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
    return amounts[Math.floor(Math.random() * amounts.length)];
  });
  const [displayAmount, setDisplayAmount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countingRef = useRef<NodeJS.Timeout | null>(null);

  const getStatusText = () => {
    if (timeLeft > 40) {
      return 'Проверка данных...';
    } else if (timeLeft > 20) {
      return 'Проверка ФССП...';
    } else {
      return 'Подготовка предложения...';
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      const duration = 2000;
      const steps = 60;
      const increment = approvedAmount / steps;
      let current = 0;

      countingRef.current = setInterval(() => {
        current += increment;
        if (current >= approvedAmount) {
          setDisplayAmount(approvedAmount);
          if (countingRef.current) {
            clearInterval(countingRef.current);
          }
        } else {
          setDisplayAmount(Math.floor(current));
        }
      }, duration / steps);

      return () => {
        if (countingRef.current) {
          clearInterval(countingRef.current);
        }
      };
    }
  }, [timeLeft, approvedAmount]);



  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((1 * 60 - timeLeft) / (1 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="max-w-md w-full space-y-1 sm:space-y-2">
        <div className="text-center space-y-1 px-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">Ваша заявка принята!</h1>
          {timeLeft === 0 && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex items-center justify-center gap-2 flex-wrap">
              <span>С вами свяжутся наши специалисты с телефона</span>
              <span className="inline-flex items-center gap-1">
                <Icon name="Phone" size={16} className="text-primary" />
                <a href="tel:+74951178567" className="font-semibold text-primary hover:underline whitespace-nowrap">+7 (495) 117-85-67</a>
              </span>
            </p>
          )}
        </div>

        <Card className="p-3 sm:p-5 space-y-3 sm:space-y-4 shadow-xl border-blue-100">
          {timeLeft === 0 ? (
            <div className="text-center space-y-3 py-3">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mx-auto border-4 border-primary/20 shadow-lg">
                <img 
                  src="https://cdn.poehali.dev/projects/bd96fc19-344a-4302-a6c7-ec6bdee2a03d/files/d88b7043-1be8-4cf2-b389-e74ee3fb7302.jpg" 
                  alt="Менеджер" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Елена Соколова</h2>
                <p className="text-base sm:text-lg text-muted-foreground">Ваш личный менеджер</p>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground px-4">
                Сейчас много заявок. Пожалуйста, ожидайте нашего ответа или напишите нам в чат
              </p>
              <Button 
                asChild 
                size="lg" 
                className="mt-4"
              >
                <a 
                  href="https://www.money-financei.ru/page68550277.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Icon name="MessageCircle" size={20} />
                  Написать в чат
                </a>
              </Button>
            </div>
          ) : (
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-accent"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 110}
                  strokeDashoffset={2 * Math.PI * 110 * (1 - progress / 100)}
                  className="text-primary transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-2">
                  <div className="text-5xl sm:text-6xl font-bold text-primary">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground mt-3 font-medium">
                    {getStatusText()}
                  </div>
                  <div className="flex gap-1 justify-center mt-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <div className="text-center px-4 pt-1">
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Не обновляйте страницу, ожидайте решения
          </p>
        </div>

        {timeLeft > 0 && (
          <Card className="bg-gradient-to-r from-red-500 to-red-600 border-red-600 p-4 sm:p-6 shadow-xl mt-4">
            <div className="text-center space-y-2">
              <div className="inline-block bg-yellow-400 text-red-900 px-4 py-1 rounded-full font-bold text-sm sm:text-base uppercase">
                Акция
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Займ под 0%
              </h3>
              <p className="text-white/90 text-sm sm:text-base">
                Специальное предложение для новых клиентов
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;