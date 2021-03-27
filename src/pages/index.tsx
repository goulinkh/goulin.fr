import React from 'react';

import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
// eslint-disable-next-line import/no-extraneous-dependencies
import rallax from 'rallax.js';
import { Header } from 'src/components/Header';
import { Meta } from 'src/layout/Meta';

const Index = () => {
  const { t } = useTranslation('home-page');
  const { t: commonT } = useTranslation('common');
  if (process.browser) {
    rallax('.parallax-rocket', { speed: 0.25 });
    rallax('.parallax-lightning', { speed: 0.17 });
    rallax('.parallax-lamp', { speed: 0.15 });
    rallax('.parallax-finance', { speed: 0.1 });
    rallax('.parallax-shopping', { speed: 0.1 });
  }

  return (
    <>
      <Meta description={commonT('description')} />
      <div className="glass-bg lg:max-h-screen h-[1000px]">
        <Header />
        <section className="container main grid lg:grid-cols-2 lg:grid-rows-none grid-rows-2 h-full">
          <div className="h-full flex flex-col justify-center space-y-3">
            <h1 className="text-5xl font-bold">{t('profession')}</h1>
            <h2 className="text-3xl text-indigo-500">{t('greeting-message')}</h2>
            <p className="text-opacity-80 leading-8">{t('about-me')}</p>
          </div>
          <div className="relative lg:my-40 anim">
            <Image
              src="/images/personal-photo.png"
              alt="Personal photo"
              layout="fill"
              objectFit="contain"
            />
            <div className="parallax-rocket absolute top-4 left-4 z-10">
              <img
                src="/images/rocket.png"
                className="animate-bounce-slow w-36 h-auto "
                alt="Rocket"
              />
            </div>
            <div className="parallax-lightning absolute top-1/2 left-12 z-10">
              <img
                src="/images/lightning.png"
                className="animate-bounce-slow w-36 h-auto  "
                alt="Lightning"
              />
            </div>
            <div className="parallax-finance absolute top-3/4 -left-14">
              <img
                src="/images/finance-card.png"
                className="animate-bounce-slow h-56 w-auto "
                alt="Finance"
              />
            </div>
            <div className="parallax-shopping  absolute -top-10 right-0">
              <img
                src="/images/shopping-card.png"
                className="animate-bounce-slow w-56 h-auto"
                alt="Shopping"
              />
            </div>
            <div className="parallax-lamp  absolute top-3/4 right-4 z-10">
              <img src="/images/lamp.png" className="animate-bounce-slow w-520 h-auto" alt="Lamp" />
            </div>
          </div>
        </section>
      </div>
      <div className="h-[4000px]" />
    </>
  );
};

export default Index;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['home-page', 'common'])),
  },
});
