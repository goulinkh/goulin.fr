import React, { FormEvent, useState } from 'react';

import clsx from 'clsx';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Header } from 'src/components/Header';
import { Modal, ModalProps } from 'src/components/Modal';
import { Meta } from 'src/layout/Meta';

const Loading = ({ text }: { text: string }) => (
  <span className="inline-flex flex-row items-center space-x-3">
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25 text-gray-100"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75 text-gray-100"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span className="text-gray-200">{text}</span>
  </span>
);

function Contact() {
  const { t } = useTranslation();
  const { t: cTranslate } = useTranslation('contact-page');

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [modal, setModal] = useState<{ show: boolean } & ModalProps>({
    show: false,
    type: null,
    title: null,
    footer: null,
  });
  const [loading, setLoading] = useState(false);
  const onSendFailure = ({
    title,
    message: failureMessage,
  }: {
    title: string;
    message: string;
  }) => {
    setModal({
      show: true,
      title,
      message: failureMessage,
      type: 'error',
      footer: null,
    });
  };
  const onSendSuccess = ({ title }: { title: string }) => {
    setModal({
      show: true,
      title,
      message: 'Nous essayerons de revenir vers vous rapidement 😃',
      type: 'success',
      footer: null,
    });
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (loading) return;
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        recaptchaToken: await executeRecaptcha('contact_form'),
      }),
    });
    setLoading(false);
    if (!response.ok) {
      onSendFailure({
        title: cTranslate('fail-title'),
        message: "Nous n'avons pas réussi à communiquer avec le serveur",
      });
    } else {
      const result = await response.json();
      if (result.error) {
        onSendFailure({
          title: cTranslate('fail-title'),
          message: result.message,
        });
      } else {
        setName('');
        setEmail('');
        setMessage('');
        onSendSuccess({ title: result.message });
      }
    }
  };

  return (
    <>
      <Meta description={t('description')} title={t('contact')} />
      <Header className="flex-none" />
      <div className="container space-y-12 my-8 text-center">
        <h1 className="font-bold text-3xl text-indigo-500">{cTranslate('contact-me')}</h1>
        <p className="text-lg">{cTranslate('contact-message')}</p>
        <form className="flex flex-col space-y-5 max-w-[700px] mx-auto" onSubmit={handleFormSubmit}>
          <div className="flex flex-col w-full text-left space-y-2">
            <label htmlFor="name" className="opacity-70">
              {cTranslate('name')}
            </label>
            <input
              type="text"
              id="name"
              placeholder={`${cTranslate('name')} ...`}
              className="p-4 rounded-lg border shadow-sm dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400  dark:focus:ring-offset-gray-800 "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full text-left space-y-2">
            <label htmlFor="email" className="opacity-70">
              {cTranslate('mail')}
            </label>
            <input
              type="email"
              id="email"
              placeholder={`${cTranslate('mail')} ...`}
              className="p-4 rounded-lg border shadow-sm dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400  dark:focus:ring-offset-gray-800 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full text-left space-y-2">
            <label htmlFor="message" className="opacity-70">
              {cTranslate('message')}
            </label>
            <textarea
              placeholder={`${cTranslate('message')} ...`}
              id="message"
              className="p-4 rounded-lg border shadow-sm dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400  dark:focus:ring-offset-gray-800 "
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="w-full inline-flex flex-row-reverse">
            <button
              type="submit"
              className={clsx(
                'font-bold text-lg rounded-lg bg-indigo-500 text-gray-100 p-3 shadow-sm accent-shadow transition dark:bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400  dark:focus:ring-offset-gray-800 max-w-[350px] w-full',
                {
                  'cursor-default': loading,
                  'hover:bg-indigo-600 dark:hover:bg-indigo-700': !loading,
                },
              )}
              disabled={loading}
            >
              {loading ? <Loading text={t('loading')} /> : cTranslate('send')}
            </button>
          </div>
        </form>
        <p>
          {cTranslate('mail-message')} <br />{' '}
          <a
            href="mailto:contact@goulin.fr"
            className="text-indigo-600 dark:text-indigo-400 font-mono"
          >
            contact@goulin.fr
          </a>
        </p>
      </div>
      {modal.show && (
        <Modal
          {...modal}
          footer={() => {
            if (modal.type === 'success') {
              return (
                <Link href="/">
                  <span>
                    <div className="font-bold text-lg rounded-lg bg-indigo-500 text-gray-100 px-6 py-2 shadow-sm transition dark:bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400  dark:focus:ring-offset-gray-800 max-w-[350px] w-full cursor-pointer">
                      {t('go-home')}
                    </div>
                  </span>
                </Link>
              );
            }
            return (
              <button
                type="button"
                autoFocus
                className="font-bold text-lg rounded-lg border text-indigo-500 border-indigo-500 px-6 py-2 shadow-sm  transition dark:border-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400  dark:focus:ring-offset-gray-800"
                onClick={() => {
                  setModal({
                    show: false,
                    type: null,
                    title: null,
                    footer: null,
                  });
                }}
              >
                {t('cancel')}
              </button>
            );
          }}
        />
      )}
    </>
  );
}
export default Contact;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'contact-page'])),
  },
  revalidate: 24 * 3600, // 24 hours
});
