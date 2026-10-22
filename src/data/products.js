// Dados fictícios da loja. Num projeto real, viriam de uma API.
// As chaves das categorias ficam em inglês (código) e os rótulos em português (tela).

export const CATEGORIES = [
  { value: 'all', label: 'Todas as categorias' },
  { value: 'boards', label: 'Placas' },
  { value: 'sensors', label: 'Sensores' },
  { value: 'components', label: 'Componentes' },
  { value: 'tools', label: 'Ferramentas' },
  { value: 'kits', label: 'Kits' },
]

export const PRODUCTS = [
  {
    id: 'mcu-32-wifi',
    name: 'Placa microcontroladora 32 bits com Wi-Fi',
    category: 'boards',
    price: 64.9,
    rating: 4.7,
    summary: 'Dois núcleos, Wi-Fi e Bluetooth na mesma placa.',
    description:
      'Placa de desenvolvimento com processador de dois núcleos a 240 MHz, Wi-Fi 2.4 GHz e Bluetooth. Programável pela USB, ideal para projetos de automação residencial e IoT.',
    specs: [
      { label: 'Processador', value: '32 bits, 2 núcleos, 240 MHz' },
      { label: 'Memória flash', value: '4 MB' },
      { label: 'Conectividade', value: 'Wi-Fi 2.4 GHz e Bluetooth 4.2' },
      { label: 'Alimentação', value: '5 V pela USB-C' },
    ],
    reviews: [
      { author: 'Marina S.', rating: 5, text: 'Conectou na rede de primeira. Usei para ligar as luzes da sala pelo celular.' },
      { author: 'Diego R.', rating: 4, text: 'Ótima placa. Senti falta de pinos já soldados.' },
    ],
  },
  {
    id: 'mcu-8-uno',
    name: 'Placa microcontroladora 8 bits (formato Uno)',
    category: 'boards',
    price: 49.9,
    rating: 4.8,
    summary: 'A placa clássica para o primeiro projeto.',
    description:
      'Placa no formato mais usado em cursos e tutoriais, com 14 pinos digitais e 6 analógicos. Compatível com a maioria dos módulos e shields do mercado.',
    specs: [
      { label: 'Processador', value: '8 bits, 16 MHz' },
      { label: 'Pinos', value: '14 digitais, 6 analógicos' },
      { label: 'Memória flash', value: '32 KB' },
      { label: 'Alimentação', value: '7 a 12 V ou USB' },
    ],
    reviews: [
      { author: 'Paulo T.', rating: 5, text: 'Comprei para as aulas da faculdade e funcionou com todos os exemplos.' },
    ],
  },
  {
    id: 'mini-board-rp',
    name: 'Mini placa com microcontrolador de 2 núcleos',
    category: 'boards',
    price: 29.9,
    rating: 4.6,
    summary: 'Pequena, barata e programável em MicroPython.',
    description:
      'Placa compacta com microcontrolador de dois núcleos e 26 pinos de uso geral. Aceita programação em C e MicroPython, bom ponto de partida para quem está aprendendo.',
    specs: [
      { label: 'Processador', value: '2 núcleos, 133 MHz' },
      { label: 'Memória RAM', value: '264 KB' },
      { label: 'Pinos', value: '26 de uso geral' },
      { label: 'Tamanho', value: '51 × 21 mm' },
    ],
    reviews: [
      { author: 'Lívia M.', rating: 5, text: 'Cabe em qualquer caixinha. O MicroPython facilitou muito.' },
    ],
  },
  {
    id: 'sensor-dht',
    name: 'Sensor de temperatura e umidade',
    category: 'sensors',
    price: 18.9,
    rating: 4.4,
    summary: 'Leitura digital de temperatura e umidade do ar.',
    description:
      'Sensor com saída digital de um fio, mede temperatura de -40 °C a 80 °C e umidade de 0 a 100%. Muito usado em estações meteorológicas caseiras.',
    specs: [
      { label: 'Temperatura', value: '-40 °C a 80 °C (±0,5 °C)' },
      { label: 'Umidade', value: '0 a 100% (±2%)' },
      { label: 'Saída', value: 'Digital, 1 fio' },
      { label: 'Alimentação', value: '3,3 a 5 V' },
    ],
    reviews: [
      { author: 'Rafael C.', rating: 4, text: 'Leituras estáveis. Precisa de um resistor de pull-up.' },
    ],
  },
  {
    id: 'sensor-ultrasonic',
    name: 'Sensor ultrassônico de distância',
    category: 'sensors',
    price: 12.5,
    rating: 4.5,
    summary: 'Mede distâncias de 2 cm a 4 m.',
    description:
      'Módulo que emite pulsos ultrassônicos e mede o tempo do eco para calcular a distância. Ótimo para robôs que desviam de obstáculos.',
    specs: [
      { label: 'Alcance', value: '2 cm a 4 m' },
      { label: 'Precisão', value: '3 mm' },
      { label: 'Ângulo', value: '15°' },
      { label: 'Alimentação', value: '5 V' },
    ],
    reviews: [
      { author: 'Ana P.', rating: 5, text: 'Meu carrinho robô parou de bater na parede.' },
    ],
  },
  {
    id: 'sensor-pir',
    name: 'Sensor de presença infravermelho',
    category: 'sensors',
    price: 14.9,
    rating: 4.3,
    summary: 'Detecta movimento de pessoas a até 7 m.',
    description:
      'Sensor PIR com sensibilidade e tempo de disparo ajustáveis. Usado em alarmes e iluminação automática.',
    specs: [
      { label: 'Alcance', value: 'até 7 m' },
      { label: 'Ângulo', value: '110°' },
      { label: 'Tempo de disparo', value: '5 s a 5 min (ajustável)' },
      { label: 'Alimentação', value: '5 a 20 V' },
    ],
    reviews: [
      { author: 'João V.', rating: 4, text: 'Funciona bem. Leva uns segundos para estabilizar ao ligar.' },
    ],
  },
  {
    id: 'sensor-soil',
    name: 'Sensor capacitivo de umidade do solo',
    category: 'sensors',
    price: 16.9,
    rating: 4.6,
    summary: 'Não oxida como os sensores resistivos.',
    description:
      'Sensor capacitivo para medir a umidade da terra em vasos e hortas. Por não ter contato metálico exposto, dura muito mais que os modelos resistivos.',
    specs: [
      { label: 'Saída', value: 'Analógica, 0 a 3 V' },
      { label: 'Alimentação', value: '3,3 a 5,5 V' },
      { label: 'Comprimento', value: '98 mm' },
    ],
    reviews: [
      { author: 'Beatriz L.', rating: 5, text: 'Montei uma irrigação automática para as plantas da varanda.' },
    ],
  },
  {
    id: 'display-oled',
    name: 'Display OLED 0,96" monocromático',
    category: 'components',
    price: 24.9,
    rating: 4.7,
    summary: 'Tela nítida de 128 × 64 pixels via I2C.',
    description:
      'Display OLED que não precisa de luz de fundo, com ótimo contraste. Usa apenas dois fios de dados (I2C).',
    specs: [
      { label: 'Resolução', value: '128 × 64 pixels' },
      { label: 'Interface', value: 'I2C' },
      { label: 'Cor', value: 'Branco' },
      { label: 'Alimentação', value: '3,3 a 5 V' },
    ],
    reviews: [
      { author: 'Carla F.', rating: 5, text: 'Pequeno, mas dá para ler bem de perto. Fácil de ligar.' },
    ],
  },
  {
    id: 'relay-4ch',
    name: 'Módulo relé de 4 canais',
    category: 'components',
    price: 27.9,
    rating: 4.4,
    summary: 'Liga aparelhos de até 10 A pela placa.',
    description:
      'Módulo com quatro relés isolados por optoacopladores, para acionar lâmpadas, ventiladores e outros aparelhos a partir de um microcontrolador.',
    specs: [
      { label: 'Canais', value: '4' },
      { label: 'Carga máxima', value: '10 A em 250 V CA' },
      { label: 'Acionamento', value: '5 V' },
    ],
    reviews: [
      { author: 'Henrique A.', rating: 4, text: 'Cuidado com a parte de 220 V. O módulo em si é ótimo.' },
    ],
  },
  {
    id: 'servo-9g',
    name: 'Micro servo motor 9 g',
    category: 'components',
    price: 15.9,
    rating: 4.2,
    summary: 'Gira 180° com controle por PWM.',
    description:
      'Servo leve, muito usado em braços robóticos e mecanismos pequenos. Acompanha braços plásticos e parafusos.',
    specs: [
      { label: 'Rotação', value: '0° a 180°' },
      { label: 'Torque', value: '1,8 kg·cm' },
      { label: 'Peso', value: '9 g' },
    ],
    reviews: [
      { author: 'Igor N.', rating: 4, text: 'Bom para projetos leves. Engrenagens de plástico.' },
    ],
  },
  {
    id: 'resistor-kit',
    name: 'Kit de resistores com 600 peças',
    category: 'components',
    price: 22.9,
    rating: 4.8,
    summary: '30 valores diferentes, organizados e etiquetados.',
    description:
      'Caixa com 600 resistores de filme metálico, 20 de cada valor, de 10 Ω a 1 MΩ. Cada valor vem separado e identificado.',
    specs: [
      { label: 'Quantidade', value: '600 peças (30 valores)' },
      { label: 'Potência', value: '1/4 W' },
      { label: 'Tolerância', value: '1%' },
    ],
    reviews: [
      { author: 'Sofia D.', rating: 5, text: 'Nunca mais fiquei sem o resistor certo.' },
    ],
  },
  {
    id: 'led-kit',
    name: 'Sortimento de LEDs 5 mm com 200 peças',
    category: 'components',
    price: 19.9,
    rating: 4.5,
    summary: 'Cinco cores, 40 LEDs de cada.',
    description:
      'LEDs difusos de 5 mm nas cores vermelho, verde, azul, amarelo e branco. Vêm em caixa organizadora.',
    specs: [
      { label: 'Quantidade', value: '200 peças' },
      { label: 'Cores', value: 'Vermelho, verde, azul, amarelo e branco' },
      { label: 'Corrente', value: '20 mA' },
    ],
    reviews: [
      { author: 'Mateus G.', rating: 4, text: 'Bom custo-benefício para prototipar.' },
    ],
  },
  {
    id: 'soldering-iron',
    name: 'Ferro de solda 60 W com controle de temperatura',
    category: 'tools',
    price: 89.9,
    rating: 4.6,
    summary: 'Esquenta em menos de um minuto, de 200 °C a 450 °C.',
    description:
      'Ferro de solda com ajuste de temperatura no próprio cabo e ponta substituível. Acompanha suporte e esponja.',
    specs: [
      { label: 'Potência', value: '60 W' },
      { label: 'Temperatura', value: '200 °C a 450 °C' },
      { label: 'Tensão', value: '127 V' },
    ],
    reviews: [
      { author: 'Fernanda O.', rating: 5, text: 'Muito melhor que o ferro sem controle que eu usava.' },
      { author: 'Lucas B.', rating: 4, text: 'O suporte poderia ser mais pesado.' },
    ],
  },
  {
    id: 'multimeter',
    name: 'Multímetro digital com true RMS',
    category: 'tools',
    price: 119.9,
    rating: 4.7,
    summary: 'Mede tensão, corrente, resistência e continuidade.',
    description:
      'Multímetro com seleção automática de escala, medição true RMS e teste de continuidade com bipe. Display com luz de fundo.',
    specs: [
      { label: 'Tensão', value: 'até 600 V CA/CC' },
      { label: 'Corrente', value: 'até 10 A' },
      { label: 'Resistência', value: 'até 60 MΩ' },
      { label: 'Categoria de segurança', value: 'CAT III 600 V' },
    ],
    reviews: [
      { author: 'Roberto K.', rating: 5, text: 'A escala automática economiza muito tempo.' },
    ],
  },
  {
    id: 'breadboard',
    name: 'Protoboard 830 pontos',
    category: 'tools',
    price: 16.9,
    rating: 4.5,
    summary: 'Monte circuitos sem soldar.',
    description:
      'Matriz de contatos com 830 furos e duas linhas de alimentação de cada lado. Base adesiva para fixar em caixas.',
    specs: [
      { label: 'Pontos', value: '830' },
      { label: 'Tamanho', value: '165 × 55 mm' },
      { label: 'Fios aceitos', value: '0,3 a 0,8 mm' },
    ],
    reviews: [
      { author: 'Gabriela H.', rating: 4, text: 'Contatos firmes, nada de mau contato até agora.' },
    ],
  },
  {
    id: 'bench-power',
    name: 'Fonte de bancada ajustável 0 a 30 V',
    category: 'tools',
    price: 349.9,
    rating: 4.8,
    summary: 'Tensão e corrente ajustáveis, com proteção.',
    description:
      'Fonte de alimentação para bancada com limite de corrente ajustável e proteção contra curto-circuito. Indispensável para testar circuitos com segurança.',
    specs: [
      { label: 'Tensão', value: '0 a 30 V' },
      { label: 'Corrente', value: '0 a 5 A' },
      { label: 'Display', value: '4 dígitos' },
    ],
    reviews: [
      { author: 'Eduardo M.', rating: 5, text: 'O limite de corrente já salvou várias placas.' },
    ],
  },
  {
    id: 'starter-kit',
    name: 'Kit iniciante com 40 itens',
    category: 'kits',
    price: 199.9,
    rating: 4.9,
    summary: 'Placa, protoboard, sensores e um guia com 15 projetos.',
    description:
      'Tudo o que é preciso para começar: placa 8 bits, protoboard, jumpers, LEDs, resistores, sensores básicos e um guia em português com 15 projetos.',
    specs: [
      { label: 'Itens', value: '40' },
      { label: 'Projetos guiados', value: '15' },
      { label: 'Nível', value: 'Iniciante' },
    ],
    reviews: [
      { author: 'Tatiane R.', rating: 5, text: 'Presente perfeito para meu filho de 14 anos.' },
      { author: 'Vinícius P.', rating: 5, text: 'O guia em português faz toda a diferença.' },
    ],
  },
  {
    id: 'robot-kit',
    name: 'Kit chassi de robô 2 rodas',
    category: 'kits',
    price: 139.9,
    rating: 4.4,
    summary: 'Chassi, motores com redução e suporte de pilhas.',
    description:
      'Base em acrílico com dois motores com caixa de redução, roda boba e suporte para 4 pilhas AA. Basta adicionar uma placa e um driver de motor.',
    specs: [
      { label: 'Motores', value: '2, com redução 1:48' },
      { label: 'Alimentação', value: '4 pilhas AA (não inclusas)' },
      { label: 'Material', value: 'Acrílico' },
    ],
    reviews: [
      { author: 'Camila E.', rating: 4, text: 'Montagem simples, mas os parafusos são bem pequenos.' },
    ],
  },
]

// Busca o rótulo em português de uma categoria a partir da chave em inglês.
export function getCategoryLabel(categoryValue) {
  return CATEGORIES.find((category) => category.value === categoryValue)?.label ?? categoryValue
}
