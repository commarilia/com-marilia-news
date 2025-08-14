import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const news = [
  {
    id: 'mercado-livre',
    title: 'Mercado Livre agenda solenidade para início das atividades em Marília',
    summary: 'Evento acontece na manhã desta quarta-feira (14), no novo centro de distribuição.',
    content: `<p><strong>MARÍLIA -</strong> O Mercado Livre, gigante do comércio eletrônico na América Latina, agendou para a manhã desta quarta-feira (14), às 10h, a solenidade que marca o início oficial das atividades de seu novo centro de distribuição em Marília. O evento contará com a presença de autoridades e executivos da empresa.</p><p>O novo centro logístico, localizado estrategicamente às margens da rodovia, promete otimizar as entregas na região, gerando empregos e movimentando a economia local. A expectativa é que a operação comece de forma gradual, aumentando a capacidade conforme a demanda regional.</p><p>A chegada da empresa foi celebrada por lideranças locais como um marco para o desenvolvimento de Marília, posicionando a cidade como um importante polo logístico no interior de São Paulo.</p>`,
    image: 'https://marilianoticia.com.br/wp-content/uploads/2025/08/mercado-livre-ok-768x576.jpg',
    category: 'marilia',
    created_at: '2025-08-14T10:00:00Z',
    likes: 24
  },
  {
    id: 'fabio-conte',
    title: 'Morre o jornalista e apresentador Fábio Conte, aos 42 anos',
    summary: 'Profissional estava internado e lutava contra um câncer.',
    content: `<p><strong>MARÍLIA -</strong> A comunicação de Marília está de luto. Morreu na noite desta terça-feira (13), aos 42 anos, o jornalista e apresentador Fábio Conte. Ele estava internado e lutava contra um câncer.</p><p>Com uma carreira marcada pela versatilidade e carisma, Fábio atuou em diversas emissoras de rádio e televisão da cidade, tornando-se um rosto conhecido e querido pelo público. Sua partida gerou uma onda de comoção nas redes sociais, com homenagens de colegas de profissão, amigos e espectadores.</p><p>O velório acontece no Velório Municipal e o sepultamento está previsto para o final da tarde desta quarta-feira (14), no Cemitério da Saudade.</p>`,
    image: 'https://marilianoticia.com.br/wp-content/uploads/2025/08/489435781_2291614727876947_4869630662561411372_n.jpg',
    category: 'marilia',
    created_at: '2025-08-13T22:00:00Z',
    likes: 156
  },
  {
    id: 'transito',
    title: 'Zona Oeste de Marília recebe ação para reduzir lentidão no trânsito',
    summary: 'Alterações visam melhorar o fluxo de veículos em horários de pico.',
    content: `<p><strong>MARÍLIA -</strong> A Emdurb (Empresa de Mobilidade Urbana de Marília) iniciou uma série de alterações no trânsito da zona Oeste da cidade, com o objetivo de diminuir os congestionamentos em horários de pico. As mudanças incluem a implantação de novos semáforos inteligentes e a conversão de algumas ruas para mão única.</p><p>O foco principal da ação é a Avenida Tiradentes e seus cruzamentos, que concentram grande parte do fluxo de veículos da região. Segundo a Emdurb, os novos semáforos são sincronizados e se ajustam ao volume de tráfego em tempo real, prometendo maior fluidez.</p><p>Agentes de trânsito estão no local para orientar os motoristas durante o período de adaptação. A expectativa é que os primeiros resultados positivos sejam sentidos já nas próximas semanas.</p>`,
    image: 'https://marilianoticia.com.br/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-12-at-10.48.01-768x576.jpeg',
    category: 'marilia',
    created_at: '2025-08-12T14:30:00Z',
    likes: 89
  },
  {
    id: 'sacolinhas',
    title: 'Mudança em lei não garante sacolinhas gratuitas em Marília',
    summary: 'Nova legislação estadual não se sobrepõe à lei municipal existente.',
    content: `<p><strong>MARÍLIA -</strong> Uma nova lei estadual que regulamenta a distribuição de sacolas plásticas em São Paulo gerou dúvidas nos consumidores de Marília. No entanto, a mudança não garante a gratuidade das sacolinhas na cidade, pois a legislação municipal, que permite a cobrança, continua em vigor.</p><p>A lei estadual foca em questões ambientais, exigindo que as sacolas sejam feitas de material mais resistente e com maior percentual de conteúdo reciclado. A decisão sobre a cobrança ou não do item permanece a critério de cada município.</p><p>Em Marília, a lei que permite aos supermercados cobrarem pelas sacolas foi aprovada em 2019. Portanto, a prática continuará sendo permitida, e os estabelecimentos podem seguir cobrando pelo produto.</p>`,
    image: 'https://marilianoticia.com.br/wp-content/uploads/2025/07/sacola-04-768x511.jpg',
    category: 'marilia',
    created_at: '2025-08-11T09:15:00Z',
    likes: 67
  }
];

for (const article of news) {
  const { error } = await supabase.from('news').upsert(article);
  if (error) {
    console.error('Error inserting', article.id, error);
  } else {
    console.log('Inserted', article.id);
  }
}
