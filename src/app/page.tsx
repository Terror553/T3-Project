import { Button } from "~/components/form/button";
import { db } from "~/server/db";

export default async function Home() {
  const forum = await db.forum_category.findMany();
  return (
    <>
      <h2>This is the homepage!</h2>

      <p>{JSON.stringify(forum)}</p>
      <Button>Test</Button>
      <span id="test">Test!</span>
    </>
  );
}
