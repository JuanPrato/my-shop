import TextInput from 'components/form/TextInput';
import Button from 'components/utils/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AuthAction, useAuthUser, withAuthUser, withAuthUserSSR, withAuthUserTokenSSR } from 'next-firebase-auth';
import firebase from 'firebase/app';
import { useEffect } from 'react';

type fields = {
    email: string;
    password: string;
}

function Login() {

    const { handleSubmit, register, formState: { errors } } = useForm<fields>();

    const onSubmit = async (values: fields) => {
        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
            if (!user) throw new Error('Login error');
            // await fetch('/api/login', {
            //     headers: {
            //         Authorization: await user.getIdToken()
            //     }
            // });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bg-slate-300 rounded my-3 p-3 flex-grow flex flex-col justify-center items-center">
            <h2 className="text-lg text-center font-semibold p-3">INGRESA A TU CUENTA</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full max-w-[400px]">
                <TextInput
                    label="Email de usuario"
                    placeholder='algo@otra.com'
                    register={register("email", {required: {value: true, message: 'Campo necesario'}})}
                    error={errors.email?.message}
                />
                <TextInput
                    label="Contraseña"
                    placeholder="*******"
                    secure={true}
                    register={register("password", {required: {value: true, message: 'Campo necesario'}})}
                    error={errors.password?.message}
                />
                <Link href="/register" passHref>
                    <a className="text-left m-2 w-full text-sm text-slate-500">
                        No tienes cuenta? Registrarme
                    </a>
                </Link>
                <div className="m-4">
                    <Button>
                        <button className="font-semibold">INGRESAR</button>
                    </Button>
                </div>
            </form>

        </div>
    );
}

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);

export const getServerSideProps = withAuthUserTokenSSR({
    whenAuthed: AuthAction.REDIRECT_TO_APP
})();