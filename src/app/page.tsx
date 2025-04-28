import { Editor } from "~/components/editor";

export default async function Home() {
  return (
    <>
      <h2>This is the homepage!</h2>
      <Editor id="test" />
    </>
  );
}
