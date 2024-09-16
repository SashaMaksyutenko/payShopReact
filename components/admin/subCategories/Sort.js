
import styles from './styles.module.scss';
export default function Sort({ selectedCategory, setSelectedCategory, categories }) {
  return (
    <div className={styles.sortSelectWrapper}>
      <h2 className={styles.sortHeader}>Sort SubCategory by Category</h2>
      <select
        onChange={e => setSelectedCategory(e.target.value)}
        value={selectedCategory}
        className={styles.sortSelect}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
