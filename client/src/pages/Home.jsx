import { Breadcrumb } from "../components/Components";
import { H1, H3, Par } from "../components/Tags";

const Home = () => {
  return (
    <div>
      <H1>Home Page</H1>
      <Breadcrumb />
      <div>
        <H3>Referensi mern indian coders youtube</H3>
        <Par>
          MERN (mongodb express react node) mongodb: nosql db which stores documents in collections instead of records and
          tables in sql database; expressjs is a fw for nodejs which helps to ease the process; nodejs is a js engine
          originally built for browser, now can work without a browser and having some extra APIs and allows us to run the js
          outside of the browser; reactjs is a js library to build fast and scalable user interfaces. it is a view part in
          mern stack;
        </Par>
        <Par>
          Authentication is the process of verifying the user; authorization is the process of providing access to the user
          for spesific application. needed to verify and provide access to the user for the application. auth works by verify
          user&apos;s credentials, give access token, token expiration time. JWT encodes the json data into a signed token
          which is shard between two parties. Share access toke with user then the user gives back token then verification
          completes. Access token cycle generate token, send http only cookies, fe cannot access http only cookis, browser
          sends back cookies to backend;
        </Par>
        <Par>
          server: nodejs, mongodb, express, jwt, bcrypt, dotenv; client: react, redux, react router, axios, materialui
        </Par>
      </div>
    </div>
  );
};

export default Home;
