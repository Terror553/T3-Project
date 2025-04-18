export default async function Home() {
  const user = null; // Simulating a user not being logged in
  if (user == null) {
    return (
      <>
        <h2>This is the Profile page, you are not logged in!</h2>
      </>
    );
  }

  return (
    <>
      <h2>This is the Profile page, you are logged in!</h2>
    </>
  );
}
