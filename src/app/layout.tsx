import Script from "next/script";
// Import server-side utilities
import { cookies } from "next/headers";
import { getUserFromSessionForNav } from "~/server/auth/session";
import type { ForumUser } from "~/server/types/forum";

// Import providers
import { UserProvider } from "~/client/user";
import { NotificationProvider } from "~/client/notification";

// Import components
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";

// Import styles
import "~/styles/fontawesome-free/all.min.css";
import "~/styles/prism/prism_light_default.css";
import "~/styles/bootstrap/bootstrap.min.css";
import "~/styles/toastr/toastr.min.css";
import "~/styles/fonts/css.css";
import "~/styles/cookies/cookieconsent.min.css";
import "~/styles/theme/theme.css";
import "~/styles/theme/theme-dark.css";
import { ToastContainer } from "~/components/toastContainer";
import { ModalProvider } from "~/client/modalUtils";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch user data on the server
  const sessionUser = (await getUserFromSessionForNav(
    await cookies(),
  )) as ForumUser;

  return (
    <html lang="en" data-theme="dark" className="loaded">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <title>Home &bull; MelonenMC</title>
        <style>
          {`
            :root {
              --primary: #038157;
              --primary-text: var(--primary);
              --header-height: 300px;
              --header-logo-height: 200px;
              --portal-logo-height: 200px;
              --avatars-border-radius: 50%;
            }
          `}
        </style>
      </head>
      <body className="antialiased" style={{ padding: 0, margin: 0 }}>
        <NotificationProvider>
          <UserProvider initialUser={sessionUser}>
            <ModalProvider>
              <div className="wrapper" id="wrapper">
                <Navbar initialUser={sessionUser} />
                <main className="main">
                  <div className="container">{children}</div>
                </main>
                <Footer />
                <div className="scroll-to-top" id="button-scrollToTop">
                  <a href="#" data-popper-placement="top" title="Scroll To Top">
                    <i className="fas fa-angle-up"></i>
                  </a>
                </div>
                <div className="loading-bar"></div>
              </div>
            </ModalProvider>
            <ToastContainer />

            {/* Load external scripts using Next.js Script component */}
            <Script
              src="/new/jquery/dist/jquery.min.js"
              strategy="afterInteractive"
            />
            <Script
              src="/new/popper.js/2.9.1/umd/popper.min.js"
              strategy="afterInteractive"
            />
            <Script
              src="/new/bootstrap/js/bootstrap.min.js"
              strategy="afterInteractive"
            />
            <Script
              src="/new/toastr/toastr.min.js"
              strategy="afterInteractive"
            />
            <Script
              src="/new/cookies/assets/js/cookieconsent.min.js"
              strategy="afterInteractive"
            />
            <Script
              src="/new/theme/assets/js/theme.js"
              strategy="afterInteractive"
            />
          </UserProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
