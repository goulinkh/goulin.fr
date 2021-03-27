import React from 'react';

import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from 'src/components/Header';
import { Meta } from 'src/layout/Meta';

const Index = () => {
  const { t } = useTranslation('home-page');
  const { t: commonT } = useTranslation('common');
  return (
    <>
      <Meta description={commonT('description')} />
      <Header />
      <h1 className="hover:bg-black hover:text-gray-100 transition-all">{t('greeting-message')}</h1>
    </>
  );
};

export default Index;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['home-page', 'common'])),
  },
});
