
import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import { useState } from "react";
import Create from "../../../components/admin/subCategories/Create";
import List from "../../../components/admin/subCategories/List";
import Sort from "../../../components/admin/subCategories/Sort";
export default function subCategories({ categories, subCategories }) {
  const [data, setData] = useState(subCategories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const filteredSubCategories = selectedCategory
    ? subCategories.filter(sub => sub.parent._id === selectedCategory)
    : subCategories;

  return (
    <Layout>
      <div>
        <Create setSubCategories={setData} categories={categories} />
        <Sort
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <List
          categories={categories}
          subCategories={filteredSubCategories}
          setSubCategories={setData}
        />
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const subCategories = await SubCategory.find({})
    .populate({ path: "parent", model: Category })
    .sort({ updatedAt: -1 })
    .lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    },
  };
}
