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
      answer:
        'MoBouzer is currently in development and will be available soon. Stay tuned for updates!',
    },
    {
      question: 'How can I request my account to be deleted?',
      answer:
        'To request deletion of your account, please send an email to support@mobouzer.com with the following information:\n\n' +
        '• Subject line: "Account Deletion Request"\n' +
        '• Send from the email address associated with your MoBouzer account\n' +
        '• Include your username in the body of the email\n' +
        '• Briefly state your reason for deletion (optional)\n\n' +
        'Our support team will process your request and send a confirmation email within 14 business days. Your account and associated data will be deleted according to our data retention policy.',
    },
    {
      question: 'What data is deleted when I delete my account?',
      answer:
        'When you delete your account, the following data is permanently removed within 30 days:\n\n' +
        '• Personal profile information (name, email, phone number)\n' +
        '• User-generated content (posts, comments, reviews)\n' +
        '• Activity history and preferences\n' +
        '• Profile photos and uploaded media\n\n' +
        'We retain the following information for legal and security purposes:\n\n' +
        '• Records of terms acceptance and privacy policy acknowledgments\n' +
        '• Aggregated and anonymized usage data\n' +
        '• Security and audit logs (retained for 90 days)',
    },
    {
      question: 'Is there a retention period for my data after account deletion?',
      answer:
        'After we receive and confirm your deletion request by email, most of your personal data will be permanently deleted within 30 days. Some information may be retained for specific periods as required by law:\n\n' +
        '• Security logs: 90 days\n' +
        'We also maintain backup systems for disaster recovery, which may contain your data for up to 90 days after deletion before being completely purged. You will receive an email confirmation once your account deletion has been processed.',
    },
    {
      question: 'Can I temporarily deactivate my account instead of deleting it?',
      answer:
        'Yes, we offer account deactivation as an alternative to permanent deletion. To request temporary deactivation, please email support@mobouzer.com with the subject line "Account Deactivation Request" from the email associated with your account.\n\n' +
        'When your account is deactivated:\n\n' +
        '• Your profile will be hidden from other users\n' +
        '• Your content will be temporarily removed from public view\n' +
        '• All your data will be preserved\n\n' +
        'To reactivate your account later, simply email support@mobouzer.com with the subject "Account Reactivation Request" from the same email address.',
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
                <div className="text-zinc-400 whitespace-pre-line">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
