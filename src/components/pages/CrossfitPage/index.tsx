import Layout from "../../templates/Mainlayout/layout";
import Maps from "../../atoms/Maps/Maps";
export default function CrossfitMain() {
  return (
    <Layout title={"크로스핏"} backBtn>
      <Maps />
    </Layout>
  );
}
