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
    <div className="min-h-screen bg-gradient-to-br from-accent via-white to-accent flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full space-y-4 sm:space-y-6">
        <div className="text-center space-y-2 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary leading-tight">Ваша заявка принята!</h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">С вами свяжутся наши специалисты с телефона <a href="tel:+74951178567" className="font-semibold text-primary hover:underline whitespace-nowrap">+7 (495) 117-85-67</a></p>
        </div>

        <Card className="p-4 sm:p-8 space-y-6 sm:space-y-8">
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
                  {timeLeft === 0 ? 'Время вышло!' : 'Ожидайте...'}
                </div>
              </div>
            </div>
          </div>


        </Card>
      </div>
    </div>
  );
};

export default Index;