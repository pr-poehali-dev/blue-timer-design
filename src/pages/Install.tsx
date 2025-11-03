import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Install = () => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe 
  src="${window.location.origin}" 
  width="400" 
  height="500" 
  frameborder="0"
  style="border: none; border-radius: 12px;"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-4">
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm font-medium">Назад к таймеру</span>
          </Link>
          <h1 className="text-4xl font-bold text-primary">Установка таймера</h1>
          <p className="text-muted-foreground">Добавьте таймер на свой сайт за 2 минуты</p>
        </div>

        <Card className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Скопируйте код</h3>
                <p className="text-sm text-muted-foreground">
                  Нажмите кнопку "Копировать" чтобы скопировать код виджета
                </p>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{embedCode}</code>
              </pre>
              <Button
                onClick={handleCopy}
                className="absolute top-3 right-3"
                variant={copied ? "secondary" : "default"}
              >
                <Icon name={copied ? "Check" : "Copy"} size={16} />
                <span className="ml-2">{copied ? "Скопировано!" : "Копировать"}</span>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Вставьте на сайт</h3>
              <p className="text-sm text-muted-foreground">
                Вставьте скопированный код в любое место вашего сайта, где хотите отобразить таймер
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Готово!</h3>
              <p className="text-sm text-muted-foreground">
                Таймер появится на вашем сайте и будет автоматически работать
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-accent border-primary/20">
          <div className="flex items-start gap-4">
            <Icon name="Info" size={24} className="text-primary shrink-0" />
            <div className="space-y-1">
              <h4 className="font-semibold text-primary">Настройки виджета</h4>
              <p className="text-sm text-muted-foreground">
                Вы можете изменить размеры виджета, изменив значения <code className="bg-white px-1 rounded">width</code> и <code className="bg-white px-1 rounded">height</code> в коде. Рекомендуемые размеры: ширина 350-450px, высота 450-550px.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Icon name="Timer" size={20} />
              Попробовать таймер
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Install;
