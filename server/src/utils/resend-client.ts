import { Resend } from 'resend';

const resend = new Resend('re_FEXXoBqt_K31zJ4F1tZNZrxNeVVVTvJXo');

interface IContactsInfo {
  name: string
  email: string
}

export async function resendSendMail(contacts: IContactsInfo[]) {
  contacts.map(async (person) => {
    const { data, error } = await resend.emails.send({
      from: 'Memento Mori 💀 <mementomori@luizfranzon.dev>',
      to: person.email,
      subject: `Olá ${person.name}`,
      html: '<strong>sexo</strong>',
    });

    if (error) {
      return console.error({ error });
    }
  })
}