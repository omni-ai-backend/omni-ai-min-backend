
const { setCORS, readBody } = require('./_helpers.js');

// Minimal in-memory KB (seed). Replace with RAG connector later.
const KB = {
  en: {
    omni: "Omnipreneurship (3-5-7): 3 Principles (Giving, Earning, Sustaining); 5 Values (Integrity, Forward Thinking, Teamwork, Respect, Passion); 7 Golden Rules for disciplined execution. It anchors Al‑Dabbagh culture and strategy.",
    gpi: "GPI: turnkey power generation, EPC, O&M, relocations and upgrades. Rapid modular Balance‑of‑Plant developed with Interlink Power. Sectors: utilities, oil & gas, communities. Projects and MEP services across KSA.",
    rsi: "Red Sea International (RSI): modular construction (temporary/permanent), integrated facility management and MEP. Notable: NEOM camps, Al‑Ula Film Camp, MDLBEAST, Baker Hughes. Sustainability via off‑site fabrication and reusable modules.",
    tanmiah: "Tanmiah Food Company: poultry and protein portfolio with regional reach; synergies with FPS for flexible packaging, shelf‑life and brand consistency.",
    fps: "First Flexible Packaging Solutions (FPS): flexible packaging for food and industry; supports Tanmiah and other brands with high‑barrier films and printing.",
    petromin: "Petromin: nationwide automotive services (Express, AutoCare, dealerships) and EV charging via Electromin — enabling Vision 2030 mobility and sustainability.",
    barq: "Barq Systems: systems integrator delivering cloud, cybersecurity, infrastructure, networking and enterprise solutions in the region.",
    handbook: "IPD‑GPI Handbook (Sick Leave): within a one‑year window — 30 days full pay, next 30 at 75%, next 30 unpaid. Doctor’s certificate + HR procedures required.",
    connect: "Cross‑company value: FPS × Tanmiah (packaging + food); RSI × GPI (MEP + power for camps/remote sites); Petromin × Tanmiah (cold chain fleet services); Barq × all (IT, security, cloud)."
  },
  ar: {
    omni: "الأومنبرنورشِب (3‑5‑7): 3 مبادئ (العطاء، الكسب، الاستدامة)؛ 5 قيم (النزاهة، التفكير المستقبلي، العمل الجماعي، الاحترام، الشغف)؛ 7 قواعد ذهبية للتنفيذ المنضبط. هذا الإطار يوجّه ثقافة واستراتيجية مجموعة الدباغ.",
    gpi: "‏GPI: إنشاء وتشغيل وصيانة محطات الطاقة وحلول EPC وإعادة التوطين والتحديث. تسليم سريع لوحدات التوازن بالشراكة مع Interlink Power. القطاعات: المرافق، النفط والغاز، المجتمعات. وخدمات MEP.",
    rsi: "ريد سي إنترناشونال: إنشاءات معيارية (مؤقتة ودائمة)، إدارة مرافق وخدمات MEP. مشاريع بارزة: نيوم، فيلم كامب العلا، MDLBEAST، بيكر هيوز. تركيز على الاستدامة عبر التصنيع خارج الموقع.",
    tanmiah: "تنمية للأغذية: محفظة دواجن وبروتين؛ تكامل مع FPS في التغليف المرن لزيادة العمر التخزيني والهوية.",
    fps: "‏FPS: تغليف مرن لقطاع الغذاء والصناعة؛ يدعم تنمية وغيرها بأفلام عالية الحاجز والطباعة.",
    petromin: "بترومين: خدمات سيارات وطنية (إكسبريس، أوتوكير، وكلاءات) وشحن المركبات الكهربائية عبر إلكترومين — بما يدعم رؤية 2030.",
    barq: "بارق سيستمز: تكامل أنظمة وحلول سحابة وأمن سيبراني وبُنى تحتية وشبكات للمؤسسات.",
    handbook: "دليل IPD‑GPI (الإجازة المرضية): خلال سنة — 30 يوماً براتب كامل، ثم 30 بنسبة 75%، ثم 30 بدون راتب. يتطلب تقريراً طبياً وإجراءات الموارد البشرية.",
    connect: "قيمة مشتركة: FPS × تنمية، RSI × GPI، بترومين × تنمية (أسطول مبرد)، بارق × الجميع (تقنية وأمن)."
  }
};

function pickKey(q){
  const t = q.toLowerCase();
  if(t.includes('gpi')) return 'gpi';
  if(t.includes('rsi') || t.includes('red sea')) return 'rsi';
  if(t.includes('tanmiah')) return 'tanmiah';
  if(t.includes('fps') || t.includes('flexible packaging')) return 'fps';
  if(t.includes('petromin') || t.includes('electromin')) return 'petromin';
  if(t.includes('barq')) return 'barq';
  if(t.includes('sick') || t.includes('leave') || t.includes('إجازة') || t.includes('مرض')) return 'handbook';
  if(t.includes('connect') || t.includes('synergy') || t.includes('synergies') || t.includes('تكامل')) return 'connect';
  return 'omni';
}

async function chatHandler(req, res){
  setCORS(res);
  if(req.method === 'OPTIONS'){ res.statusCode=200; return res.end(); }
  if(req.method !== 'POST'){
    res.statusCode = 405;
    res.setHeader('Content-Type','application/json; charset=utf-8');
    return res.end(JSON.stringify({ error:'Use POST', example:{ prompt:'What does GPI do?', lang:'en' } }));
  }
  const raw = await readBody(req);
  let data = {};
  try{ data = JSON.parse(raw||'{}'); } catch(e){}
  const prompt = String(data.prompt||'').trim();
  const lang = (String(data.lang||'en').toLowerCase()==='ar') ? 'ar':'en';

  const key = pickKey(prompt||'');
  const answer = (KB[lang] && KB[lang][key]) || KB['en'][key];

  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.statusCode = 200;
  res.end(JSON.stringify({
    answer,
    key,
    lang,
    meta: { source: 'kb-seed', time: new Date().toISOString() }
  }));
}

module.exports = (req, res)=> chatHandler(req, res);
module.exports.chatHandler = chatHandler;
