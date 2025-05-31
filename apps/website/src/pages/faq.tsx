import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const FAQ: NextPage = () => {
  const faqs = [
    {
      question: 'What is MoBouzer?',
      answer:
        'MoBouzer is a mobile app platform designed to help users explore and discover new experiences.',
    },
    {
      question: 'When will MoBouzer be available?',
      answer: 'MoBouzer is currently in development and will be available soon. Stay tuned for updates!',
    },
    {
      question: 'How can I get early access?',
      answer:
        'Early access information will be announced on our website and social media channels.',
    },
    {
      question: 'Which platforms will MoBouzer support?',
      answer: 'MoBouzer will be available on iOS and Android devices.',
    },
  ];

  return (
    <>
      <Head>
        <title>MoBouzer: FAQ</title>
      </Head>
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-4xl px-6 py-12 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-12">
            <h1 className="text-4xl font-bold text-white">Frequently Asked Questions</h1>
            <Link 
              href="/" 
              className="px-4 py-2 text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-200 shadow-lg"
            >
              Back to Home
            </Link>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-zinc-700"
              >
                <h2 className="mb-3 text-xl font-semibold text-zinc-200">{faq.question}</h2>
                <p className="text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
