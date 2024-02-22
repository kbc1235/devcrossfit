import Layout from "../../templates/Mainlayout/layout";
import Maps from "../../atoms/Maps/Maps";

export default function CrossfitMain() {
  return (
    <Layout title={"가장 가까운 박스는?!"}>
      <Maps />
    </Layout>
  );
}
