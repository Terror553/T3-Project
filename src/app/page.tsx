import UploadForm from "~/components/uploadForm";

export default async function Home() {
  return (
    <>
      <h2>This is the homepage!</h2>
      <UploadForm title="Upload Avatar" aspectRatio="1x1" />
    </>
  );
}
