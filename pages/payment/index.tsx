import { GetServerSideProps, GetStaticProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {} = await fetch(`/api/get-invoice-status?id=${context.query.collection_id}`);

    return {
        props: {
            payment: {
                id: context.query.collection_id
            }
        }
    }
}

interface Payment {
    id: string;
}

interface Props {
    payment: Payment;
}

export default function Payment({ payment }: Props) {


    return (
        <div className="flex-grow bg-slate-300 my-3 rounded p-3">
            <p>{ payment.id }</p>
        </div>
    )

}