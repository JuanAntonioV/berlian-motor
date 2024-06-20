import NotFoundScreen from '@/components/NotFoundScreen';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import ViewReceiptDetail from '@/components/ViewReceiptDetail';
import { getReceiptByInvoiceNumber } from '@/getters/goodsReceiptGetter';

export default async function ViewGoodsReceiptPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await getReceiptByInvoiceNumber(id);

  if (!data) {
    return <NotFoundScreen />;
  }

  return (
    <div>
      <PageTitle
        title={'Lihat Penerimaan'}
        description={`Lihat data penerimaan ${id} pada sistem.`}
      />

      <Section>
        <ViewReceiptDetail data={data} />
      </Section>
    </div>
  );
}
