import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Install = () => {
  const [copied, setCopied] = useState(false);

  const tildaCode = `<!-- Вставьте этот код в блок T123 (HTML-код) на Тильде -->
<div id="timer-widget-container"></div>
<script>
(function() {
  var iframe = document.createElement('iframe');
  iframe.src = '${window.location.origin}';
  iframe.style.width = '100%';
  iframe.style.maxWidth = '450px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.display = 'block';
  iframe.style.margin = '0 auto';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'no');
  document.getElementById('timer-widget-container').appendChild(iframe);
})();
</script>`;

  const embedCode = `<iframe 
  src="${window.location.origin}" 
  width="400" 
  height="600" 
  frameborder="0"
  scrolling="no"
  style="border: none; border-radius: 12px; display: block; margin: 0 auto;"
></iframe>`;

  const [activeTab, setActiveTab] = useState<'tilda' | 'iframe'>('tilda');
  
  const handleCopy = () => {
    const code = activeTab === 'tilda' ? tildaCode : embedCode;
    navigator.clipboard.writeText(code);
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
              <div className="space-y-3 flex-1">
                <h3 className="font-semibold text-lg">Выберите платформу и скопируйте код</h3>
                
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={activeTab === 'tilda' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('tilda')}
                    className="gap-2"
                  >
                    <Icon name="Palette" size={16} />
                    Тильда
                  </Button>
                  <Button
                    variant={activeTab === 'iframe' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('iframe')}
                    className="gap-2"
                  >
                    <Icon name="Code2" size={16} />
                    Другие сайты
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm max-h-80">
                <code>{activeTab === 'tilda' ? tildaCode : embedCode}</code>
              </pre>
              <Button
                onClick={handleCopy}
                className="absolute top-3 right-3"
                variant={copied ? "secondary" : "default"}
                size="sm"
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
              {activeTab === 'tilda' ? (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>На Тильде:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Добавьте блок <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">T123 (HTML-код)</code></li>
                    <li>Вставьте скопированный код в этот блок</li>
                    <li>Сохраните и опубликуйте страницу</li>
                  </ol>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Вставьте скопированный код в HTML вашего сайта, где хотите отобразить таймер
                </p>
              )}
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
                {activeTab === 'tilda' 
                  ? 'Код для Тильды автоматически адаптируется под размер блока. Виджет будет по центру и адаптивен на всех устройствах.'
                  : 'Вы можете изменить размеры виджета, изменив значения width и height в коде. Рекомендуемые размеры: ширина 350-450px, высота 550-650px.'}
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