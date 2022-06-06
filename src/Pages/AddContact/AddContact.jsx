import { useAlert } from '../../context/AlertProvider/AlertProvider';
import { useContactDispatcher } from '../../context/contactProvider/contactProvider';
import ContactForm from '../../components/ContactForm/ContactForm';

const AddContact = () => {
  const { dispatchAlert } = useAlert();
  const dispatchContact = useContactDispatcher();
  const initialValues = {
    name: '',
    email: '',
    company: '',
    mobile: '',
  };
  const onSubmit = (values) => {
    const onUserAcceptation = () => {
      dispatchContact({ type: 'addContact', data: values });
    };
    dispatchAlert({ mode: 'alertAdd', onUserAcceptation });
  };

  return (
    <ContactForm
      onSubmit={onSubmit}
      submitButtonText={'افزودن'}
      initialValues={initialValues}
    />
  );
};

export default AddContact;
