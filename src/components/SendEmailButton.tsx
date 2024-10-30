import React from 'react';

const SendEmailButton: React.FC = () => {
  const handleSendEmail = async () => {
    const emailDetails = {
      to: 'emily.saletti@gmail.com', // Test recipient
      subject: 'Tack för din bokning hos Filmvisarna!',
      text: 'Tack för din bokning hos Filmvisarna! Vi ser fram emot att välkomna dig.', // Plain text for email clients that don’t support HTML
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #3e1e3d; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
            <h1 style="background-color: #ff94e0; color: #3e1e3d; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; margin: 0;">
              Filmvisarna
            </h1>
            <h2 style="color: #3e1e3d; margin-top: 20px;">Tack för din bokning hos Filmvisarna!</h2>
            <p style="color: #3e1e3d;">Hej!</p>
            <p style="color: #3e1e3d;">Vi är glada att bekräfta din bokning. Här är en sammanfattning:</p>
            <ul style="background-color: #ff94e0; padding: 15px; border-radius: 8px; color: #3e1e3d;">
              <li><strong>Film:</strong> Filmens namn här</li>
              <li><strong>Datum:</strong> Datum och tid här</li>
              <li><strong>Plats:</strong> Platsens namn här</li>
            </ul>
            <p style="margin-top: 20px; color: #3e1e3d;">Vi ser fram emot att välkomna dig! Om du har några frågor, tveka inte att kontakta oss.</p>
            <p style="color: #3e1e3d;">Med vänliga hälsningar,<br />Filmvisarna</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">Filmvisarna AB | Adressvägen 123, 111 22 Stockholm</p>
          </div>
        </div>
      `,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailDetails),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return <button onClick={handleSendEmail}>Send Test Email</button>;
};

export default SendEmailButton;
