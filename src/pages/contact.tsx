import React from 'react';

import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from 'src/components/Header';
import { Meta } from 'src/layout/Meta';

function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <Meta description={t('description')} title={t('contact')} />
      <Header className="flex-none" />
    </>
  );
}
export default Contact;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
  revalidate: 24 * 3600, // 24 hours
});
