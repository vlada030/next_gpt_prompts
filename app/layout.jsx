import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import UserAuthentication from "@components/UserAuthentication";

export const metadata = {
  title: "AI Prompt",
  desciption: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {/* <UserAuthentication> */}
              <Nav />
              {children}
            {/* </UserAuthentication> */}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
