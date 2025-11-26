import { useState, useEffect, useRef } from 'react';
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

  const getStatusIcon = () => {
    if (timeLeft > 40) {
      return 'FileSearch';
    } else if (timeLeft > 20) {
      return 'Shield';
    } else {
      return 'FileCheck';
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
    <div className="min-h-screen h-screen relative overflow-hidden flex flex-col">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/bd96fc19-344a-4302-a6c7-ec6bdee2a03d/files/388de813-00d3-4847-a505-68035e3b14c5.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
      
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative flex-1 flex items-stretch justify-center p-2 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-xl flex flex-col justify-start py-2 sm:py-4 space-y-2 sm:space-y-6">
          
          <div className="text-center space-y-2 sm:space-y-4 px-2 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold text-gray-700">Система работает</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight animate-gradient px-2">
              {timeLeft === 0 ? 'Ваша заявка уже в работе!' : 'Ваша заявка уже обрабатывается'}
            </h1>
            
            {timeLeft === 0 && (
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed flex items-center justify-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom duration-500 px-2">
                <span className="text-center">С вами свяжутся наши специалисты</span>
                <span className="inline-flex items-center gap-1 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                  <Icon name="Phone" size={14} className="text-blue-600 sm:w-4 sm:h-4" />
                  <a href="tel:+74951178567" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base">+7 (495) 117-85-67</a>
                </span>
              </p>
            )}
          </div>

          {timeLeft > 0 && (
            <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl p-4 sm:p-6 animate-in fade-in zoom-in duration-500">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-pulse-glow flex-shrink-0">
                  <Icon name={getStatusIcon()} size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-semibold text-gray-900">{getStatusText()}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Процесс займет около минуты</div>
                </div>
              </div>
              
              <div className="relative w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden shadow-inner">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="flex gap-1.5 sm:gap-2 justify-center mt-3 sm:mt-4">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 text-amber-700">
                  <Icon name="AlertCircle" size={16} className="flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-medium">
                    Не обновляйте страницу
                  </p>
                </div>
              </div>
            </Card>
          )}

          {timeLeft === 0 && (
            <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl p-4 sm:p-8 animate-in fade-in zoom-in duration-700">
              <div className="text-center space-y-3 sm:space-y-6">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-50 animate-pulse" />
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto border-4 border-white shadow-2xl">
                    <img 
                      src="https://cdn.poehali.dev/projects/bd96fc19-344a-4302-a6c7-ec6bdee2a03d/files/16d0858b-a93a-4be0-b086-4ced599e8fc1.jpg" 
                      alt="Менеджер" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                    Онлайн
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                    Елена Соколова
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 font-medium">Ваш личный менеджер</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    Сейчас много заявок. Пожалуйста, ожидайте нашего ответа или напишите нам в чат для более быстрой связи
                  </p>
                </div>
                
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <a 
                    href="https://www.money-financei.ru/page68550277.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
                  >
                    <Icon name="MessageCircle" size={20} className="sm:w-6 sm:h-6" />
                    Написать в чат
                  </a>
                </Button>
              </div>
            </Card>
          )}

          {timeLeft > 0 && (
            <Card className="bg-gradient-to-br from-red-500 via-red-600 to-pink-600 border-0 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700 animate-gradient">
              <div className="relative p-5 sm:p-8">
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative text-center space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-400 text-red-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base uppercase shadow-lg animate-pulse">
                    <Icon name="Sparkles" size={16} className="sm:w-5 sm:h-5" />
                    Акция
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                    Займ под 0%
                  </h3>
                  <p className="text-white/95 text-base sm:text-lg font-medium">
                    Специальное предложение для новых клиентов
                  </p>
                  <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white">0%</div>
                      <div className="text-xs sm:text-sm text-white/80">Ставка</div>
                    </div>
                    <div className="w-px h-10 sm:h-12 bg-white/30" />
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white">30 дней</div>
                      <div className="text-xs sm:text-sm text-white/80">Без процентов</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;