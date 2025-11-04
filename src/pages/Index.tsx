import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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



  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((3 * 60 - timeLeft) / (3 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-white to-accent flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full space-y-4 sm:space-y-6">
        <div className="text-center space-y-2 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary leading-tight">Ваша заявка принята!</h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">С вами свяжутся наши специалисты с телефона <a href="tel:+74951178567" className="font-semibold text-primary hover:underline whitespace-nowrap">+7 (495) 117-85-67</a></p>
        </div>

        <Card className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {timeLeft === 0 ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" size={32} className="text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary">Сейчас много заявок</h2>
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                Пожалуйста, ожидайте нашего ответа или напишите нам в чат
              </p>
              <Button 
                asChild 
                size="lg" 
                className="mt-6"
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
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto">
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
                  <div className="text-xs sm:text-sm text-muted-foreground mt-2">
                    Ожидайте...
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;