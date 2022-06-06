import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactForm from '../../components/ContactForm/ContactForm';
import { useAlert } from '../../context/AlertProvider/AlertProvider';
import { httpRequests } from '../../services/httpRequest';

const EditContact = () => {
  const { dispatchAlert } = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    company: '',
    mobile: '',
  };

  const [formInfo, setFormInfo] = useState(initialValues);
  useEffect(() => {
    httpRequests
      .getSingleContact(id)
      .then((res) => {
        if (res.status > 199 && res.status < 300) {
          setFormInfo(res.data);
        } else {
          toast.error(res.statusText);
          navigate('/not-found');
        }
      })
      .catch(() => {
        navigate('/');
        toast.error('کاربر یافت نشد', { toastId: 'editPageErr' });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    const onUserAcceptation = async () => {
      const res = await httpRequests.updateContact(id, values);
      if (+res.status > 199 && +res.status < 300) {
        toast.info('تغییرات با موفقیت اعمال شد.', { toastId: 'edit' });
        navigate('/');
      }
    };

    dispatchAlert({ mode: 'alertEdit', onUserAcceptation });
  };

  return (
    <ContactForm
      onSubmit={onSubmit}
      submitButtonText={'اعمال تغییرات'}
      preFiledValue={formInfo}
    />
  );
};

export default EditContact;
