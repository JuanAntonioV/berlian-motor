import CreateReductionOfGoodsForm from '@/components/CreateReductionOfGoodsForm';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import { getReductionOfGoodsId } from '@/getters/reductionOfGoodsGetter';
import { getProductsList } from '@/getters/productGetter';
import { getShelfsList } from '@/getters/shelfGetter';

export default async function CreateReductionOfGoodsPage() {
  const reductionOfGoodsId = await getReductionOfGoodsId();
  const productsList = await getProductsList();

  const shelfsList = await getShelfsList();

  return (
    <div>
      <PageTitle
        title={'Pengeluaran Barang'}
        description='Pengeluaran barang digunakan untuk menambah data penerimaan barang.'
      />

      <Section>
        <CreateReductionOfGoodsForm
          productsList={productsList}
          shelfsList={shelfsList}
          reductionOfGoodsId={reductionOfGoodsId}
        />
      </Section>
    </div>
  );
}
