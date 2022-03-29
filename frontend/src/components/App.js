import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import Reservation from "./Reservation";
import Error from "./Error";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Border />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation />
          </Route>
          <Route exact path="/view-reservation">
            <Reservation />
          </Route>
          <Route path="">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-lightest);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 130px);
`;
const Border = styled.div`
  position: absolute;
  border-left: 3px dotted var(--colors-yellow);
  border-right: 3px dotted var(--colors-yellow);
`;

export default App;
