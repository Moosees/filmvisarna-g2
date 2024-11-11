// import React from 'react';
// import { useSuspenseQuery } from '@tanstack/react-query';
// import { getBookingDataQuery } from '../api/booking';
// import { useLoaderData } from 'react-router-dom';
// import { Seat } from '../api/booking';

// const SendEmailButton: React.FC = () => {
//   const { bookingNumber } = useLoaderData() as { bookingNumber: string };

//   const { data } = useSuspenseQuery(getBookingDataQuery(bookingNumber));

//   function formatSeats(seats: Seat[]): string {
//     const [firstSeat, lastSeat] = [seats[0], seats[seats.length - 1]];
//     // One seat
//     if (seats.length === 1) {
//       return `Rad: ${firstSeat.row}, Plats: ${firstSeat.number}`;
//     }
//     // More than one seat
//     return `Rad: ${firstSeat.row}, Plats: ${lastSeat.number}-${firstSeat.number}`;
//   }

// const handleSendEmail = async () => {
//   // emily.saletti@gmail.com
//   const emailDetails = {
//     to: 'johan1hakansson@gmail.com', // Test recipient
//     subject: 'Tack för din bokning hos Filmvisarna!',
//     text: 'Tack för din bokning hos Filmvisarna! Vi ser fram emot att välkomna dig.', // Plain text for email clients that don’t support HTML
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #3e1e3d; padding: 20px;">
//         <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
//           <h1 style="background-color: #ff94e0; color: #3e1e3d; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; margin: 0;">
//             Filmvisarna
//           </h1>
//           <h2 style="color: #3e1e3d; margin-top: 20px;">Tack för din bokning hos Filmvisarna!</h2>
//           <p style="color: #3e1e3d;">Hej!</p>
//           <p style="color: #3e1e3d;">Vi är glada att bekräfta din bokning. Här är en sammanfattning:</p>
//           <ul style="background-color: #ff94e0; padding: 15px; border-radius: 8px; color: #3e1e3d;">
//             <li><strong>Boknings-nr:</strong> ${data.reservationNumber}</li>
//             <li><strong>Salong:</strong> ${data.auditoriumName}</li>
//             <li><strong>Plats:</strong> ${formatSeats(data.seats)}</li>
//             <li><strong>Film:</strong> ${data.title}</li>
//             <li><strong>Datum:</strong> ${data.startDate}</li>
//             <li><strong>Tid:</strong> ${data.timeRange}</li>
//             <li><strong>Antal personer:</strong> ${data.ticketDetails}</li>
//             <li><strong>Totalt pris:</strong> ${data.totalPrice}</li>

//           </ul>
//           <p style="margin-top: 20px; color: #3e1e3d;">Vi ser fram emot att välkomna dig! Om du har några frågor, tveka inte att kontakta oss.</p>
//           <p style="color: #3e1e3d;">Med vänliga hälsningar,<br />Filmvisarna</p>
//           <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
//           <p style="font-size: 12px; color: #888;">Filmvisarna AB | Adressvägen 123, 111 22 Stockholm</p>
//         </div>
//       </div>
//     `,
//   };

//     try {
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(emailDetails),
//       });

//       if (response.ok) {
//         console.log('Email sent successfully');
//       } else {
//         console.error('Error sending email');
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   };

//   return <button onClick={handleSendEmail}>Send Test Email</button>;
// };

// export default SendEmailButton;
