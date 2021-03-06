import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Marginals";
import Footer from "./Marginals/Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import Reservation from "./Reservation";
import Modify from "./SeatSelect/Modify";
import Error from "./Error";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
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
          <Route exact path="/modify-reservation">
            <Modify />
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
  height: calc(100vh - 160px);
`;

export default App;
