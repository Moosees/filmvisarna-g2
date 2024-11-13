import { SubmitHandler, useForm } from 'react-hook-form';
import PrimaryBtn from '../buttons/PrimaryBtn';

interface UserData {
  first_name: string;
  last_name: string;
  user_email: string;
}

interface UpdateUserData {
  first_name: string;
  last_name: string;
  current_password: string;
  new_password?: string;
  confirm_new_password?: string;
}

interface MemberInfoFormProps {
  displayMemberInfo: UserData;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onSubmit: SubmitHandler<UpdateUserData>;
  toggleEdit: () => void;
  errorMessage: string | null;
  setErrorMessage: (value: string | null) => void;
}

const MemberInfoForm: React.FC<MemberInfoFormProps> = ({
  displayMemberInfo,
  isEditing,
  setIsEditing,
  onSubmit,
  toggleEdit,
  errorMessage,
  setErrorMessage,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateUserData>({
    defaultValues: displayMemberInfo,
  });

  const newPassword = watch('new_password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-100 text-start">
      {isEditing ? (
        <>
          <p className="instructions-text p-1 rounded mt-3">
            Uppdatera den informationen du vill
          </p>

          <input
            type="text"
            {...register('first_name', {
              required: 'Förnamn är obligatoriskt',
            })}
            placeholder="Förnamn"
            className={`form-control mt-3 editable-input ${
              errors.first_name ? 'is-invalid' : ''
            }`}
          />
          {errors.first_name && (
            <div className="invalid-feedback">{errors.first_name.message}</div>
          )}

          <input
            type="text"
            {...register('last_name', {
              required: 'Efternamn är obligatoriskt',
            })}
            placeholder="Efternamn"
            className={`form-control mt-3 editable-input ${
              errors.last_name ? 'is-invalid' : ''
            }`}
          />
          {errors.last_name && (
            <div className="invalid-feedback">{errors.last_name.message}</div>
          )}

          <input
            type="password"
            {...register('new_password')}
            placeholder="Nytt lösenord"
            className="form-control mt-3 editable-input"
          />

          <input
            type="password"
            {...register('confirm_new_password', {
              validate: (value) =>
                !newPassword ||
                value === newPassword ||
                'Lösenorden matchar inte',
            })}
            placeholder="Bekräfta nytt lösenord"
            className={`form-control mt-3 editable-input ${
              errors.confirm_new_password ? 'is-invalid' : ''
            }`}
          />
          {errors.confirm_new_password && (
            <div className="invalid-feedback">
              {errors.confirm_new_password.message}
            </div>
          )}

          <p className="instructions-text p-1 rounded mt-3">
            Ange ditt nuvarande lösenord för att spara ändringar
          </p>

          <input
            type="password"
            {...register('current_password', {
              required: 'Ange ditt nuvarande lösenord för att spara ändringar',
              onChange: () => setErrorMessage(null),
            })}
            placeholder="Nuvarande lösenord"
            className={`form-control mt-3 editable-input ${
              errors.current_password ? 'is-invalid' : ''
            }`}
          />
          {errors.current_password && (
            <div className="invalid-feedback">
              {errors.current_password.message}
            </div>
          )}

          {errorMessage && (
            <div className="invalid-feedback d-block mt-3">{errorMessage}</div>
          )}

          <div className="d-flex flex-column align-items-center mt-3">
            <PrimaryBtn className="py-2 fs-md-custom" type="submit">
              Spara
            </PrimaryBtn>
            <PrimaryBtn
              className="py-2 fs-md-custom"
              type="button"
              onClick={toggleEdit}
            >
              Avbryt
            </PrimaryBtn>
          </div>
        </>
      ) : (
        <>
          <h6 className="profile-text-bg p-1 rounded mt-3">
            Förnamn: {displayMemberInfo.first_name}
          </h6>
          <h6 className="profile-text-bg p-1 rounded mt-3">
            Efternamn: {displayMemberInfo.last_name}
          </h6>
          <h6 className="profile-text-bg p-1 rounded mt-3">
            E-post: {displayMemberInfo.user_email}
          </h6>
          <div className="d-flex flex-column align-items-center mt-3">
            <PrimaryBtn
              className="py-2 fs-md-custom"
              onClick={toggleEdit}
              type="button"
            >
              Ändra
            </PrimaryBtn>
          </div>
        </>
      )}
    </form>
  );
};

export default MemberInfoForm;
