import CreateProductForm from '@/components/CreateProductForm';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import { getBrandsList } from '@/getters/brandGetter';
import { getCategoriesList } from '@/getters/categoryGetter';
import { getTypesList } from '@/getters/typeGetter';

export default async function CreateProductPage() {
  const brandsList = await getBrandsList();
  const categoriesList = await getCategoriesList();
  const typeList = await getTypesList();

  return (
    <div>
      <PageTitle
        title={'Tambah Produk'}
        description='Tambah produk digunakan untuk menambah data produk.'
      />

      <Section>
        <CreateProductForm
          brandsList={brandsList}
          categoriesList={categoriesList}
          typeList={typeList}
        />
      </Section>
    </div>
  );
}
