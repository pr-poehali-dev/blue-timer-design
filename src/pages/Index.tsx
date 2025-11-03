import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(20 * 60);
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
  const progress = ((20 * 60 - timeLeft) / (20 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-white to-accent flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Ваша заявка принята!</h1>
          <p className="text-sm text-muted-foreground">С вами свяжутся наши специалисты с телефона <span className="font-semibold text-primary">+7 (495) 117-85-67</span></p>
        </div>

        <Card className="p-8 space-y-8">
          <div className="relative w-64 h-64 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-accent"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                className="text-primary transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {timeLeft === 0 ? 'Время вышло!' : 'Ожидайте...'}
                </div>
              </div>
            </div>
          </div>


        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Icon name="Code" size={24} className="text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-primary mb-1">Установите на свой сайт</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Добавьте этот таймер на свой сайт одной строкой кода
              </p>
              <Link to="/install">
                <Button variant="default" className="gap-2">
                  <Icon name="Download" size={16} />
                  Получить код
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;