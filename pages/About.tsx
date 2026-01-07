
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-lebanese-stone min-h-screen">
      <section className="bg-lebanese-green text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-8">عقارات الضاحية: <span className="text-lebanese-bronze">إرث من الثقة</span></h1>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              تأسست شركتنا لتكون الجسر الموثوق بين الحلم والحقيقة، مقدمين خبرتنا الطويلة في السوق اللبناني لخدمة عملائنا بأعلى معايير النزاهة.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 hidden lg:block">
           <img src="https://picsum.photos/seed/arch/600/1000" className="w-full h-full object-cover grayscale" alt="Beirut Architecture" />
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/team/800/800" 
              className="rounded-3xl shadow-2xl relative z-10" 
              alt="Our Team" 
            />
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-lebanese-bronze/10 rounded-3xl -z-0"></div>
            <div className="absolute top-10 left-10 bg-white p-8 rounded-2xl shadow-xl z-20 border border-lebanese-bronze/10">
              <div className="text-5xl font-extrabold text-lebanese-green mb-2">+15</div>
              <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">عاماً من الريادة</div>
            </div>
          </div>
          
          <div>
            <span className="text-lebanese-bronze font-bold text-lg mb-4 block">من نحن</span>
            <h2 className="text-4xl font-extrabold text-lebanese-green mb-8">خبرة محلية بمعايير عالمية</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-loose">
              <p>
                انطلقت شركة <strong>عقارات الضاحية</strong> في قلب العاصمة بيروت، حاملة رؤية واضحة لتنظيم السوق العقاري وتقديم خدمات استشارية مبنية على حقائق وأرقام دقيقة.
              </p>
              <p>
                نحن لسنا مجرد وسطاء، نحن شركاء نجاح لعملائنا. سواء كنت تبحث عن منزل عائلي، أو مكتب لعملك، أو فرصة استثمارية واعدة، فإن فريقنا المختص يكرس كل طاقته لضمان حصولك على أفضل صفقة ممكنة.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-lebanese-stone rounded-lg flex items-center justify-center text-2xl">🏆</div>
                  <div>
                    <h4 className="font-extrabold text-lebanese-green mb-1">الريادة</h4>
                    <p className="text-sm">نحتل مراكز متقدمة في حجم المبيعات العقارية في المنطقة.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-lebanese-stone rounded-lg flex items-center justify-center text-2xl">✨</div>
                  <div>
                    <h4 className="font-extrabold text-lebanese-green mb-1">الجودة</h4>
                    <p className="text-sm">نختار عقاراتنا بعناية لضمان القيمة المضافة لعملائنا.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lebanese-stone py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-lebanese-green mb-16">كلمة رئيس مجلس الإدارة</h2>
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl text-lebanese-bronze opacity-20 mb-[-30px]">"</div>
            <p className="text-2xl italic leading-relaxed text-gray-700 font-medium mb-10">
              إن ثقة المواطن اللبناني هي أثمن ما نملك. في ظل كل التحديات، يبقى الاستثمار العقاري هو الملاذ الآمن والضمانة الحقيقية للمستقبل، ونحن هنا لنكون الضامن لهذه الثقة.
            </p>
            <div className="h-px w-24 bg-lebanese-bronze mx-auto mb-6"></div>
            <h4 className="text-xl font-extrabold text-lebanese-green">المدير العام</h4>
            <p className="text-lebanese-bronze font-bold">عقارات الضاحية</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
