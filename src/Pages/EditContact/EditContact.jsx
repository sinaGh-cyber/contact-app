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

  useEffect(() => {
    httpRequests
      .getSingleContact(id)
      .then((res) => {
        if (res.status > 199 && res.status < 300) {
          const formInfoClone = { ...formInfo };
          formInfoClone.data = res.data;
          setFormInfo(formInfoClone);
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

  const onSubmit = () => {
    const onUserAcceptation = async () => {
      const res = await httpRequests.updateContact(id, formInfo.data);
      if (+res.status > 199 && +res.status < 300) {
        toast.info('تغییرات با موفقیت اعمال شد.', { toastId: 'edit' });
        navigate('/');
      }
    };

    dispatchAlert({ mode: 'alertEdit', onUserAcceptation });
  };

  return (
    <ContactForm
      formInfo={formInfo}
      setFormInfo={setFormInfo}
      onSubmit={onSubmit}
      submitButtonText={'اعمال تغییرات'}
    />
  );
};

export default EditContact;
