import { useState } from "react";
import Link from "next/link";
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import firebase from 'firebase/app';
import TextInput from "components/form/TextInput";
import { useForm } from 'react-hook-form';
import Button from "components/utils/Button";

type Fields = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

function Register() {

    const { handleSubmit, register, getValues, formState: { errors } } = useForm<Fields>();
    const [submitError, setSubmitError] = useState<string>();

    const onSubmit = async (values: Fields) => {

        try {
            const userCredentials = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
            // const phoneResult = await userCredentials.user?.linkWithPhoneNumber(values.phone, { type: "phone", verify: async () => ''});
            await userCredentials.user?.updateProfile({displayName: values.name})
        } catch(e) {
            setSubmitError((e as any).message);
        }
    }

    return (
        <div className="flex-grow flex flex-col bg-slate-300 rounded my-3 p-3">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] w-full m-auto">
                <p>{submitError}</p>
                <h2 className="text-center text-xl font-semibold">REGISTRAR UNA NUEVA CUENTA</h2>
                <TextInput
                    label="Nombre"
                    placeholder="Pedro Parcela"
                    register={register("name", { required: {value: true, message: 'Campo requerido'} })}
                    error={errors.name?.message}
                />
                <TextInput
                    label="Email"
                    placeholder="parcelapedro@gmail.com"
                    register={register("email", { required: {value: true, message: 'Campo requerido'} })}
                    email={true}
                    error={errors.email?.message}
                />
                <TextInput
                    label="Contraseña"
                    placeholder="*********"
                    register={register("password", { required: {value: true, message: 'Campo requerido'}, minLength: {value: 6, message: 'El minimo de caracteres es 6'} })}
                    error={errors.password?.message}
                    secure={true}
                />
                <TextInput
                    label="Verificar contraseña"
                    placeholder="*********"
                    register={register("confirmPassword", 
                                        { 
                                            required: {value: true, message: 'Campo requerido'}, 
                                            validate: (value: string) => getValues().password === value ? undefined : 'Contraseñas deben coincidir'
                                        })}
                    error={errors.confirmPassword?.message}
                    secure={true}
                    
                />
                <Link href="/login" passHref>
                    <a className="text-left m-2 w-full text-sm text-slate-500">Ya estas registrado? Inicia sesión</a>
                </Link>
                <div className="grid place-content-center my-4">
                    <Button>
                        <button className="font-semibold">REGISTRAR</button>
                    </Button>
                </div>
            </form>
        </div>
    )

}

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Register);

export const getServerSideProps = withAuthUserTokenSSR({
    whenAuthed: AuthAction.REDIRECT_TO_APP
})();