import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';

export type QuestionBody = {
  questionMessage: string;
  contactType: string;
  contact: string;
};

function Question() {
  const [visible, setVisible] = useState<boolean>(false);
  const [contactType, setContactType] = useState<string | null>(null);
  const [contact, setContact] = useState<string>('');
  const [questionMessage, setQuestionMessage] = useState('');
  const [isSended, setIsSended] = useState(false);

  const contactTemplate = (option: { name: string; code: string }) => {
    if (option) {
      return (
        <div className="flex align-items-center gap-2">
          <i className={'pi ' + option.code}></i>

          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{'Выберите способ для связи'}</span>;
  };

  const contactTypes = [
    { name: 'Email', code: 'pi pi-envelope' },
    { name: 'Telegram', code: 'pi pi-telegram' },
    { name: 'Instagram', code: 'pi-instagram' },
  ];

  const sendQuestion = (body: QuestionBody) => {
    return axios.post('http://54.155.135.247:4000/api/v1/shop/ask-question', body);
  };

  const handleAskQuestion = () => {
    sendQuestion({ questionMessage, contact, contactType: contactType! });
    setIsSended(true);
    setContact('');
    setContactType(null);
    setQuestionMessage('');

    setTimeout(() => {
      setIsSended(false);
      setVisible(false);
    }, 3000);
  };

  const footerContent = (
    <Button
      label="Отправить вопрос"
      onClick={handleAskQuestion}
      disabled={questionMessage.length < 5 || !contactType || contact.length < 3}
    />
  );
  return (
    <div>
      <Button
        className="fixed "
        style={{ bottom: '1rem', right: '1rem' }}
        icon="pi pi-question-circle"
        rounded
        size="large"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Форма отправки вопроса"
        className="m-2"
        visible={visible}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        {isSended ? (
          <div className=" surface-ground p-2 border-radius flex gap-2 align-items-center">
            <i className="pi pi-check-circle" style={{ fontSize: '4rem', color: 'green' }}></i>
            <div className="text-center">
              <div className="text-3xl text-center">Спасибо за вопрос!</div>

              <div> Мы скоро с вами свяжемся.</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-column gap-2 surface-ground border-round p-2">
            <InputTextarea
              value={questionMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestionMessage(e.target.value)}
              rows={5}
              cols={30}
            />

            <div className="text-center"> Выберите и введите контакт для связи</div>
            <Dropdown
              value={contactType}
              onChange={(e) => setContactType(e.value)}
              options={contactTypes}
              optionLabel="name"
              optionValue="name"
              valueTemplate={contactTemplate}
              itemTemplate={contactTemplate}
              className="w-full"
              placeholder="Выберите способ для связи"
            />
            <InputText value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
        )}
      </Dialog>
    </div>
  );
}

const MemoizedQuestion = React.memo(Question);
export default MemoizedQuestion;
