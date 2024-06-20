import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import { getTransferId } from '@/getters/transferGetter';
import { getProductsList } from '@/getters/productGetter';
import { getShelfsList } from '@/getters/shelfGetter';
import CreateTransfersForm from '@/components/CreateTransfersForm';

export default async function CreateTransfersPage() {
  const productsList = await getProductsList();
  const transfersId = await getTransferId();

  const shelfsList = await getShelfsList();

  return (
    <div>
      <PageTitle
        title={'Transfer Barang'}
        description='Transfer barang digunakan untuk menambah data penerimaan barang.'
      />

      <Section>
        <CreateTransfersForm
          productsList={productsList}
          shelfsList={shelfsList}
          transfersId={transfersId}
        />
      </Section>
    </div>
  );
}
