// Every word on the site, in both languages.

const en = {
  brand: 'LUNA',
  brandSub: 'Body Care',
  currency: 'JOD',
  nav: { shop: 'Shop', ritual: 'The Ritual', about: 'About', bag: 'Bag', menu: 'Menu', close: 'Close', order: 'Order on WhatsApp' },
  langSwitch: 'العربية',
  langShort: 'ع',

  preloader: 'Body care as beautiful as you',

  hero: {
    eyebrow: 'The LUNA gift set — 5 pieces',
    title: [{ text: 'Body care' }, { text: 'as beautiful' }, { text: 'as', em: 'you.' }],
    sub: 'A five-step ritual wrapped in our signature box. Choose your scent — the hair mist is on us.',
    cta: 'Add to bag',
    secondary: 'Discover the ritual',
    badge: 'Hair mist · Our gift to you · ',
    scroll: 'Scroll',
    choose: 'Your scent',
  },

  scents: {
    musk: {
      name: 'Pure Musk',
      mood: 'The quiet one',
      notes: ['Soft', 'Clean', 'Close to skin'],
      desc: 'A soft, clean musk that rests on the skin like a second layer of silk. Calm, warm and endlessly wearable — from your morning shower to the last hour of the night.',
    },
    fruity: {
      name: 'Sweetie Fruity',
      mood: 'The playful one',
      notes: ['Sweet', 'Juicy', 'Bright'],
      desc: 'A sweet, juicy fruit accord with a playful heart. Bright and joyful on the skin, it leaves a soft trail that makes everyone ask what you are wearing.',
    },
  },

  marquee: ['Pure Musk', 'Sweetie Fruity', 'Shower Gel', 'Body Scrub', 'Body Lotion', 'Whipped Body Butter', 'Hair Mist'],

  manifesto: {
    eyebrow: 'The LUNA ritual',
    text: 'Five steps, one scent, one beautiful box. Cleanse, polish, soften and seal — then let the scent follow you all day long. Because you are a moon, and you deserve it.',
  },

  collection: {
    eyebrow: 'The collection',
    title: [{ text: 'Choose' }, { text: 'your', em: 'scent' }],
    sub: 'Two moods, one ritual. Every set holds four full-size essentials and a hair mist, gifted.',
    pieces: '5 pieces · Hair mist gifted',
    add: 'Add to bag',
    added: 'Added',
    details: "What's inside",
  },

  inside: {
    eyebrow: 'Inside every box',
    title: [{ text: 'A ritual' }, { text: 'in five', em: 'steps' }],
    sub: 'Each piece carries the same scent, so every layer makes it last a little longer.',
    overview: 'Tap a step — or simply scroll.',
    step: 'Step',
    gift: 'Our gift',
  },

  products: {
    gel: {
      name: 'Shower Gel',
      tag: 'Refreshing shower experience',
      size: '150 ml · 5.1 fl.oz',
      verb: 'Cleanse',
      desc: 'Begin here. A silky gel that cleanses gently and leaves the skin fresh, soft and lightly scented.',
    },
    scrub: {
      name: 'Body Scrub',
      tag: 'Exfoliating experience',
      size: '250 g',
      verb: 'Polish',
      desc: 'Two to three times a week, massage over damp skin in slow circles to buff away dullness and reveal a smoother glow.',
    },
    lotion: {
      name: 'Body Lotion',
      tag: 'With niacinamide & ceramide',
      size: '150 ml · 5.1 fl.oz',
      verb: 'Hydrate',
      desc: 'A light lotion that sinks in fast. Niacinamide helps even the look of the skin while ceramides support its moisture barrier.',
    },
    butter: {
      name: 'Whipped Body Butter',
      tag: 'Pure shea & cocoa butters',
      size: '200 g',
      verb: 'Nourish',
      desc: 'Rich yet airy. Whipped shea and cocoa butters melt into the driest places — elbows, knees, heels — for softness that lasts.',
    },
    mist: {
      name: 'Hair Mist',
      tag: 'Nourishing · Moisturizing',
      size: '50 ml · 1.69 fl.oz',
      verb: 'Finish',
      desc: 'The final touch. A fine mist that adds softness and shine and lets your scent move with every strand. Included free in every set.',
    },
  },

  gift: {
    eyebrow: 'The signature box',
    title: [{ text: 'Wrapped' }, { text: 'to be', em: 'given.' }],
    text: 'Every set arrives in our kraft keepsake box, printed with the words we live by — ready to give, or to keep for yourself.',
    list: ['Four full-size essentials', 'A hair mist, our gift', 'The signature LUNA box'],
  },

  order: {
    eyebrow: 'Ordering',
    title: [{ text: 'From bag' }, { text: 'to your', em: 'door.' }],
    steps: [
      { title: 'Choose your scent', text: 'Pure Musk, Sweetie Fruity — or both.' },
      { title: 'Add your details', text: 'Name, phone and address. That is all.' },
      { title: 'Confirm on WhatsApp', text: 'Your order reaches us instantly and we confirm delivery with you.' },
    ],
    cta: 'Start your order',
  },

  final: {
    title: [{ text: 'Because you' }, { text: 'are a', em: 'moon.' }],
    sub: 'Find the scent that feels like you.',
  },

  footer: {
    tagline: 'Body care as beautiful as you.',
    explore: 'Explore',
    contact: 'Contact',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    rights: 'All rights reserved.',
    top: 'Back to top',
  },

  sticky: { add: 'Add to bag' },

  cart: {
    title: 'Your bag',
    steps: ['Bag', 'Details', 'Confirm'],
    empty: 'Your bag is empty',
    emptySub: 'Every set comes with a hair mist, on us.',
    continue: 'Continue shopping',
    meta: 'Gift set · 5 pieces',
    gift: 'Hair mist included as a gift',
    remove: 'Remove',
    qty: 'Quantity',
    upsell: 'Complete the duo',
    add: 'Add',
    subtotal: 'Total',
    delivery: 'Delivery is arranged with you on WhatsApp.',
    next: 'Continue to details',
    back: 'Back',
    detailsTitle: 'Delivery details',
    fields: {
      name: 'Full name',
      phone: 'Phone number',
      city: 'City',
      address: 'Area, street, building',
      notes: 'Notes (optional)',
    },
    required: 'Required',
    badPhone: 'Enter a valid phone number',
    send: 'Send order on WhatsApp',
    sentTitle: 'One last tap',
    sentText: 'Your order is waiting in WhatsApp — press send and we will confirm it with you.',
    reopen: 'Open WhatsApp again',
    done: 'Done — clear my bag',
    summary: 'Order summary',
  },

  wa: {
    hello: 'Hello LUNA 🌙 I would like to order:',
    set: 'set',
    giftNote: '(each set includes a gifted hair mist)',
    total: 'Total',
    name: 'Name',
    phone: 'Phone',
    city: 'City',
    address: 'Address',
    notes: 'Notes',
  },

  about: {
    eyebrow: 'About LUNA',
    title: [{ text: 'Named after' }, { text: 'the', em: 'moon.' }],
    sub: 'LUNA is body care made to feel like a gift — five steps in one scent, beautifully wrapped, for every woman who deserves to glow.',
    storyEyebrow: 'Our story',
    story: [
      'Every evening the moon shows up exactly as she is — sometimes a sliver, sometimes full, always luminous. That is the feeling we wanted to keep in a bottle.',
      'LUNA began with a simple belief: caring for your body should never feel like a chore. It should feel like being looked after. So we built a ritual of five — a shower gel, a scrub, a lotion, a whipped butter and a hair mist — each made to be layered, each carrying the same scent so it stays longer on your skin.',
      'Then we wrapped it in a box worth keeping, and wrote on it the words we want every woman to hear: because you are a moon, you deserve it.',
    ],
    quote: 'Because you are a moon — and the moon never apologises for shining.',
    beliefsEyebrow: 'What we believe',
    beliefsTitle: [{ text: 'Small luxuries,' }, { text: 'every', em: 'day.' }],
    beliefs: [
      { title: 'Made to be layered', text: 'Five products designed to work together, step after step, so each one makes the next feel even better.' },
      { title: 'A scent that stays', text: 'The same scent runs through every piece of the set. Layered, it lasts longer and follows you all day.' },
      { title: 'Wrapped as a gift', text: 'Our signature kraft box turns everyday care into a present — for someone you love, or for you.' },
      { title: 'Ingredients with purpose', text: 'Niacinamide and ceramide in our lotion. Pure shea and cocoa butters in our whipped butter.' },
    ],
    moodsTitle: [{ text: 'Two moods,' }, { text: 'one', em: 'moon.' }],
    moods: {
      musk: 'For calm mornings, clean sheets and skin that smells like comfort.',
      fruity: 'For bright days, sweet moments and a trail that turns heads.',
    },
    galleryEyebrow: 'In the details',
    gallery: ['The Pure Musk box', 'Pure Musk, all five', 'Sweetie Fruity, all five', 'The Sweetie Fruity box'],
    ctaTitle: [{ text: 'Find' }, { text: 'your', em: 'scent.' }],
    cta: 'Shop the collection',
  },
}

const ar = {
  brand: 'LUNA',
  brandSub: 'Body Care',
  currency: 'دينار',
  nav: { shop: 'المتجر', ritual: 'الطقوس', about: 'من نحن', bag: 'السلة', menu: 'القائمة', close: 'إغلاق', order: 'اطلبي عبر واتساب' },
  langSwitch: 'English',
  langShort: 'EN',

  preloader: 'لأنّكِ قمر، بتستاهلي',

  hero: {
    eyebrow: 'مجموعة لونا للهدايا — 5 قطع',
    title: [{ text: 'لأنّكِ قمر،' }, { text: 'بتستاهلي' }, { text: '', em: 'لونا.' }],
    sub: 'طقس عناية من خمس خطوات داخل علبتنا المميزة. اختاري عطركِ… وبخّاخ الشعر هديّة منّا.',
    cta: 'أضيفي إلى السلة',
    secondary: 'اكتشفي الطقوس',
    badge: 'بخّاخ الشعر · هديّتنا لكِ · ',
    scroll: 'مرّري',
    choose: 'عطركِ',
  },

  scents: {
    musk: {
      name: 'بيور مسك',
      mood: 'الهادئة',
      notes: ['ناعم', 'نظيف', 'قريب من البشرة'],
      desc: 'مسك ناعم ونظيف يستقرّ على البشرة كطبقة ثانية من الحرير. دافئ وهادئ، يرافقكِ من حمّام الصباح حتى آخر الليل.',
    },
    fruity: {
      name: 'سويتي فروتي',
      mood: 'المرِحة',
      notes: ['حلو', 'منعش', 'مُشرق'],
      desc: 'مزيج فاكهي حلو بقلبٍ مرِح. مُشرق ومُبهج على البشرة، ويترك أثراً ناعماً يجعل الجميع يسألكِ: شو حاطّة؟',
    },
  },

  marquee: ['بيور مسك', 'سويتي فروتي', 'شاور جل', 'بودي سكراب', 'بودي لوشن', 'زبدة الجسم المخفوقة', 'بخّاخ الشعر'],

  manifesto: {
    eyebrow: 'طقس لونا',
    text: 'خمس خطوات، عطر واحد، وعلبة واحدة جميلة. نظّفي، قشّري، رطّبي وغذّي — ثم دعي العطر يرافقكِ طوال اليوم. لأنّكِ قمر، وبتستاهلي.',
  },

  collection: {
    eyebrow: 'المجموعة',
    title: [{ text: 'اختاري' }, { text: '', em: 'عطركِ' }],
    sub: 'مزاجان وطقس واحد. في كل مجموعة أربعة منتجات بالحجم الكامل، وبخّاخ للشعر هديّة.',
    pieces: '5 قطع · بخّاخ الشعر هديّة',
    add: 'أضيفي إلى السلة',
    added: 'تمّت الإضافة',
    details: 'ماذا في العلبة',
  },

  inside: {
    eyebrow: 'داخل كل علبة',
    title: [{ text: 'طقس من' }, { text: 'خمس', em: 'خطوات' }],
    sub: 'كل قطعة تحمل العطر نفسه، فكل طبقة تجعله يدوم أطول قليلاً.',
    overview: 'اختاري خطوة… أو تابعي التمرير.',
    step: 'الخطوة',
    gift: 'هديّتنا',
  },

  products: {
    gel: {
      name: 'شاور جل',
      tag: 'تجربة استحمام منعشة',
      size: '150 مل',
      verb: 'تنظيف',
      desc: 'ابدئي من هنا. جل حريري ينظّف بلطف ويترك البشرة منتعشة وناعمة بلمسة عطر خفيفة.',
    },
    scrub: {
      name: 'بودي سكراب',
      tag: 'تجربة تقشير',
      size: '250 غ',
      verb: 'تقشير',
      desc: 'مرّتين إلى ثلاث أسبوعياً، دلّكيه على بشرة رطبة بحركات دائرية هادئة ليزيل البهتان ويكشف عن نعومة وإشراقة.',
    },
    lotion: {
      name: 'بودي لوشن',
      tag: 'بالنياسيناميد والسيراميد',
      size: '150 مل',
      verb: 'ترطيب',
      desc: 'لوشن خفيف يُمتصّ بسرعة. النياسيناميد يساعد على توحيد مظهر البشرة، والسيراميد يدعم حاجز الترطيب الطبيعي.',
    },
    butter: {
      name: 'زبدة الجسم المخفوقة',
      tag: 'زبدة الشيا والكاكاو الخالصة',
      size: '200 غ',
      verb: 'تغذية',
      desc: 'غنيّة وخفيفة في آنٍ معاً. زبدة الشيا والكاكاو المخفوقة تذوب على أكثر المناطق جفافاً — المرفقين والركبتين والكعبين — لنعومة تدوم.',
    },
    mist: {
      name: 'بخّاخ الشعر',
      tag: 'مغذٍّ ومرطّب',
      size: '50 مل',
      verb: 'اللمسة الأخيرة',
      desc: 'رذاذ ناعم يمنح شعركِ نعومة ولمعاناً، ويجعل عطركِ يتحرّك مع كل خصلة. مجاناً مع كل مجموعة.',
    },
  },

  gift: {
    eyebrow: 'العلبة المميزة',
    title: [{ text: 'مُغلّفة' }, { text: '', em: 'لتُهدى.' }],
    text: 'تصلكِ كل مجموعة في علبتنا الكرافت، مطبوعٌ عليها ما نؤمن به — جاهزة للإهداء، أو لتحتفظي بها لنفسكِ.',
    list: ['أربعة منتجات بالحجم الكامل', 'بخّاخ للشعر، هديّة منّا', 'علبة لونا المميزة'],
  },

  order: {
    eyebrow: 'الطلب',
    title: [{ text: 'من السلة' }, { text: 'إلى', em: 'بابكِ.' }],
    steps: [
      { title: 'اختاري عطركِ', text: 'بيور مسك أو سويتي فروتي… أو الاثنين معاً.' },
      { title: 'أضيفي بياناتكِ', text: 'الاسم ورقم الهاتف والعنوان. هذا كل شيء.' },
      { title: 'أكّدي عبر واتساب', text: 'يصلنا طلبكِ فوراً ونرتّب معكِ التوصيل.' },
    ],
    cta: 'ابدئي طلبكِ',
  },

  final: {
    title: [{ text: 'لأنّكِ' }, { text: '', em: 'قمر.' }],
    sub: 'اكتشفي العطر الذي يشبهكِ.',
  },

  footer: {
    tagline: 'عناية بالجسم… جميلة مثلكِ.',
    explore: 'تصفّحي',
    contact: 'تواصلي معنا',
    instagram: 'إنستغرام',
    whatsapp: 'واتساب',
    rights: 'جميع الحقوق محفوظة.',
    top: 'إلى الأعلى',
  },

  sticky: { add: 'أضيفي إلى السلة' },

  cart: {
    title: 'سلّتكِ',
    steps: ['السلة', 'البيانات', 'التأكيد'],
    empty: 'سلّتكِ فارغة',
    emptySub: 'كل مجموعة تأتي مع بخّاخ شعر، هديّة منّا.',
    continue: 'متابعة التسوّق',
    meta: 'مجموعة هدايا · 5 قطع',
    gift: 'تشمل بخّاخ الشعر هديّة',
    remove: 'إزالة',
    qty: 'الكمية',
    upsell: 'أكملي الثنائي',
    add: 'إضافة',
    subtotal: 'المجموع',
    delivery: 'نرتّب التوصيل معكِ عبر واتساب.',
    next: 'متابعة إلى البيانات',
    back: 'رجوع',
    detailsTitle: 'بيانات التوصيل',
    fields: {
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      city: 'المدينة',
      address: 'المنطقة، الشارع، البناية',
      notes: 'ملاحظات (اختياري)',
    },
    required: 'مطلوب',
    badPhone: 'أدخلي رقم هاتف صحيحاً',
    send: 'إرسال الطلب عبر واتساب',
    sentTitle: 'خطوة أخيرة',
    sentText: 'طلبكِ بانتظاركِ في واتساب — اضغطي إرسال وسنؤكّده معكِ.',
    reopen: 'فتح واتساب مجدداً',
    done: 'تم — أفرغي السلة',
    summary: 'ملخّص الطلب',
  },

  wa: {
    hello: 'مرحباً لونا 🌙 أودّ أن أطلب:',
    set: 'مجموعة',
    giftNote: '(كل مجموعة تشمل بخّاخ الشعر هديّة)',
    total: 'المجموع',
    name: 'الاسم',
    phone: 'الهاتف',
    city: 'المدينة',
    address: 'العنوان',
    notes: 'ملاحظات',
  },

  about: {
    eyebrow: 'عن لونا',
    title: [{ text: 'سُمّيت' }, { text: 'تيمّناً', em: 'بالقمر.' }],
    sub: 'لونا عناية بالجسم صُمّمت لتشعري أنها هديّة — خمس خطوات بعطر واحد، مُغلّفة بأناقة، لكل امرأة تستحق أن تتألّق.',
    storyEyebrow: 'حكايتنا',
    story: [
      'كل مساء يطلّ القمر كما هو — هلالاً أحياناً وبدراً أحياناً أخرى، لكنه مضيء دائماً. هذا هو الإحساس الذي أردنا أن نحفظه في زجاجة.',
      'بدأت لونا من فكرة بسيطة: العناية بجسمكِ لا يجب أن تكون واجباً، بل لحظة دلال. فصمّمنا طقساً من خمس خطوات — شاور جل، وسكراب، ولوشن، وزبدة مخفوقة، وبخّاخ للشعر — كلٌّ منها يُكمّل الآخر، وكلّها تحمل العطر نفسه ليدوم أطول على بشرتكِ.',
      'ثم غلّفناها في علبة تستحق الاحتفاظ بها، وكتبنا عليها الكلمات التي نريد لكل امرأة أن تسمعها: لأنّكِ قمر، بتستاهلي.',
    ],
    quote: 'لأنّكِ قمر… والقمر لا يعتذر عن ضيائه.',
    beliefsEyebrow: 'ما نؤمن به',
    beliefsTitle: [{ text: 'رفاهية صغيرة،' }, { text: 'كل', em: 'يوم.' }],
    beliefs: [
      { title: 'مصمّمة لتُستخدم معاً', text: 'خمسة منتجات تعمل معاً خطوة بعد خطوة، فتجعل كل واحدة منها التي تليها أجمل.' },
      { title: 'عطر يدوم', text: 'العطر نفسه في كل قطعة من المجموعة؛ ومع الطبقات يدوم أطول ويرافقكِ طوال اليوم.' },
      { title: 'مُغلّفة كهديّة', text: 'علبتنا الكرافت المميزة تحوّل العناية اليومية إلى هديّة — لمن تحبّين، أو لكِ أنتِ.' },
      { title: 'مكوّنات لها هدف', text: 'النياسيناميد والسيراميد في اللوشن، وزبدة الشيا والكاكاو الخالصة في الزبدة المخفوقة.' },
    ],
    moodsTitle: [{ text: 'مزاجان،' }, { text: 'وقمر', em: 'واحد.' }],
    moods: {
      musk: 'لصباحات هادئة، وشراشف نظيفة، وبشرة رائحتها راحة.',
      fruity: 'لأيام مُشرقة، ولحظات حلوة، وأثر يلفت الأنظار.',
    },
    galleryEyebrow: 'في التفاصيل',
    gallery: ['علبة بيور مسك', 'بيور مسك، القطع الخمس', 'سويتي فروتي، القطع الخمس', 'علبة سويتي فروتي'],
    ctaTitle: [{ text: 'اكتشفي' }, { text: '', em: 'عطركِ.' }],
    cta: 'تسوّقي المجموعة',
  },
}

export const DICT = { en, ar }
