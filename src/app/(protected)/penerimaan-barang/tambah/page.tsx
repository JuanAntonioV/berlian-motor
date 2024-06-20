import CreateGoodsReceiptForm from '@/components/CreateGoodsReceiptForm';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import { getGoodsReceiptId } from '@/getters/goodsReceiptGetter';
import { getProductsList } from '@/getters/productGetter';
import { getShelfsList } from '@/getters/shelfGetter';

export default async function CreateGoodsReceiptPage() {
  const productsList = await getProductsList();
  const goodsReceiptId = await getGoodsReceiptId();

  const shelfsList = await getShelfsList();

  return (
    <div>
      <PageTitle
        title={'Terima Barang'}
        description='Terima barang digunakan untuk menambah data penerimaan barang.'
      />

      <Section>
        <CreateGoodsReceiptForm
          productsList={productsList}
          shelfsList={shelfsList}
          goodsReceiptId={goodsReceiptId}
        />
      </Section>
    </div>
  );
}
