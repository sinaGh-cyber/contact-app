import { useState } from 'react';
import { useAlert } from '../../context/AlertProvider/AlertProvider';
import { useContactDispatcher } from '../../context/contactProvider/contactProvider';

import ContactForm from '../../components/ContactForm/ContactForm';

const AddContact = () => {
  const initStat = {
    data: {
      name: '',
      email: '',
      company: '',
      mobile: '',
    },
    error: {
      name: { isValid: true, errorMessage: 'نام معتبر نیست!' },
      email: { isValid: true, errorMessage: 'ایمیل معتبر نیست!' },
      company: { isValid: true, errorMessage: 'شغل معتبر نیست!' },
      mobile: { isValid: true, errorMessage: 'تلفن همراه معتبر نیست!' },
    },
  };
  const [formInfo, setFormInfo] = useState(initStat);
  const { dispatchAlert } = useAlert();
  const dispatchContact = useContactDispatcher();

  const onSubmit = () => {
    const onUserAcceptation = () => {
      dispatchContact({ type: 'addContact', data: formInfo.data });
      setFormInfo(initStat);
    };
    dispatchAlert({ mode: 'alertAdd', onUserAcceptation });
  };

  return (
    <ContactForm
      formInfo={formInfo}
      setFormInfo={setFormInfo}
      onSubmit={onSubmit}
      submitButtonText={'افزودن'}
    />
  );
};

export default AddContact;
