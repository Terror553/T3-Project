import TestForm from "~/components/Test";
import UploadForm from "~/components/uploadTest";

export default async function Home() {
  return (
    <>
      <h2>This is the homepage!</h2>
      <TestForm />
      <UploadForm />
    </>
  );
}
