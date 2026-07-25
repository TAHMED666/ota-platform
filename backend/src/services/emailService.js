const sendBookingEmail = async ({ to, subject, body }) => {
  return {
    delivered: false,
    channel: 'email-structure-only',
    to,
    subject,
    body
  };
};

module.exports = { sendBookingEmail };
