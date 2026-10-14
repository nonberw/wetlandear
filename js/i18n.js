/* WetlandEar: RU / EN dictionary and language switching.
   No em dashes on purpose. Plain, functional copy. */
(function () {
  var D = {
    en: {
      skip: 'Skip to content',
      nav_how: 'How it works', nav_product: 'Platform', nav_parts: 'Components', nav_metrics: 'Metrics', nav_pilot: 'Pilot site', nav_app: 'App', app_open: 'Open the app prototype', app_note: 'Record on a phone, find sound events, verify them. Species are named by a person for now.',
      cta: 'Join the pilot',
      hero_h1_a: 'Hear every', hero_h1_b: 'reserve.',
      hero_sub: 'An open acoustic monitoring system. Solar stations listen to birds, rangers see everything on one map.',
      hero_cta2: 'How it works',
      pt_feed: 'Feed', pt_map: 'Map', pt_alert: 'Alerts', pt_export: 'Export', totop: 'Back to top',
      mani_1: 'It listens.', mani_2: 'It understands.', mani_3: 'It tells you.',
      globe_h2: 'From one reserve to a whole country.',
      globe_p: 'Events from every reserve flow into one national dashboard in Astana. More reserves join the same system.',
      leg_pilot: 'Pilot: Korgalzhyn', leg_next: 'Next reserves', leg_dash: 'National dashboard',
      lbl_astana: 'Astana', lbl_korg: 'Korgalzhyn',

      prob_statement: 'Reserves are vast. People in the field are few. Birds do not wait for the next survey.',
      prob_1_t: 'At night', prob_1_p: 'Many birds fly and call after dark, when nobody is there to hear.',
      prob_2_t: 'In migration season', prob_2_p: 'Waves of birds pass in days. Rare visits miss them.',
      prob_3_t: 'Far from people', prob_3_p: 'A huge territory and few people in the field.',
      prob_close: 'A microphone listens around the clock. And it is cheap.',

      how_eyebrow: 'How it works', how_h2: 'Only the event leaves the device.',
      s1_t: 'Listen', s1_p: 'A MEMS microphone on a solar-powered ESP32-S3 station records day and night.',
      s2_t: 'Understand', s2_p: 'A small model names the species on the device itself. The raw audio stays there.',
      s3_t: 'Send', s3_p: 'LoRa carries the species, the time and the confidence. A tiny message, not a recording.',
      s4_t: 'Collect', s4_p: 'A gateway in the reserve office receives the events. No internet needed.',
      s5_t: 'Show', s5_p: 'Rangers get an event feed, a map of stations and Telegram alerts.',
      st_mic: 'Microphone', st_species: 'Flamingo', st_conf: 'high confidence', st_audio: 'audio stays here',
      st_link: 'species + time', st_noaudio: 'no audio', st_gateway: 'Gateway', st_db: 'local database',
      st_map: 'Stations', st_tg: 'Telegram',

      prod_h2: 'Two parts. One system.', prod_sub: 'A station in the field and a platform in the office.',
      node_t: 'Station', node_badge: 'Prototype',
      node_p: 'A low-cost, solar-powered listening device. It runs the species model itself and sends only events.',
      node_li1: 'ESP32-S3 with an I2S MEMS microphone', node_li2: 'LoRa radio for remote terrain',
      node_li3: 'Solar panel and battery', node_li4: 'On-device species model',
      plat_t: 'Platform', plat_badge: 'Prototype',
      plat_p: 'One screen for the whole reserve. Works offline with a local gateway.',
      plat_li1: 'Event feed with an audio clip to verify', plat_li2: 'Station map with battery and last contact',
      plat_li3: 'Telegram alerts for rare species and threats', plat_li4: 'CSV and Darwin Core export for GBIF',
      open_t: 'Open by design', open_badge: 'Planned',
      open_p: 'Data and code will be published, so any reserve can repeat the setup.',

      demo_h2: 'See what rangers see.', demo_sub: 'A live preview with demo data. Real events will look like this.',
      demo_badge: 'Demo data', demo_pause: 'Pause', demo_resume: 'Resume',
      f_all: 'All', f_birds: 'Birds', f_threats: 'Threats',
      demo_feed: 'Event feed', demo_map: 'Stations', demo_empty: 'Listening...',
      c_high: 'high', c_medium: 'medium', c_check: 'check',
      ev_flamingo: 'Flamingo', ev_crane: 'Demoiselle crane', ev_lapwing: 'Lapwing',
      ev_gunshot: 'Possible gunshot', ev_engine: 'Engine noise',
      st_1: 'Station 1', st_2: 'Station 2', st_3: 'Station 3', st_pilot: 'pilot',
      tg_sent: 'Telegram alert sent',

      parts_eyebrow: 'Architecture', parts_h2: 'Five parts, one database.',
      parts_sub: 'Four sources write to the database. The dashboard reads only from it.',
      p1_d: 'Sound from the stations. The core of the project.', p1_s: 'Now',
      p2_d: 'Water and vegetation from open satellite imagery.', p2_s: 'In parallel',
      p3_d: 'Photos and headcounts to calibrate the sound index.', p3_s: 'Second stage',
      p4_d: 'Partners\' GPS tracks and observations.', p4_s: 'Later',
      db_t: 'One database', db_d1: 'observations: species, time, place', db_d2: 'environment layers: water, vegetation',
      dash_i1: 'Map of Kazakhstan', dash_i2: 'Abundance dynamics', dash_i3: 'Migration corridors', dash_i4: 'Anomaly alerts',

      for_h2: 'Built for people who protect the land.',
      for_1_t: 'Reserves', for_1_p: 'Know what lives on your territory around the clock. Get alerts about rare species and threats. Keep your own data.',
      for_2_t: 'Scientists', for_2_p: 'Labeled recordings from the Kazakh steppe, BirdNET and Perch tested on local species, export in Darwin Core.',
      for_3_t: 'Rangers', for_3_p: 'Alerts in Telegram, a map of stations, nothing complicated to set up.',

      birds_eyebrow: 'Who we listen for', birds_h2: 'Voices of marsh and lake.',
      birds_p: 'Every species the system learns starts as a sound. These birds live on the lakes and steppes of Kazakhstan or fly over them.',
      bird_pelican: 'Dalmatian pelican', bird_flamingo: 'Greater flamingo', bird_cranes: 'Demoiselle cranes',
      where_pelican: 'Lake Karakol, Mangystau', where_flamingo: 'Korgalzhyn Reserve', where_cranes: 'Taukum desert',
      foot_photos: 'Photos from Wikimedia Commons:',
      pilot_h2: 'First site: Korgalzhyn.', pilot_sub: 'A wetland of international importance in the Kazakh steppe.',
      pil_1_t: 'UNESCO', pil_1_p: 'Part of the World Heritage site Saryarka, Steppe and Lakes of Northern Kazakhstan (2008).',
      pil_2_t: 'Ramsar', pil_2_p: 'A wetland of international importance: the Tengiz and Korgalzhyn lake system.',
      pil_3_t: 'Flamingos', pil_3_p: 'Lake Tengiz is described as the northernmost flamingo nesting site in the world.',
      pilot_src: 'Sources: UNESCO (whc.unesco.org), Ramsar Convention (ramsar.org)',

      proof_eyebrow: 'Validation', proof_h2: 'How we test it.',
      pr1_t: 'Baseline', pr1_p: 'BirdNET and Perch on existing recordings give a first accuracy table by species.',
      pr2_t: 'Own dataset', pr2_p: 'Korgalzhyn recordings labeled with the reserve\'s ornithologist, so the accuracy is verified.',
      pr3_t: 'Honest split', pr3_p: 'We test on other sites and other dates, not on random clips of one recording.',
      pr4_t: 'Field test', pr4_p: 'A reference recorder runs alongside. Wind and water are tested separately. False alarms are counted per hour.',

      plan_h2: 'Six steps. Each one shows a result.',
      pl1_t: 'Contact', pl1_p: 'The reserve agrees to the installation and names an advising ornithologist.',
      pl2_t: 'Baseline', pl2_p: 'First accuracy table for BirdNET and Perch.',
      pl3_t: 'Dataset', pl3_p: 'Collection and labeling, split by site and date.',
      pl4_t: 'Model and MVP', pl4_p: 'Fine-tuning, quantization, event feed and Telegram alerts on one station.',
      pl5_t: 'Field season', pl5_p: 'Power draw, LoRa range, comparison with a reference recorder.',
      pl6_t: 'Analysis and defense', pl6_p: 'Results for the RKNP and ISEF science competitions.',
      plan_par: 'In parallel: satellite analysis of water and vegetation.',
      plan_next: 'Next: a second reserve with different terrain, to test whether the model transfers.',

      join_h2: 'Be the first reserve to listen.',
      join_p: 'We are looking for a pilot reserve, an ornithologist, and mentors in audio ML and remote sensing.',
      foot_built: 'Built in Astana by Zhasmin Jumanova.', foot_site: 'Portfolio', foot_privacy: 'Privacy', foot_metrics: 'Model accuracy',
      mail_subject: 'WetlandEar pilot',
      mail_body: 'Hello Zhasmin,\n\nWe are interested in the WetlandEar pilot.\n\nReserve or organization:\nContact person:\n'
    },

    ru: {
      skip: 'К содержимому',
      nav_how: 'Как это работает', nav_product: 'Платформа', nav_parts: 'Компоненты', nav_metrics: 'Метрики', nav_pilot: 'Площадка', nav_app: 'Приложение', app_open: 'Открыть прототип приложения', app_note: 'Запишите звук на телефон, найдите события и проверьте их. Вид пока определяет человек.',
      cta: 'Войти в пилот',
      hero_h1_a: 'Слышать каждый', hero_h1_b: 'заповедник.',
      hero_sub: 'Открытая система акустического мониторинга. Солнечные станции слушают птиц, а рейнджеры видят всё на одной карте.',
      hero_cta2: 'Как это работает',
      pt_feed: 'Лента', pt_map: 'Карта', pt_alert: 'Оповещения', pt_export: 'Экспорт', totop: 'Наверх',
      mani_1: 'Слушает.', mani_2: 'Понимает.', mani_3: 'Сообщает.',
      globe_h2: 'От одного заповедника к целой стране.',
      globe_p: 'События из каждого заповедника попадают в единую национальную панель в Астане. Новые заповедники подключаются к той же системе.',
      leg_pilot: 'Пилот: Коргалжын', leg_next: 'Следующие заповедники', leg_dash: 'Национальная панель',
      lbl_astana: 'Астана', lbl_korg: 'Коргалжын',

      prob_statement: 'Заповедники огромны. Людей в поле мало. Птицы не ждут следующего учёта.',
      prob_1_t: 'Ночью', prob_1_p: 'Многие птицы летят и подают голос в темноте, когда рядом никого нет.',
      prob_2_t: 'В сезон миграции', prob_2_p: 'Волны птиц проходят за считанные дни. Редкие выходы их пропускают.',
      prob_3_t: 'Вдали от людей', prob_3_p: 'Огромная территория и мало людей в поле.',
      prob_close: 'Микрофон слушает круглосуточно. И стоит недорого.',

      how_eyebrow: 'Как это работает', how_h2: 'С устройства уходит только событие.',
      s1_t: 'Слушает', s1_p: 'MEMS-микрофон на станции с ESP32-S3 и солнечной панелью пишет день и ночь.',
      s2_t: 'Распознаёт', s2_p: 'Небольшая модель определяет вид прямо на устройстве. Сырой звук остаётся там же.',
      s3_t: 'Передаёт', s3_p: 'По LoRa уходят вид, время и уверенность модели. Крошечное сообщение, а не запись.',
      s4_t: 'Собирает', s4_p: 'Шлюз в офисе заповедника принимает события. Интернет не нужен.',
      s5_t: 'Показывает', s5_p: 'Рейнджеры получают ленту событий, карту станций и оповещения в Telegram.',
      st_mic: 'Микрофон', st_species: 'Фламинго', st_conf: 'уверенность высокая', st_audio: 'звук остаётся здесь',
      st_link: 'вид + время', st_noaudio: 'без звука', st_gateway: 'Шлюз', st_db: 'локальная база',
      st_map: 'Станции', st_tg: 'Telegram',

      prod_h2: 'Две части. Одна система.', prod_sub: 'Станция в поле и платформа в офисе.',
      node_t: 'Станция', node_badge: 'Прототип',
      node_p: 'Недорогое устройство на солнечной батарее. Само запускает модель определения видов и отправляет только события.',
      node_li1: 'ESP32-S3 с MEMS-микрофоном I2S', node_li2: 'Радио LoRa для удалённой местности',
      node_li3: 'Солнечная панель и батарея', node_li4: 'Модель видов на устройстве',
      plat_t: 'Платформа', plat_badge: 'Прототип',
      plat_p: 'Один экран для всего заповедника. Работает без интернета с локальным шлюзом.',
      plat_li1: 'Лента событий с фрагментом звука для проверки', plat_li2: 'Карта станций с зарядом и последней связью',
      plat_li3: 'Оповещения в Telegram о редких видах и угрозах', plat_li4: 'Экспорт в CSV и Darwin Core для GBIF',
      open_t: 'Открыто по замыслу', open_badge: 'В планах',
      open_p: 'Данные и код будут опубликованы, чтобы любой заповедник мог повторить установку.',

      demo_h2: 'Что видит рейнджер.', demo_sub: 'Живой предпросмотр на демо-данных. Настоящие события будут выглядеть так.',
      demo_badge: 'Демо-данные', demo_pause: 'Пауза', demo_resume: 'Продолжить',
      f_all: 'Все', f_birds: 'Птицы', f_threats: 'Угрозы',
      demo_feed: 'Лента событий', demo_map: 'Станции', demo_empty: 'Слушаем...',
      c_high: 'высокая', c_medium: 'средняя', c_check: 'проверить',
      ev_flamingo: 'Фламинго', ev_crane: 'Журавль-красавка', ev_lapwing: 'Чибис',
      ev_gunshot: 'Возможный выстрел', ev_engine: 'Шум двигателя',
      st_1: 'Станция 1', st_2: 'Станция 2', st_3: 'Станция 3', st_pilot: 'пилот',
      tg_sent: 'Оповещение отправлено в Telegram',

      parts_eyebrow: 'Архитектура', parts_h2: 'Пять частей, одна база данных.',
      parts_sub: 'Четыре источника пишут в базу. Дашборд читает только её.',
      p1_d: 'Звук со станций. Ядро проекта.', p1_s: 'Сейчас',
      p2_d: 'Вода и растительность по открытым спутниковым снимкам.', p2_s: 'Параллельно',
      p3_d: 'Фото и подсчёт особей, чтобы калибровать звуковой индекс.', p3_s: 'Второй этап',
      p4_d: 'GPS-треки и наблюдения партнёров.', p4_s: 'Позже',
      db_t: 'Единая база', db_d1: 'наблюдения: вид, время, место', db_d2: 'слои среды: вода, растительность',
      dash_i1: 'Карта Казахстана', dash_i2: 'Динамика численности', dash_i3: 'Миграционные коридоры', dash_i4: 'Предупреждения об аномалиях',

      for_h2: 'Для тех, кто охраняет землю.',
      for_1_t: 'Заповедники', for_1_p: 'Знайте, кто живёт на вашей территории круглосуточно. Получайте оповещения о редких видах и угрозах. Данные остаются у вас.',
      for_2_t: 'Учёные', for_2_p: 'Размеченные записи казахстанской степи, BirdNET и Perch, проверенные на местных видах, экспорт в Darwin Core.',
      for_3_t: 'Рейнджеры', for_3_p: 'Оповещения в Telegram, карта станций и ничего сложного в настройке.',

      birds_eyebrow: 'Кого мы слушаем', birds_h2: 'Голоса болот и озёр.',
      birds_p: 'Любой вид, который учится узнавать система, начинается со звука. Эти птицы живут на озёрах и в степях Казахстана или пролетают над ними.',
      bird_pelican: 'Кудрявый пеликан', bird_flamingo: 'Розовый фламинго', bird_cranes: 'Журавли-красавки',
      where_pelican: 'Озеро Каракол, Мангистау', where_flamingo: 'Коргалжынский заповедник', where_cranes: 'Пески Таукум',
      foot_photos: 'Фото с Wikimedia Commons:',
      pilot_h2: 'Первая площадка: Коргалжын.', pilot_sub: 'Водно-болотное угодье международного значения в степи Казахстана.',
      pil_1_t: 'ЮНЕСКО', pil_1_p: 'Часть объекта Всемирного наследия Сарыарка, степи и озёра Северного Казахстана (2008).',
      pil_2_t: 'Рамсар', pil_2_p: 'Водно-болотное угодье международного значения: система озёр Тенгиз и Коргалжын.',
      pil_3_t: 'Фламинго', pil_3_p: 'Озеро Тенгиз описывают как самое северное в мире место гнездования фламинго.',
      pilot_src: 'Источники: ЮНЕСКО (whc.unesco.org), Рамсарская конвенция (ramsar.org)',

      proof_eyebrow: 'Проверка', proof_h2: 'Как мы проверяем.',
      pr1_t: 'Базовая линия', pr1_p: 'BirdNET и Perch на имеющихся записях дают первую таблицу точности по видам.',
      pr2_t: 'Свой датасет', pr2_p: 'Записи Коргалжына размечает орнитолог заповедника, поэтому точность подтверждена.',
      pr3_t: 'Честное деление', pr3_p: 'Тестируем на других участках и в другие даты, а не на случайных кусках одной записи.',
      pr4_t: 'Полевой тест', pr4_p: 'Рядом работает эталонный рекордер. Ветер и вода проверяются отдельно. Ложные срабатывания считаются в час.',

      plan_h2: 'Шесть шагов. Каждый даёт результат.',
      pl1_t: 'Контакт', pl1_p: 'Заповедник согласует установку и называет орнитолога-консультанта.',
      pl2_t: 'Базовая линия', pl2_p: 'Первая таблица точности для BirdNET и Perch.',
      pl3_t: 'Датасет', pl3_p: 'Сбор и разметка, деление по участкам и датам.',
      pl4_t: 'Модель и MVP', pl4_p: 'Дообучение, квантование, лента событий и оповещения в Telegram на одной станции.',
      pl5_t: 'Полевой сезон', pl5_p: 'Питание, дальность LoRa, сравнение с эталонным рекордером.',
      pl6_t: 'Анализ и защита', pl6_p: 'Результаты для конкурсов РКНП и ISEF.',
      plan_par: 'Параллельно: спутниковый анализ воды и растительности.',
      plan_next: 'Затем: второй заповедник с другой местностью, чтобы проверить перенос модели.',

      join_h2: 'Станьте первым заповедником, который слушает.',
      join_p: 'Ищем пилотный заповедник, орнитолога и наставников по ML для звука и дистанционному зондированию.',
      foot_built: 'Сделано в Астане: Zhasmin Jumanova.', foot_site: 'Портфолио', foot_privacy: 'Конфиденциальность', foot_metrics: 'Точность модели',
      mail_subject: 'WetlandEar: пилот',
      mail_body: 'Здравствуйте, Zhasmin!\n\nНас интересует пилот WetlandEar.\n\nЗаповедник или организация:\nКонтактное лицо:\n'
    },

    kk: {
      skip: 'Мазмұнға өту',
      nav_how: 'Бұл қалай жұмыс істейді', nav_product: 'Платформа', nav_parts: 'Құрамдас бөліктер', nav_metrics: 'Көрсеткіштер', nav_pilot: 'Алаң', nav_app: 'Қолданба', app_open: 'Қолданба прототипін ашу', app_note: 'Телефонға дыбыс жазыңыз, оқиғаларды тауып, тексеріңіз. Түрді әзірге адам анықтайды.',
      cta: 'Пилотқа қосылу',
      hero_h1_a: 'Әр қорықты', hero_h1_b: 'тыңдау.',
      hero_sub: 'Ашық акустикалық мониторинг жүйесі. Күн станциялары құстарды тыңдайды, ал инспекторлар бәрін бір картадан көреді.',
      hero_cta2: 'Бұл қалай жұмыс істейді',
      pt_feed: 'Лента', pt_map: 'Карта', pt_alert: 'Хабарландырулар', pt_export: 'Экспорт', totop: 'Жоғары',
      mani_1: 'Тыңдайды.', mani_2: 'Түсінеді.', mani_3: 'Хабарлайды.',
      globe_h2: 'Бір қорықтан бүкіл елге дейін.',
      globe_p: 'Әр қорықтағы оқиғалар Астанадағы бірыңғай ұлттық панельге түседі. Жаңа қорықтар сол жүйеге қосылады.',
      leg_pilot: 'Пилот: Қорғалжың', leg_next: 'Келесі қорықтар', leg_dash: 'Ұлттық панель',
      lbl_astana: 'Астана', lbl_korg: 'Қорғалжың',

      prob_statement: 'Қорықтар орасан үлкен. Далада адам аз. Құстар келесі санақты күтпейді.',
      prob_1_t: 'Түнде', prob_1_p: 'Көп құс айналада ешкім жоқ қараңғыда ұшып, дауыс береді.',
      prob_2_t: 'Миграция маусымында', prob_2_p: 'Құс толқындары бірнеше күнде өтіп кетеді. Сирек шығулар оларды жіберіп алады.',
      prob_3_t: 'Адамдардан алыс', prob_3_p: 'Орасан үлкен аумақ және далада адам аз.',
      prob_close: 'Микрофон тәулік бойы тыңдайды. Әрі арзан тұрады.',

      how_eyebrow: 'Бұл қалай жұмыс істейді', how_h2: 'Құрылғыдан тек оқиға кетеді.',
      s1_t: 'Тыңдайды', s1_p: 'ESP32-S3 және күн панелі бар станциядағы MEMS микрофон күндіз-түні жазады.',
      s2_t: 'Таниды', s2_p: 'Шағын модель түрді тікелей құрылғыда анықтайды. Шикі дыбыс сонда қалады.',
      s3_t: 'Жібереді', s3_p: 'LoRa арқылы түр, уақыт және модель сенімділігі кетеді. Жазба емес, кішкентай хабарлама.',
      s4_t: 'Жинайды', s4_p: 'Қорық кеңсесіндегі шлюз оқиғаларды қабылдайды. Интернет қажет емес.',
      s5_t: 'Көрсетеді', s5_p: 'Инспекторлар оқиғалар лентасын, станциялар картасын және Telegram хабарландыруларын алады.',
      st_mic: 'Микрофон', st_species: 'Фламинго', st_conf: 'сенімділік жоғары', st_audio: 'дыбыс осында қалады',
      st_link: 'түр + уақыт', st_noaudio: 'дыбыссыз', st_gateway: 'Шлюз', st_db: 'жергілікті база',
      st_map: 'Станциялар', st_tg: 'Telegram',

      prod_h2: 'Екі бөлік. Бір жүйе.', prod_sub: 'Далада станция, кеңседе платформа.',
      node_t: 'Станция', node_badge: 'Прототип',
      node_p: 'Күн батареясымен жұмыс істейтін арзан құрылғы. Түрді анықтау моделін өзі іске қосып, тек оқиғаларды жібереді.',
      node_li1: 'I2S MEMS микрофоны бар ESP32-S3', node_li2: 'Шалғай жерге арналған LoRa радиосы',
      node_li3: 'Күн панелі және батарея', node_li4: 'Құрылғыдағы түр моделі',
      plat_t: 'Платформа', plat_badge: 'Прототип',
      plat_p: 'Бүкіл қорыққа арналған бір экран. Жергілікті шлюзбен интернетсіз жұмыс істейді.',
      plat_li1: 'Тексеруге арналған дыбыс үзіндісі бар оқиғалар лентасы', plat_li2: 'Заряды мен соңғы байланысы бар станциялар картасы',
      plat_li3: 'Сирек түрлер мен қауіптер туралы Telegram хабарландырулары', plat_li4: 'GBIF үшін CSV және Darwin Core экспорты',
      open_t: 'Ойша ашық', open_badge: 'Жоспарда',
      open_p: 'Кез келген қорық орнатуды қайталай алуы үшін деректер мен код жарияланады.',

      demo_h2: 'Инспектор нені көреді.', demo_sub: 'Демо-деректердегі тірі алдын ала көру. Нақты оқиғалар осылай көрінеді.',
      demo_badge: 'Демо-деректер', demo_pause: 'Кідірту', demo_resume: 'Жалғастыру',
      f_all: 'Барлығы', f_birds: 'Құстар', f_threats: 'Қауіптер',
      demo_feed: 'Оқиғалар лентасы', demo_map: 'Станциялар', demo_empty: 'Тыңдап жатырмыз...',
      c_high: 'жоғары', c_medium: 'орташа', c_check: 'тексеру',
      ev_flamingo: 'Фламинго', ev_crane: 'Сұлу тырна', ev_lapwing: 'Көкқұтан',
      ev_gunshot: 'Мүмкін мылтық дауысы', ev_engine: 'Қозғалтқыш шуы',
      st_1: '1-станция', st_2: '2-станция', st_3: '3-станция', st_pilot: 'пилот',
      tg_sent: 'Хабарландыру Telegram-ға жіберілді',

      parts_eyebrow: 'Архитектура', parts_h2: 'Бес бөлік, бір дерекқор.',
      parts_sub: 'Төрт көз дерекқорға жазады. Дашборд тек соны оқиды.',
      p1_d: 'Станциялардан дыбыс. Жобаның өзегі.', p1_s: 'Қазір',
      p2_d: 'Ашық спутник суреттері бойынша су және өсімдік.', p2_s: 'Қатар',
      p3_d: 'Дыбыстық индексті калибрлеу үшін фото және дараларды санау.', p3_s: 'Екінші кезең',
      p4_d: 'GPS-тректер және серіктестердің бақылаулары.', p4_s: 'Кейінірек',
      db_t: 'Бірыңғай база', db_d1: 'бақылаулар: түр, уақыт, орын', db_d2: 'орта қабаттары: су, өсімдік',
      dash_i1: 'Қазақстан картасы', dash_i2: 'Сан динамикасы', dash_i3: 'Миграция дәліздері', dash_i4: 'Ауытқулар туралы ескертулер',

      for_h2: 'Жерді қорғайтындарға арналған.',
      for_1_t: 'Қорықтар', for_1_p: 'Аумағыңызда кім тұратынын тәулік бойы біліңіз. Сирек түрлер мен қауіптер туралы хабарландыру алыңыз. Деректер сізде қалады.',
      for_2_t: 'Ғалымдар', for_2_p: 'Қазақстан даласының белгіленген жазбалары, жергілікті түрлерде тексерілген BirdNET және Perch, Darwin Core экспорты.',
      for_3_t: 'Инспекторлар', for_3_p: 'Telegram хабарландырулары, станциялар картасы және орнатуда күрделі ештеңе жоқ.',

      birds_eyebrow: 'Кімді тыңдаймыз', birds_h2: 'Батпақтар мен көлдердің дауыстары.',
      birds_p: 'Жүйе тануды үйренетін кез келген түр дыбыстан басталады. Бұл құстар Қазақстанның көлдері мен далаларында мекендейді немесе олардың үстінен ұшып өтеді.',
      bird_pelican: 'Бұйра бірқазан', bird_flamingo: 'Қызғылт фламинго', bird_cranes: 'Сұлу тырналар',
      where_pelican: 'Қарақол көлі, Маңғыстау', where_flamingo: 'Қорғалжың қорығы', where_cranes: 'Тауқұм құмы',
      foot_photos: 'Wikimedia Commons фотолары:',
      pilot_h2: 'Бірінші алаң: Қорғалжың.', pilot_sub: 'Қазақстан даласындағы халықаралық маңызы бар сулы-батпақты алқап.',
      pil_1_t: 'ЮНЕСКО', pil_1_p: 'Сарыарқа, Солтүстік Қазақстанның дала мен көлдері Бүкіләлемдік мұра объектісінің бөлігі (2008).',
      pil_2_t: 'Рамсар', pil_2_p: 'Халықаралық маңызы бар сулы-батпақты алқап: Теңіз және Қорғалжың көлдер жүйесі.',
      pil_3_t: 'Фламинго', pil_3_p: 'Теңіз көлі әлемдегі фламингоның ең солтүстіктегі ұялау орны ретінде сипатталады.',
      pilot_src: 'Дереккөздер: ЮНЕСКО (whc.unesco.org), Рамсар конвенциясы (ramsar.org)',

      proof_eyebrow: 'Тексеру', proof_h2: 'Біз қалай тексереміз.',
      pr1_t: 'Негізгі сызық', pr1_p: 'BirdNET және Perch қолда бар жазбаларда түрлер бойынша алғашқы дәлдік кестесін береді.',
      pr2_t: 'Өз деректер жинағы', pr2_p: 'Қорғалжың жазбаларын қорық орнитологы белгілейді, сондықтан дәлдік расталған.',
      pr3_t: 'Адал бөлу', pr3_p: 'Бір жазбаның кездейсоқ бөліктерінде емес, басқа учаскелер мен басқа күндерде тексереміз.',
      pr4_t: 'Далалық тест', pr4_p: 'Қасында эталондық рекордер жұмыс істейді. Жел мен су бөлек тексеріледі. Жалған іске қосулар сағатына есептеледі.',

      plan_h2: 'Алты қадам. Әрқайсысы нәтиже береді.',
      pl1_t: 'Байланыс', pl1_p: 'Қорық орнатуды келісіп, кеңесші орнитологты атайды.',
      pl2_t: 'Негізгі сызық', pl2_p: 'BirdNET және Perch үшін алғашқы дәлдік кестесі.',
      pl3_t: 'Деректер жинағы', pl3_p: 'Жинау және белгілеу, учаскелер мен күндер бойынша бөлу.',
      pl4_t: 'Модель және MVP', pl4_p: 'Қосымша оқыту, квантау, оқиғалар лентасы және бір станциядағы Telegram хабарландырулары.',
      pl5_t: 'Далалық маусым', pl5_p: 'Қуат, LoRa қашықтығы, эталондық рекордермен салыстыру.',
      pl6_t: 'Талдау және қорғау', pl6_p: 'Ғылыми жобалар республикалық байқауы мен ISEF үшін нәтижелер.',
      plan_par: 'Қатар: су мен өсімдіктің спутниктік талдауы.',
      plan_next: 'Содан кейін: модельдің көшірілуін тексеру үшін басқа жергілікті жері бар екінші қорық.',

      join_h2: 'Тыңдайтын алғашқы қорық болыңыз.',
      join_p: 'Пилоттық қорықты, орнитологты және дыбыс пен қашықтан зондтау бойынша ML тәлімгерлерін іздейміз.',
      foot_built: 'Астанада жасалған: Zhasmin Jumanova.', foot_site: 'Портфолио', foot_privacy: 'Құпиялылық', foot_metrics: 'Модель дәлдігі',
      mail_subject: 'WetlandEar: пилот',
      mail_body: 'Сәлеметсіз бе, Zhasmin!\n\nБізді WetlandEar пилоты қызықтырады.\n\nҚорық немесе ұйым:\nБайланыс адамы:\n'
    }
  };

  var KEY = 'we-lang';
  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'ru' || saved === 'en' || saved === 'kk') return saved;
    var n = (navigator.language || 'en').toLowerCase();
    return n.indexOf('kk') === 0 ? 'kk' : n.indexOf('ru') === 0 ? 'ru' : 'en';
  }

  var WE = window.WE = {
    lang: detect(),
    t: function (k) { var l = WE.lang; return (D[l] && D[l][k]) || (l === 'kk' && D.ru[k]) || D.en[k] || k; },
    apply: function () {
      var l = WE.lang;
      document.documentElement.lang = l;
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        el.textContent = WE.t(el.getAttribute('data-i18n'));
      });
      document.querySelectorAll('[data-mail]').forEach(function (a) {
        a.href = 'mailto:zzhaseka@gmail.com?subject=' + encodeURIComponent(WE.t('mail_subject')) +
          '&body=' + encodeURIComponent(WE.t('mail_body'));
      });
      document.querySelectorAll('.lang button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false');
      });
      document.title = l === 'ru'
        ? 'WetlandEar: акустический мониторинг заповедников'
        : l === 'kk' ? 'WetlandEar: қорықтардың акустикалық мониторингі' : 'WetlandEar: acoustic monitoring for nature reserves';
      window.dispatchEvent(new CustomEvent('we:lang', { detail: l }));
    },
    set: function (l) {
      if (l === WE.lang) return;
      WE.lang = l;
      try { localStorage.setItem(KEY, l); } catch (e) {}
      var m = document.getElementById('main');
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!m || reduce) { WE.apply(); return; }
      m.classList.add('swap');
      setTimeout(function () { WE.apply(); m.classList.remove('swap'); }, 160);
    }
  };
})();
