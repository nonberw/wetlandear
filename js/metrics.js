/* Renders data/metrics.json. No framework. Language: the site's own choice (localStorage we-lang), switchable here. */
(function () {
  'use strict';
  var T = {
    ru: {
      eyebrow: 'Честные цифры', h1: 'Насколько модель WetlandEar точнее BirdNET',
      lead: 'Мы проверяем не на тех записях, на которых учили. Каждая запись попадает либо в обучение, либо в проверку, но никогда в обе части сразу.',
      win: 'Верно по 3-секундным фрагментам', rec: 'Верно по записи целиком', vs: 'BirdNET отдельно, тот же список видов, без фильтра места', species: 'видов', recs: 'записей', wins: 'фрагментов',
      hcal: 'Можно ли верить проценту уверенности', ncal: 'Когда модель показывает 0,9 и выше, она права почти всегда. Когда 0,3, права примерно в 40% случаев. Поэтому приложение подставляет вид само только от 0,5, а ниже лишь предлагает.',
      conf: 'уверенность', right: 'верно', share: 'фрагментов',
      hsp: 'По видам', nsp: 'Доля фрагментов, где вид назван верно. Серым показано, сколько называет верно BirdNET. Если у BirdNET нет такого вида, у него 0%.', search: 'Найти вид', sh: 'По точности', sg: 'По выигрышу над BirdNET', sn: 'По числу записей',
      th: ['Вид', 'Записей', 'WetlandEar', 'BirdNET'], nobn: 'нет в BirdNET', few: 'мало данных',
      hm: 'Как это измерено и что нельзя утверждать',
      method: ['<b>Данные.</b> Записи с Xeno-canto и iNaturalist (только открытые лицензии: без запрета на производные работы, у iNaturalist только CC0, CC BY и CC BY-SA), птицы водоёмов и степей Казахстана. По каждому виду от 2 до 85 записей, всего более 9 800, 270 видов. Для устойчивости к шуму каждый фрагмент дополнительно смешивали с шорохом камыша, ветром, водой, дождём, фоном полевых записей и пением других птиц.', '<b>Проверка.</b> Пятикратная перекрёстная проверка с разбиением по записям: ни один фрагмент проверочной записи не участвует в обучении.', '<b>Что сравниваем.</b> BirdNET V2.4 «как есть», но только по тому же списку видов и без фильтра по местности: так сравнение честно для записей со всего мира. Наша модель: небольшой классификатор на «отпечатках» BirdNET плюс небольшой вклад оценок самой BirdNET и калибровка уверенности.', '<b>Поправка (октябрь 2026).</b> Раньше здесь стояла цифра BirdNET 56,3% (для предыдущей версии). Она была занижена: фильтр по местности, настроенный на одну точку, отсекал 20 видов, которые BirdNET знает, и для них его точность считалась нулевой. Честное сравнение для той версии: 61,1% против 74,2%. Сейчас показаны цифры новой версии с исправленным сравнением.', '<b>Ограничения.</b> Записи Xeno-canto обычно чище полевых, записи iNaturalist ближе к полевым, а шум в проверке смоделирован. Настоящий камыш и ветер могут вести себя иначе, поэтому в поле точность может быть ниже. Записи одного наблюдателя на iNaturalist могут попасть и в обучение, и в проверку одного разбиения, поэтому цифры на iNaturalist могут быть слегка завышены. Для видов с малым числом записей цифры менее надёжны. Приложение всегда просит человека подтвердить вид.', '<b>Лицензии.</b> Модели BirdNET и записи Xeno-canto и iNaturalist используются в некоммерческих исследовательских целях.'],
      hnz: 'А если вокруг шум: камыш, ветер, вода', nnz: 'Те же записи, но смешанные с шумом: шорох камыша, ветер, вода, дождь, реальный фон полевых записей, пение других птиц. Проверка снова на записях, которых модель не видела. Мы специально обучаем модель на таких смесях.',
      nzclean: 'Чистые записи', nznoisy: 'Шумные записи', nzbn: 'BirdNET', nzwe: 'WetlandEar', nzcol: ['Что мешает', 'Фрагментов', 'WetlandEar', 'BirdNET'], nzcol2: ['Насколько громкий шум', 'Фрагментов', 'WetlandEar', 'BirdNET'],
      types: { reeds: 'Шорох камыша', wind: 'Ветер', water: 'Вода', rain: 'Дождь', bg: 'Фон полевых записей', chorus: 'Поют другие птицы', mix: 'Два шума сразу' }, snr: 'сигнал сильнее шума на {a} дБ',
      hsrc: 'Два источника записей', nsrc: 'Один и тот же тест отдельно для записей Xeno-canto (обычно чище) и iNaturalist (чаще полевые, с телефонов). Строки с пометкой «без iNaturalist» показывают ту же модель, обученную без записей iNaturalist: так видно, что дали эти записи.', srccol: ['Тестовые записи', 'Фрагментов', 'WetlandEar', 'BirdNET'], srcn: { xc: 'Xeno-canto, чистые записи', inat: 'iNaturalist, чистые записи', inat0: 'iNaturalist, чистые; модель без iNaturalist', inatn: 'iNaturalist, с шумом', inatn0: 'iNaturalist, с шумом; модель без iNaturalist' },
      foot: 'Обновлено {d}. Приложение: app.wetlandear.tech'
    },
    kk: {
      eyebrow: 'Адал сандар', h1: 'WetlandEar моделі BirdNET-тен қаншалықты дәлірек',
      lead: 'Біз модельді оқытқан жазбаларда тексермейміз. Әр жазба не оқытуға, не тексеруге түседі, ешқашан екеуіне бірдей түспейді.',
      win: '3 секундтық үзінділер бойынша дұрыс', rec: 'Жазба бойынша толық дұрыс', vs: 'Жалғыз BirdNET, сол түрлер тізімі, жер сүзгісіз', species: 'түр', recs: 'жазба', wins: 'үзінді',
      hcal: 'Сенімділік пайызына сенуге бола ма', ncal: 'Модель 0,9 және одан жоғары көрсеткенде, ол дерлік әрқашан дұрыс. 0,3 болғанда шамамен 40% жағдайда дұрыс. Сондықтан қолданба түрді 0,5-тен бастап өзі қояды, одан төменде тек ұсынады.',
      conf: 'сенімділік', right: 'дұрыс', share: 'үзінді',
      hsp: 'Түрлер бойынша', nsp: 'Түр дұрыс аталған үзінділер үлесі. Сұр түспен BirdNET қаншалықты дұрыс атайтыны көрсетілген. BirdNET-те мұндай түр болмаса, оның нәтижесі 0%.', search: 'Түрді іздеу', sh: 'Дәлдік бойынша', sg: 'BirdNET-тен артықшылық бойынша', sn: 'Жазба саны бойынша',
      th: ['Түр', 'Жазба', 'WetlandEar', 'BirdNET'], nobn: 'BirdNET-те жоқ', few: 'дерек аз',
      hm: 'Қалай өлшенді және нені айта алмаймыз',
      method: ['<b>Деректер.</b> Xeno-canto және iNaturalist жазбалары (тек ашық лицензиялар: туынды жұмыстарға тыйым салынбаған, iNaturalist үшін тек CC0, CC BY және CC BY-SA), Қазақстандағы су мен дала құстары. Әр түрге 2-ден 85-ке дейін жазба, барлығы 9 800-ден астам, 270 түр. Шуға төзімділік үшін әр үзінді қосымша қамыс сыбдырымен, желмен, сумен, жаңбырмен, далалық жазбалардың фонымен және басқа құстардың әнімен араластырылды.', '<b>Тексеру.</b> Жазбалар бойынша бөлінген бес еселі айқас тексеру: тексеру жазбасының ешбір үзіндісі оқытуға қатыспайды.', '<b>Нені салыстырамыз.</b> BirdNET V2.4 «сол күйінде», бірақ тек сол түрлер тізімі бойынша және жергілікті жер сүзгісіз: бұл бүкіл әлемнен алынған жазбалар үшін әділ салыстыру. Біздің модель: BirdNET «іздері» бойынша шағын классификатор, BirdNET-тің өз бағасының шағын үлесі және сенімділікті калибрлеу.', '<b>Түзету (2026 жылғы қазан).</b> Бұрын мұнда BirdNET үшін 56,3% көрсеткіші тұрды (алдыңғы нұсқа үшін). Ол төмендетілген еді: бір нүктеге бапталған жергілікті жер сүзгісі BirdNET білетін 20 түрді алып тастады, және олар үшін оның дәлдігі нөл деп есептелді. Сол нұсқа үшін әділ салыстыру: 61,1% қарсы 74,2%. Қазір салыстыруы түзетілген жаңа нұсқаның сандары көрсетілген.', '<b>Шектеулер.</b> Xeno-canto жазбалары әдетте далалық дыбыстан таза, iNaturalist жазбалары далаға жақынырақ, ал тексерудегі шу модельденген. Нақты қамыс пен жел басқаша болуы мүмкін, сондықтан далада дәлдік төмен болуы мүмкін. iNaturalist-тегі бір бақылаушының жазбалары бір бөлудің оқыту және тексеру бөліктеріне де түсуі мүмкін, сондықтан iNaturalist бойынша сандар сәл жоғары болуы мүмкін. Жазбасы аз түрлер үшін сандар сенімділігі аз. Қолданба түрді растауды әрқашан адамнан сұрайды.', '<b>Лицензиялар.</b> BirdNET модельдері мен Xeno-canto және iNaturalist жазбалары коммерциялық емес зерттеу мақсатында пайдаланылады.'],
      hnz: 'Айналада шу болса ше: қамыс, жел, су', nnz: 'Дәл сол жазбалар, бірақ шумен араласқан: қамыс сыбдыры, жел, су, жаңбыр, далалық жазбалардың нақты фоны, басқа құстардың әні. Тексеру модель көрмеген жазбаларда қайта жүргізілді. Модельді арнайы осындай қоспаларда оқытамыз.',
      nzclean: 'Таза жазбалар', nznoisy: 'Шулы жазбалар', nzbn: 'BirdNET', nzwe: 'WetlandEar', nzcol: ['Не кедергі жасайды', 'Үзінді', 'WetlandEar', 'BirdNET'], nzcol2: ['Шу қаншалықты қатты', 'Үзінді', 'WetlandEar', 'BirdNET'],
      types: { reeds: 'Қамыс сыбдыры', wind: 'Жел', water: 'Су', rain: 'Жаңбыр', bg: 'Далалық жазбалар фоны', chorus: 'Басқа құстар ән салады', mix: 'Екі шу қатар' }, snr: 'сигнал шудан {a} дБ қаттырақ',
      hsrc: 'Жазбалардың екі көзі', nsrc: 'Дәл сол тест Xeno-canto (әдетте таза) және iNaturalist (көбіне далалық, телефоннан) жазбалары үшін бөлек. «iNaturalist-сіз» белгісі бар жолдар iNaturalist жазбаларынсыз оқытылған сол модельді көрсетеді: осы жазбалар не бергені көрінеді.', srccol: ['Тест жазбалары', 'Үзінді', 'WetlandEar', 'BirdNET'], srcn: { xc: 'Xeno-canto, таза жазбалар', inat: 'iNaturalist, таза жазбалар', inat0: 'iNaturalist, таза; модель iNaturalist-сіз', inatn: 'iNaturalist, шумен', inatn0: 'iNaturalist, шумен; модель iNaturalist-сіз' },
      foot: 'Жаңартылған {d}. Қолданба: app.wetlandear.tech'
    },
    en: {
      eyebrow: 'Honest numbers', h1: 'How much more accurate WetlandEar is than BirdNET',
      lead: 'We never test on the recordings we trained on. Each recording goes either to training or to testing, never to both.',
      win: 'Correct on 3-second fragments', rec: 'Correct on a whole recording', vs: 'BirdNET alone, same species list, no location filter', species: 'species', recs: 'recordings', wins: 'fragments',
      hcal: 'Can you trust the confidence number', ncal: 'When the model shows 0.9 or more it is almost always right. At 0.3 it is right about 40% of the time. That is why the app fills a species in by itself only from 0.5 and below that only suggests.',
      conf: 'confidence', right: 'right', share: 'of fragments',
      hsp: 'By species', nsp: 'Share of fragments where the species is named correctly. Grey shows how often BirdNET names it correctly. If BirdNET has no such species it scores 0%.', search: 'Find a species', sh: 'By accuracy', sg: 'By gain over BirdNET', sn: 'By recordings',
      th: ['Species', 'Recordings', 'WetlandEar', 'BirdNET'], nobn: 'not in BirdNET', few: 'little data',
      hm: 'How it was measured and what we cannot claim',
      method: ['<b>Data.</b> Xeno-canto and iNaturalist recordings (open licenses only: no-derivatives excluded, and for iNaturalist only CC0, CC BY and CC BY-SA) of wetland and steppe birds of Kazakhstan. From 2 to 85 recordings per species, more than 9,800 in total, 270 species. For robustness to noise each fragment was also mixed with reed rustle, wind, water, rain, field background and other birds singing.', '<b>Testing.</b> Five-fold cross-validation split by recording: no fragment of a test recording is ever used for training.', '<b>What is compared.</b> BirdNET V2.4 as it is, but only over the same list of species and without a location filter, which is the fair comparison for recordings from all over the world. Our model: a small classifier on BirdNET fingerprints plus a small contribution of the BirdNET scores and confidence calibration.', '<b>Correction (October 2026).</b> This page used to show a BirdNET figure of 56.3% (for the previous version). It was too low: a location filter set to a single point switched off 20 species that BirdNET knows, so its accuracy on them was counted as zero. The fair comparison for that version was 61.1% against 74.2%. The numbers shown now are for the new version with the corrected comparison.', '<b>Limits.</b> Xeno-canto recordings are usually cleaner than field audio, iNaturalist recordings are closer to the field, and the noise in testing is simulated. Real reeds and wind can behave differently, so field accuracy may be lower. Recordings of one observer on iNaturalist can fall into both the training and the testing part of one split, so the iNaturalist numbers may be slightly high. For species with few recordings the numbers are less reliable. The app always asks a person to confirm the species.', '<b>Licenses.</b> BirdNET models and Xeno-canto and iNaturalist recordings are used for non-commercial research.'],
      hnz: 'What if it is noisy: reeds, wind, water', nnz: 'The same recordings mixed with noise: reed rustle, wind, water, rain, real field background, other birds singing. Tested again on recordings the model has not seen. We deliberately train the model on such mixtures.',
      nzclean: 'Clean recordings', nznoisy: 'Noisy recordings', nzbn: 'BirdNET', nzwe: 'WetlandEar', nzcol: ['What interferes', 'Fragments', 'WetlandEar', 'BirdNET'], nzcol2: ['How loud the noise is', 'Fragments', 'WetlandEar', 'BirdNET'],
      types: { reeds: 'Reed rustle', wind: 'Wind', water: 'Water', rain: 'Rain', bg: 'Field background', chorus: 'Other birds singing', mix: 'Two noises at once' }, snr: 'signal louder than noise by {a} dB',
      hsrc: 'Two sources of recordings', nsrc: 'The same test shown separately for Xeno-canto recordings (usually cleaner) and iNaturalist recordings (more often field recordings, from phones). Rows marked without iNaturalist show the same model trained without the iNaturalist recordings, so you can see what those recordings added.', srccol: ['Test recordings', 'Fragments', 'WetlandEar', 'BirdNET'], srcn: { xc: 'Xeno-canto, clean recordings', inat: 'iNaturalist, clean recordings', inat0: 'iNaturalist, clean; model without iNaturalist', inatn: 'iNaturalist, with noise', inatn0: 'iNaturalist, with noise; model without iNaturalist' },
      foot: 'Updated {d}. App: app.wetlandear.tech'
    }
  };
  var lang = (function () { try { var s = localStorage.getItem('we-lang'); if (s === 'ru' || s === 'en' || s === 'kk') return s; } catch (e) { } var nl = (navigator.language || '').toLowerCase(); return nl.indexOf('kk') === 0 ? 'kk' : nl.indexOf('ru') === 0 ? 'ru' : 'en'; })();
  var data = null, sortBy = 'head', filter = '';
  function $(s) { return document.querySelector(s); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function pct(x) { return (x * 100).toFixed(x >= .995 || x < .005 ? 0 : 1).replace('.', lang !== 'en' ? ',' : '.') + '%'; }
  function pct0(x) { return Math.round(x * 100) + '%'; }
  function bar(w, cls) { var i = el('i', cls); i.style.setProperty('--w', Math.round(w * 100) + '%'); return i; }

  function render() {
    var t = T[lang]; document.documentElement.lang = lang; document.title = 'WetlandEar: ' + (lang === 'ru' ? 'точность модели' : lang === 'kk' ? 'модель дәлдігі' : 'model accuracy');
    $('#eyebrow').textContent = t.eyebrow; $('#h1').textContent = t.h1; $('#lead').textContent = t.lead;
    $('#h-cal').textContent = t.hcal; $('#n-cal').textContent = t.ncal; $('#h-sp').textContent = t.hsp; $('#n-sp').textContent = t.nsp; $('#h-m').textContent = t.hm;
    $('#q').placeholder = t.search; var sb = document.querySelectorAll('#sort button'); sb[0].textContent = t.sh; sb[1].textContent = t.sg; sb[2].textContent = t.sn;
    [].forEach.call(document.querySelectorAll('.lang button'), function (b) { b.classList.toggle('on', b.dataset.l === lang); });
    var m = $('#method'); m.innerHTML = ''; t.method.forEach(function (h) { var p = el('p'); p.innerHTML = h; m.appendChild(p); });
    if (!data) return;
    var hero = $('#hero'); hero.innerHTML = '';
    var w = data.window_accuracy;
    [[t.win, w.wetlandear, w.birdnet], [t.rec, data.recording_accuracy, null]].forEach(function (c) {
      var card = el('div', 'card'); card.appendChild(el('div', 'big', pct(c[1]))); card.appendChild(el('div', 'lab', c[0]));
      if (c[2] != null) { card.appendChild(el('div', 'vs', t.vs + ': ' + pct(c[2]))); var b = el('div', 'bar2'); b.appendChild(bar(c[1])); b.appendChild(bar(c[2], 'g')); card.appendChild(b); }
      hero.appendChild(card);
    });
    var c3 = el('div', 'card'); c3.appendChild(el('div', 'big', String(data.species))); c3.appendChild(el('div', 'lab', t.species + ' · ' + data.recordings + ' ' + t.recs + ' · ' + data.windows.toLocaleString(lang !== 'en' ? 'ru-RU' : 'en-US') + ' ' + t.wins)); hero.appendChild(c3);
    var cal = $('#cal'); cal.innerHTML = '';
    data.calibration.forEach(function (r) {
      var row = el('div', 'calrow'); row.appendChild(el('div', 't', t.conf + ' ' + r.lo.toFixed(2).replace('.', lang !== 'en' ? ',' : '.') + '–' + r.hi.toFixed(2).replace('.', lang !== 'en' ? ',' : '.')));
      var b = el('div', 'b'); b.style.setProperty('--w', Math.round(r.right * 100) + '%'); row.appendChild(b); row.appendChild(el('div', 'v', pct0(r.right) + ' ' + t.right)); cal.appendChild(row);
    });
    table(); noise(); sources();
    $('#foot').textContent = t.foot.replace('{d}', data.generated);
  }
  function simpleTable(box, cols, rows) {
    box.innerHTML = '';
    var h = el('div', 'tr h'); cols.forEach(function (x, i) { h.appendChild(el('div', i === 1 ? 'r' : '', x)); }); box.appendChild(h);
    rows.forEach(function (r) {
      var tr = el('div', 'tr'), n = el('div', 'n', r.name); tr.appendChild(n); tr.appendChild(el('div', 'r', r.n.toLocaleString(lang !== 'en' ? 'ru-RU' : 'en-US')));
      var a = el('div', 'mini'); a.appendChild(bar(r.we)); a.appendChild(el('b', '', pct0(r.we))); tr.appendChild(a);
      var b = el('div', 'mini g'); b.appendChild(bar(r.bn, '')); b.appendChild(el('b', '', pct0(r.bn))); tr.appendChild(b); box.appendChild(tr);
    });
  }
  function sources() {
    var sec = $('#sec-src'), t = T[lang], s = data.by_source; if (!s) { sec.hidden = true; return; }
    sec.hidden = false; $('#h-src').textContent = t.hsrc; $('#n-src').textContent = t.nsrc; var n = t.srcn;
    simpleTable($('#src-tbl'), t.srccol, [
      { name: n.xc, n: s.clean_xc.windows, we: s.clean_xc.trained_on_everything, bn: s.clean_xc.birdnet_restricted },
      { name: n.inat, n: s.clean_inat.windows, we: s.clean_inat.trained_on_everything, bn: s.clean_inat.birdnet_restricted },
      { name: n.inat0, n: s.clean_inat.windows, we: s.clean_inat.trained_without_inat, bn: s.clean_inat.birdnet_restricted },
      { name: n.inatn, n: s.noisy_inat.windows, we: s.noisy_inat.trained_on_everything, bn: s.noisy_inat.birdnet_restricted },
      { name: n.inatn0, n: s.noisy_inat.windows, we: s.noisy_inat.trained_without_inat, bn: s.noisy_inat.birdnet_restricted }]);
  }
  function noise() {
    var sec = $('#sec-nz'), t = T[lang], rb = data.robustness; if (!rb) { sec.hidden = true; return; }
    sec.hidden = false; $('#h-nz').textContent = t.hnz; $('#n-nz').textContent = t.nnz;
    var hero = $('#nz-hero'); hero.innerHTML = '';
    [[t.nzclean, rb.summary.clean], [t.nznoisy, rb.summary.noisy]].forEach(function (c) {
      var card = el('div', 'card'); card.appendChild(el('div', 'big', pct(c[1].clean_plus_noisy_head))); card.appendChild(el('div', 'lab', c[0]));
      card.appendChild(el('div', 'vs', t.nzbn + ': ' + pct(c[1].birdnet_restricted))); var b = el('div', 'bar2'); b.appendChild(bar(c[1].clean_plus_noisy_head)); b.appendChild(bar(c[1].birdnet_restricted, 'g')); card.appendChild(b); hero.appendChild(card);
    });
    simpleTable($('#nz-type'), t.nzcol, rb.by_noise_type.map(function (r) { return { name: t.types[r.type] || r.type, n: r.windows, we: r.with_noise, bn: r.birdnet }; }));
    simpleTable($('#nz-snr'), t.nzcol2, rb.by_snr.map(function (r) { return { name: t.snr.replace('{a}', (r.lo + '…' + r.hi).replace('-', '−')), n: r.windows, we: r.with_noise, bn: r.birdnet }; }));
  }
  function table() {
    var t = T[lang], tbl = $('#tbl'); tbl.innerHTML = '';
    var h = el('div', 'tr h'); t.th.forEach(function (x, i) { h.appendChild(el('div', i === 1 ? 'r' : '', x)); }); tbl.appendChild(h);
    var rows = data.per_species.filter(function (r) { var q = filter.toLowerCase(); return !q || (r.en + ' ' + r.ru + ' ' + r.sci).toLowerCase().indexOf(q) >= 0; });
    rows.sort(function (a, b) { return sortBy === 'gain' ? (b.head - b.birdnet) - (a.head - a.birdnet) : sortBy === 'n' ? b.recordings - a.recordings : b.head - a.head; });
    rows.forEach(function (r) {
      var tr = el('div', 'tr'), n = el('div', 'n'); n.appendChild(document.createTextNode((lang === 'ru' || lang === 'kk') && r.ru ? r.ru : r.en));
      if (!r.in_birdnet) n.appendChild(el('span', 'tag', t.nobn)); if (r.recordings < 5) n.appendChild(el('span', 'tag', t.few));
      n.appendChild(el('small', '', r.sci)); tr.appendChild(n); tr.appendChild(el('div', 'r', String(r.recordings)));
      var a = el('div', 'mini'); a.appendChild(bar(r.head)); a.appendChild(el('b', '', pct0(r.head))); tr.appendChild(a);
      var b = el('div', 'mini g'); b.appendChild(bar(r.birdnet, '')); b.appendChild(el('b', '', pct0(r.birdnet))); tr.appendChild(b);
      tbl.appendChild(tr);
    });
  }
  document.querySelector('.lang').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; lang = b.dataset.l; try { localStorage.setItem('we-lang', lang); } catch (x) { } render(); });
  $('#q').addEventListener('input', function () { filter = this.value; if (data) table(); });
  $('#sort').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; sortBy = b.dataset.s; [].forEach.call(this.children, function (x) { x.classList.toggle('on', x === b); }); if (data) table(); });
  render();
  fetch('data/metrics.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (j) { data = j; render(); }).catch(function () { $('#lead').textContent += ' …'; });
})();
