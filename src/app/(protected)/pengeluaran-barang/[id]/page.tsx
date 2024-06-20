import NotFoundScreen from '@/components/NotFoundScreen';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import ViewReceiptDetail from '@/components/ViewReceiptDetail';
import ViewReductionOfGoodsDetail from '@/components/ViewReductionOfGoodsDetail';
import { getReductionOfGoodsByInvoiceNumber } from '@/getters/reductionOfGoodsGetter';

export default async function ViewGoodsReceiptPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await getReductionOfGoodsByInvoiceNumber(id);

  if (!data) {
    return <NotFoundScreen />;
  }

  return (
    <div>
      <PageTitle
        title={'Lihat Pengeluaran'}
        description={`Lihat data pengeluaran ${id} pada sistem.`}
      />

      <Section>
        <ViewReductionOfGoodsDetail data={data} />
      </Section>
    </div>
  );
}
