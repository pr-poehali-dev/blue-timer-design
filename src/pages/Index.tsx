import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(20 * 60);
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(20 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((20 * 60 - timeLeft) / (20 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-white to-accent flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">20-минутный таймер</h1>
          <p className="text-sm text-muted-foreground">Простой и удобный таймер для концентрации</p>
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
                  {timeLeft === 0 ? 'Время вышло!' : isRunning && !isPaused ? 'Идет отсчет...' : 'Готов к запуску'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            {!isRunning || isPaused ? (
              <Button
                size="lg"
                onClick={handleStart}
                className="gap-2 flex-1 max-w-[140px]"
              >
                <Icon name="Play" size={20} />
                {isPaused ? 'Продолжить' : 'Старт'}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                onClick={handlePause}
                className="gap-2 flex-1 max-w-[140px]"
              >
                <Icon name="Pause" size={20} />
                Пауза
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="gap-2 flex-1 max-w-[140px]"
              disabled={!isRunning && timeLeft === 20 * 60}
            >
              <Icon name="RotateCcw" size={20} />
              Сброс
            </Button>
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
