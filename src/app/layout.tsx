"use client";
import Script from "next/script";
import { useEffect } from "react";
import { Navbar } from "~/components/navbar";
import ToastContainer from "~/components/toastContainer";
import "~/styles/fontawesome-free/all.min.css";
import "~/styles/prism/prism_light_default.css";
import "~/styles/bootstrap/bootstrap.min.css";
import "~/styles/toastr/toastr.min.css";
import "~/styles/fonts/css.css";
import "~/styles/cookies/cookieconsent.min.css";
import "~/styles/theme/theme.css";
import "~/styles/theme/theme-dark.css";
import { Footer } from "~/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scriptUrls = [
        "/new/jquery/dist/jquery.min.js",
        "/new/popper.js/2.9.1/umd/popper.min.js",
        "/new/bootstrap/js/bootstrap.min.js",
        "/new/toastr/toastr.min.js",
        "/new/cookies/assets/js/cookieconsent.min.js",
        "/new/theme/assets/js/theme.js",
      ];

      scriptUrls.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      });
    }
  }, []);

  return (
    <html lang="en" data-theme="dark" className="loaded">
      <head>
        <meta charSet="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />

        <title>Home &bull; Waleed</title>

        <style>
          {`
	:root {
        --primary: #038157;
        --primary-text: var(--primary);
        --header-height: 300px;
        --header-logo-height: 250px;
        --portal-logo-height: 200px;
        --avatars-border-radius: 50%;
      }
	`}
        </style>
      </head>
      <body className={`antialiased`}>
        <div className="wrapper" id="wrapper">
          <Navbar />
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

        <Script
          id="config"
          dangerouslySetInnerHTML={{
            __html: `
var siteName = "Test";
      var siteURL = "\/";
      var fullSiteURL = "https:\/\/lithium.coldfiredzn.com\/";
      var page = "index";
      var route = "\/";
      var avatarSource = "https:\/\/mc-heads.net\/avatar\/{identifier}\/{size}";
      var csrfToken = "84ac47220c003e91862f8d84831352fd";
      var debugging = false;
      var loggedIn = true;
      var cookieNotice = false;
      var loadingTime = "Page loaded in 0.062s";
      var collapsibleForums = true;
      var prefetchForms = true;
      var stickyNavbar = false;
      var darkMode = true;
      var darkModeToggle = true;
      var headerZoomOnScroll = false;
      var headerParticles = false;
      var headerParticlesColor = "#ffffff";
      var portalParticles = false;
      var portalParticlesColor = "#ffffff";
      var chroma = false;
      var chromaSaturation = "50%";
      var chromaLightness = "50%";
      var chromaMultiplier = 0.5;
      var locale = {
        submit: "Submit",
        cancel: "Cancel",
        close: "Close",
        confirmDelete: "Are you sure you wish to delete this?",
        copied: "Kopiert!!!",
        cookieNotice:
          "This website uses cookies to enhance your browsing experience. By registering on our website or closing this notice you agree with their use.",
        noMessages: "No new messages",
        newMessage1: "You have 1 new message",
        newMessagesX: "You have {{count}} new messages",
        noAlerts: "No new alerts",
        newAlert1: "You have 1 new alert",
        newAlertsX: "You have {{count}} new alerts",
        andMoreX: "and {{count}} more",
        bungeeInstance: "This server is a Bungee instance.",
        onePlayerOnline: "There is currently 1 player online.",
        xPlayersOnline: "There are currently {{count}} players online.",
        noPlayersOnline: "There are no players online.",
        offline: "Offline",
      }; 
            `,
          }}
        ></Script>
        <ToastContainer />
      </body>
    </html>
  );
}
