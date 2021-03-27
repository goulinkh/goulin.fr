import React from 'react';

import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { Header } from 'src/components/Header';
import { Meta } from 'src/layout/Meta';

const Index = () => {
  const { t } = useTranslation('home-page');
  const { t: commonT } = useTranslation('common');
  return (
    <>
      <Meta description={commonT('description')} />
      <div className="glass-bg">
        <Header />
        <section className="container main grid lg:grid-cols-2 grid-rows-2 lg:max-h-screen h-[1000px]">
          <div className="h-full flex flex-col justify-center space-y-3">
            <h1 className="text-5xl font-bold">{t('profession')}</h1>
            <h2 className="text-3xl text-indigo-500">{t('greeting-message')}</h2>
            <p className="text-opacity-80 leading-8">{t('about-me')}</p>
          </div>
          <div className="relative lg:my-40">
            <Image
              src="/images/personal-photo.png"
              alt="Personal photo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['home-page', 'common'])),
  },
});
